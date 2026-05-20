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

const getBlock = (startSnippet, endSnippet) => {
  const start = css.indexOf(startSnippet);
  if (start === -1) {
    return '';
  }

  const end = endSnippet ? css.indexOf(endSnippet, start + startSnippet.length) : css.length;
  return css.slice(start, end === -1 ? css.length : end);
};

const reducedTransparencyBlock = getBlock(
  '@media (prefers-reduced-transparency: reduce)',
  '@media (prefers-reduced-motion: reduce)'
);
const reducedMotionBlock = getBlock(
  '@media (prefers-reduced-motion: reduce)',
  '@media (prefers-contrast: more)'
);
const increasedContrastBlock = getBlock('@media (prefers-contrast: more)');
const baseScrimBlock = getBlock('.scrim {', '.scrimSoft');

const requiredBlockSnippets = [
  ['prefers-reduced-transparency', reducedTransparencyBlock, '.scrim'],
  ['prefers-reduced-motion', reducedMotionBlock, '.scrim'],
  ['prefers-contrast', increasedContrastBlock, '.scrim'],
  ['base scrim reset', baseScrimBlock, 'appearance: none;'],
  ['base scrim reset', baseScrimBlock, 'padding: 0;'],
  ['base scrim reset', baseScrimBlock, 'margin: 0;'],
  ['base scrim reset', baseScrimBlock, 'font: inherit;'],
  ['base scrim reset', baseScrimBlock, 'text-align: inherit;'],
  ['base scrim reset', baseScrimBlock, 'color: inherit;'],
  ['base scrim reset', baseScrimBlock, 'cursor: default;'],
];

const missingBlockSnippets = requiredBlockSnippets.filter(
  ([, block, snippet]) => !block.includes(snippet)
);

if (missingBlockSnippets.length > 0) {
  throw new Error(
    `Missing required scoped CSS fallback snippets:\n${missingBlockSnippets
      .map(([blockName, , snippet]) => `- ${blockName}: ${snippet}`)
      .join('\n')}`
  );
}

console.log('CSS accessibility fallback audit passed.');
