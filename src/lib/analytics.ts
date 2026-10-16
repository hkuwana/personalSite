// Client-side event capture. Events sent before PostHog has loaded are queued.
type Properties = Record<string, unknown>;

const queue: [string, Properties][] = [];
let send: ((event: string, properties: Properties) => void) | null = null;

export function capture(event: string, properties: Properties = {}) {
	if (typeof window === 'undefined') return;
	const props = { lang: document.documentElement.lang, ...properties };
	if (send) send(event, props);
	else queue.push([event, props]);
}

/** Called once PostHog is ready; flushes anything captured before then. */
export function connect(fn: (event: string, properties: Properties) => void) {
	send = fn;
	for (const [event, props] of queue.splice(0)) fn(event, props);
}
