// The origin the site is served from. hirokuwana.com is the domain attached to the live
// deployment today; change this one line if the site moves to another domain.
export const SITE_ORIGIN = 'https://hirokuwana.com';

export const OTTERD_URL = 'https://otterd.co';

export const SOCIAL = {
	linkedin: 'https://www.linkedin.com/in/hkuwana',
	github: 'https://github.com/hkuwana'
};

// The contact address never appears in the HTML: layouts pass this encoded form to
// ContactButton, which decodes it only when the visitor clicks. Override at build time with
// CONTACT_EMAIL.
export const DEFAULT_CONTACT_EMAIL = 'hello@hkuwana.com';
