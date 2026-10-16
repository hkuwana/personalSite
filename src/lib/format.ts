import type { Locale } from '$lib/i18n';

export function formatDate(iso: string, locale: Locale): string {
	return new Date(`${iso}T00:00:00Z`).toLocaleDateString(locale === 'ja' ? 'ja-JP' : 'en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC'
	});
}
