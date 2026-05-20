import { readFile } from 'node:fs/promises';

const css = await readFile('src/css/glass.module.css', 'utf8');

const requiredSnippets = [
  '@media (prefers-reduced-transparency: reduce)',
  'backdrop-filter: none !important;',
  '-webkit-backdrop-filter: none !important;',
  '.scrim',
  '.clearDimmed::before',
  'display: none;',
  '@media (prefers-reduced-motion: reduce)',
  '.panelAnimate',
  'animation: none !important;',
  'transition: none !important;',
  '@media (prefers-contrast: more)',
  '.panelFocused',
  'var(--glass-high-contrast-focus)',
  '.separatorResizable:focus-visible',
];

const missingSnippets = requiredSnippets.filter((snippet) => !css.includes(snippet));

if (missingSnippets.length > 0) {
  throw new Error(
    `Missing required accessibility CSS fallback snippets:\n${missingSnippets
      .map((snippet) => `- ${snippet}`)
      .join('\n')}`
  );
}

console.log('CSS accessibility fallback audit passed.');
