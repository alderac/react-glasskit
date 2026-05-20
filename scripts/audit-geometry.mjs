import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const tokensCss = readFileSync(
  join(rootDir, 'src/css/tokens.css'),
  'utf8'
).replace(/\r\n/g, '\n');
const glassCss = readFileSync(
  join(rootDir, 'src/css/glass.module.css'),
  'utf8'
).replace(/\r\n/g, '\n');

const requiredTokenSnippets = [
  '--glass-radius-none: 0px;',
  '--glass-radius-sm: 6px;',
  '--glass-radius-md: 12px;',
  '--glass-radius-lg: 18px;',
  '--glass-radius-xl: 24px;',
  '--glass-radius-full: 9999px;',
  '--glass-radius: var(--glass-radius-md);',
];

const requiredClassSnippets = [
  '.radiusNone {\n  border-radius: var(--glass-radius-none);\n}',
  '.radiusSm {\n  border-radius: var(--glass-radius-sm);\n}',
  '.radiusMd {\n  border-radius: var(--glass-radius-md);\n}',
  '.radiusLg {\n  border-radius: var(--glass-radius-lg);\n}',
  '.radiusXl {\n  border-radius: var(--glass-radius-xl);\n}',
  '.radiusFull {\n  border-radius: var(--glass-radius-full);\n}',
];

const missingSnippets = [
  ...requiredTokenSnippets.filter((snippet) => !tokensCss.includes(snippet)),
  ...requiredClassSnippets.filter((snippet) => !glassCss.includes(snippet)),
];

const findBlockEnd = (selector) => {
  const blockStart = glassCss.indexOf(`${selector} {`);

  if (blockStart === -1) {
    return -1;
  }

  const blockEnd = glassCss.indexOf('\n}', blockStart);

  return blockEnd === -1 ? -1 : blockEnd + 2;
};

const baseSurfaceBlockEnds = ['.regular', '.clear', '.panel'].map(
  (selector) => [selector, findBlockEnd(selector)]
);
const firstRadiusClassIndex = Math.min(
  ...[
    '.radiusNone',
    '.radiusSm',
    '.radiusMd',
    '.radiusLg',
    '.radiusXl',
    '.radiusFull',
  ].map((selector) => glassCss.indexOf(`${selector} {`))
);

for (const [selector, blockEnd] of baseSurfaceBlockEnds) {
  if (blockEnd === -1) {
    missingSnippets.push(`${selector} base block`);
  } else if (firstRadiusClassIndex <= blockEnd) {
    missingSnippets.push(
      `radius modifier block must appear after ${selector} base block`
    );
  }
}

if (missingSnippets.length > 0) {
  throw new Error(
    `Geometry audit failed. Missing snippets:\n${missingSnippets.join('\n')}`
  );
}

console.log('Geometry audit passed.');
