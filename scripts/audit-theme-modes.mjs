import { readFile } from 'node:fs/promises';

const tokensCss = await readFile('src/css/tokens.css', 'utf8');
const glassCss = await readFile('src/css/glass.module.css', 'utf8');
const demoHtml = await readFile('demo/index.html', 'utf8');
const demoApp = await readFile('demo/src/App.tsx', 'utf8');
const demoCss = await readFile('demo/src/demo.css', 'utf8');

const requiredTokenSnippets = [
  'color-scheme: light;',
  '@media (prefers-color-scheme: dark)',
  ':is(.light, [data-theme="light"])',
  ':is(.dark, [data-theme="dark"])',
  'color-scheme: dark;',
];

const missingTokenSnippets = requiredTokenSnippets.filter(
  (snippet) => !tokensCss.includes(snippet)
);

if (missingTokenSnippets.length > 0) {
  throw new Error(
    `Missing required theme token snippets:\n${missingTokenSnippets
      .map((snippet) => `- ${snippet}`)
      .join('\n')}`
  );
}

const rootBlockStart = tokensCss.indexOf(':root {');
const rootBlockEnd = tokensCss.indexOf('@media (prefers-color-scheme: dark)', rootBlockStart);
const rootBlock = tokensCss.slice(rootBlockStart, rootBlockEnd);
const requiredRootThemeConstants = [
  '--glass-bg-regular-light',
  '--glass-bg-regular-dark',
  '--glass-scrim-bg-regular-light',
  '--glass-scrim-bg-regular-dark',
];
const missingRootThemeConstants = requiredRootThemeConstants.filter(
  (snippet) => !rootBlock.includes(snippet)
);

if (missingRootThemeConstants.length > 0) {
  throw new Error(
    `Missing required root theme constants:\n${missingRootThemeConstants
      .map((snippet) => `- ${snippet}`)
      .join('\n')}`
  );
}

const mediaIndex = tokensCss.indexOf('@media (prefers-color-scheme: dark)');
const lightIndex = tokensCss.indexOf(':is(.light, [data-theme="light"])');
const darkIndex = tokensCss.indexOf(':is(.dark, [data-theme="dark"])');

if (!(mediaIndex < lightIndex && lightIndex < darkIndex)) {
  throw new Error(
    'Expected forced light tokens after the system dark media query and before forced dark tokens.'
  );
}

const requiredComponentSnippets = [
  ':global(:is(.light, [data-theme="light"]))',
  ':global(:is(.dark, [data-theme="dark"]))',
  '.scrimRegular',
  '--glass-bg-regular-light',
  '--glass-bg-regular-dark',
  '--glass-scrim-bg-regular-light',
  '--glass-scrim-bg-regular-dark',
];

const missingComponentSnippets = requiredComponentSnippets.filter(
  (snippet) => !glassCss.includes(snippet)
);

if (missingComponentSnippets.length > 0) {
  throw new Error(
    `Missing required component theme snippets:\n${missingComponentSnippets
      .map((snippet) => `- ${snippet}`)
      .join('\n')}`
  );
}

if (demoHtml.includes('class="dark"')) {
  throw new Error('Demo HTML must not hard-code dark mode on <html>.');
}

const requiredDemoSnippets = [
  "type DemoTheme = 'light' | 'dark'",
  'setDemoTheme',
  'document.documentElement.dataset.theme = demoTheme',
  'aria-pressed={demoTheme ===',
  'demo-theme-toggle',
];

const missingDemoSnippets = requiredDemoSnippets.filter(
  (snippet) => !demoApp.includes(snippet) && !demoCss.includes(snippet)
);

if (missingDemoSnippets.length > 0) {
  throw new Error(
    `Missing required demo theme snippets:\n${missingDemoSnippets
      .map((snippet) => `- ${snippet}`)
      .join('\n')}`
  );
}

console.log('Theme mode audit passed.');
