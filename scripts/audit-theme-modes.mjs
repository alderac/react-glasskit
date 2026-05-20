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
  '--glass-scrim-bg-soft-light',
  '--glass-scrim-bg-regular-light',
  '--glass-scrim-bg-strong-light',
  '--glass-scrim-bg-soft-dark',
  '--glass-scrim-bg-regular-dark',
  '--glass-scrim-bg-strong-dark',
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
  '--glass-bg-regular-light',
  '--glass-bg-regular-dark',
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

const requiredScrimThemeRules = [
  [
    ':global(:is(.light, [data-theme="light"])) .scrimSoft',
    '--glass-scrim-bg-soft-light',
  ],
  [
    ':global(:is(.light, [data-theme="light"])) .scrimRegular',
    '--glass-scrim-bg-regular-light',
  ],
  [
    ':global(:is(.light, [data-theme="light"])) .scrimStrong',
    '--glass-scrim-bg-strong-light',
  ],
  [
    ':global(:is(.dark, [data-theme="dark"])) .scrimSoft',
    '--glass-scrim-bg-soft-dark',
  ],
  [
    ':global(:is(.dark, [data-theme="dark"])) .scrimRegular',
    '--glass-scrim-bg-regular-dark',
  ],
  [
    ':global(:is(.dark, [data-theme="dark"])) .scrimStrong',
    '--glass-scrim-bg-strong-dark',
  ],
];

const missingScrimThemeRules = requiredScrimThemeRules.filter(
  ([selector, token]) =>
    !glassCss.includes(selector) ||
    !glassCss.slice(glassCss.indexOf(selector), glassCss.indexOf('}', glassCss.indexOf(selector))).includes(token)
);

if (missingScrimThemeRules.length > 0) {
  throw new Error(
    `Missing required scrim component theme rules:\n${missingScrimThemeRules
      .map(([selector, token]) => `- ${selector}: ${token}`)
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
  'GlassScrim',
  'radius="none"',
  'radius="lg"',
  'demo-scrim',
  'demo-link-card',
];

const requiredDemoJsxSnippets = [
  '<GlassScrim strength="regular" radius="lg" className="demo-scrim-preview" />',
  '<GlassPanel as="nav" aria-label="Preview navigation" radius="lg" className="demo-scrim-panel">',
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

const missingDemoJsxSnippets = requiredDemoJsxSnippets.filter(
  (snippet) => !demoApp.includes(snippet)
);

if (missingDemoJsxSnippets.length > 0) {
  throw new Error(
    `Missing required visible demo JSX snippets:\n${missingDemoJsxSnippets
      .map((snippet) => `- ${snippet}`)
      .join('\n')}`
  );
}

console.log('Theme mode audit passed.');
