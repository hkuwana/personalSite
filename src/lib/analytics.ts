import type { PostHog } from 'posthog-js';

/**
 * PostHog, in the same project as otterd.co. Runs only in a production build with POSTHOG_KEY
 * set at build time. posthog-js loads after the page is idle, so it never delays the first paint.
 *
 * Same privacy settings as Otterd: no cookies (localStorage), no person profiles, no session
 * recording, Do Not Track respected. Every event carries:
 * - site: "hkuwana", so one dashboard can read both sites (Otterd registers "otterd").
 * - recipient: the code from a /d/<code> link, when the visitor arrived through one.
 * - locale: the page language, the property name Otterd uses.
 *
 * Clicks on [data-track="event_name"] are captured; each data-track-* attribute becomes a
 * property (data-track-location="footer" gives { location: "footer" }).
 */
type Properties = Record<string, unknown>;

let client: Promise<PostHog | null> | null = null;
const queue: [string, Properties][] = [];

export const RECIPIENT_COOKIE = 'hk_recipient';

export function capture(event: string, properties: Properties = {}) {
	if (typeof window === 'undefined') return;
	const props = { locale: document.documentElement.lang, ...properties };
	if (client) void client.then((ph) => ph?.capture(event, props));
	else queue.push([event, props]);
}

function recipientFromCookie(): string | null {
	const match = document.cookie.match(new RegExp(`(?:^|; )${RECIPIENT_COOKIE}=([a-z0-9]{6})`));
	return match ? match[1] : null;
}

function trackClicks() {
	document.addEventListener('click', (e) => {
		const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]');
		if (!el?.dataset.track) return;
		const properties: Record<string, string> = {};
		for (const [name, value] of Object.entries(el.dataset)) {
			if (name.startsWith('track') && name !== 'track' && value !== undefined) {
				properties[name.slice(5, 6).toLowerCase() + name.slice(6)] = value;
			}
		}
		capture(el.dataset.track, properties);
	});
}

export function initAnalytics(key: string, host: string, enabled: boolean) {
	if (client || !enabled || !key) {
		queue.length = 0;
		return;
	}

	client = new Promise((resolve) => {
		const load = () =>
			import('posthog-js')
				.then(({ default: posthog }) => {
					posthog.init(key, {
						api_host: host,
						defaults: '2026-08-30',
						person_profiles: 'never',
						persistence: 'localStorage',
						respect_dnt: true,
						disable_session_recording: true,
						disable_surveys: true
					});
					const recipient = recipientFromCookie();
					posthog.register({ site: 'hkuwana', ...(recipient ? { recipient } : {}) });
					resolve(posthog);
				})
				.catch(() => resolve(null));
		if ('requestIdleCallback' in window) requestIdleCallback(load, { timeout: 2000 });
		else setTimeout(load, 1);
	});

	for (const [event, props] of queue.splice(0)) capture(event, props);
	trackClicks();
}
