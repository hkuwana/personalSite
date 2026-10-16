import type { ParamMatcher } from '@sveltejs/kit';

// English lives at /, Japanese at /ja. Only "ja" matches, so there is no duplicate /en.
export const match: ParamMatcher = (param) => param === 'ja';
