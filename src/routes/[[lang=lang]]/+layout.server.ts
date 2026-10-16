import { encodedContact } from '$lib/server/contact';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => ({ contact: encodedContact() });
