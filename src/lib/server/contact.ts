import { env } from '$env/dynamic/public';
import { DEFAULT_CONTACT_EMAIL } from '$lib/site';

/** Reverse and base64 the address so it never appears as plain text in the built pages. */
export function encodedContact(): string {
	const email = env.PUBLIC_CONTACT_EMAIL || DEFAULT_CONTACT_EMAIL;
	return btoa([...email].reverse().join(''));
}
