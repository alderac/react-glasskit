import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';

await mkdir('dist/css', { recursive: true });
await cp('src/css/tokens.css', 'dist/css/tokens.css');
await cp('src/css/glass.module.css', 'dist/css/glass.module.css');

const entryFile = 'dist/index.js';
const entrySource = await readFile(entryFile, 'utf8');

if (!entrySource.startsWith("import './index.css';")) {
  await writeFile(entryFile, `import './index.css';\n${entrySource}`);
}
