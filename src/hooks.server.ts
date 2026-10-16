import { redirect, type Handle } from '@sveltejs/kit';
import { dict } from '$lib/i18n';
import { legacyRoute } from '$lib/redirects';

export const handle: Handle = async ({ event, resolve }) => {
	const legacy = legacyRoute(event.url.pathname);
	if (legacy?.status === 301) redirect(301, legacy.location);
	if (legacy?.status === 410) return gone(event.url.pathname.startsWith('/ja/') ? 'ja' : 'en');

	const lang = event.params.lang === 'ja' ? 'ja' : 'en';
	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};

function gone(lang: 'en' | 'ja'): Response {
	const t = dict(lang).gone;
	const home = lang === 'ja' ? '/ja/method' : '/method';
	const html = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${t.title}</title></head><body style="font-family:system-ui,sans-serif;max-width:36rem;margin:4rem auto;padding:0 1rem;line-height:1.6"><h1>${t.title}</h1><p>${t.body} <a href="${home}">${t.link}</a></p></body></html>`;
	return new Response(html, { status: 410, headers: { 'content-type': 'text/html; charset=utf-8' } });
}
