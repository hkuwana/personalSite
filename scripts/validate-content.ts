// Check every file under src/content against the rules in src/lib/server/content/build.ts.
// Run with `npm run validate`; `npm run build` runs it first. Exits 1 on any error.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { buildContent } from '../src/lib/server/content/build';

const root = join(import.meta.dirname, '..', 'src', 'content');

function walk(dir: string): string[] {
	return readdirSync(dir).flatMap((name) => {
		const path = join(dir, name);
		return statSync(path).isDirectory() ? walk(path) : [path];
	});
}

const files: Record<string, string> = {};
for (const path of walk(root)) {
	if (path.endsWith('.md')) files[relative(root, path)] = readFileSync(path, 'utf8');
}

const { content, errors, warnings } = buildContent(files, (path) =>
	existsSync(join(root, path)) ? path : null
);

for (const w of warnings) console.warn(`warning  ${w}`);
for (const e of errors) console.error(`error    ${e}`);

const counts = Object.entries(content)
	.map(([type, list]) => `${list.length} ${type}`)
	.join(', ');

if (errors.length > 0) {
	console.error(`\n${errors.length} error(s) in src/content (${counts}).`);
	process.exit(1);
}
console.log(`src/content is valid: ${counts}.`);
