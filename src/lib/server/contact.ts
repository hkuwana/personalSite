import { env } from '$env/dynamic/private';
import { DEFAULT_CONTACT_EMAIL } from '$lib/site';

/**
 * Reverse and base64 the address so it never appears as plain text in the built pages.
 * CONTACT_EMAIL is deliberately not PUBLIC_: public dynamic env is shipped to the browser.
 */
export function encodedContact(): string {
	const email = env.CONTACT_EMAIL || DEFAULT_CONTACT_EMAIL;
	return btoa([...email].reverse().join(''));
}
