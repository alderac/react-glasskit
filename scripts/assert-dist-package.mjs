import { access, readFile } from 'node:fs/promises';

const requiredFiles = [
  'dist/index.js',
  'dist/index.d.ts',
  'dist/index.css',
  'dist/css/tokens.css',
  'dist/css/glass.module.css',
];

async function assertFileExists(filePath) {
  try {
    await access(filePath);
  } catch {
    throw new Error(`Missing required build artifact: ${filePath}`);
  }
}

for (const filePath of requiredFiles) {
  await assertFileExists(filePath);
}

const entrySource = await readFile('dist/index.js', 'utf8');
const bundledCssSource = await readFile('dist/index.css', 'utf8');
const cssEntryImportPattern =
  /^\s*(?:\/\*[\s\S]*?\*\/\s*|\/\/[^\n]*\n\s*)*import\s+['"]\.\/index\.css['"](?:\s+with\s+\{[^;]*\})?\s*;/;

if (!cssEntryImportPattern.test(entrySource)) {
  throw new Error(
    "dist/index.js must import './index.css' before runtime exports."
  );
}

const requiredCssDeclarationPatterns = {
  'backdrop-filter:': /(^|[;{\n]\s*)backdrop-filter:/,
  '-webkit-backdrop-filter:': /-webkit-backdrop-filter:/,
};

for (const [cssDeclaration, pattern] of Object.entries(
  requiredCssDeclarationPatterns
)) {
  if (!pattern.test(bundledCssSource)) {
    throw new Error(
      `dist/index.css must preserve ${cssDeclaration} for glass surfaces.`
    );
  }
}

const declarationSource = await readFile('dist/index.d.ts', 'utf8');

for (const publicSymbol of [
  'GlassRegular',
  'GlassRegularProps',
  'GlassClear',
  'GlassClearProps',
  'GlassPanel',
  'GlassPanelProps',
  'GlassScrim',
  'GlassScrimProps',
  'GlassScrimStrength',
  'PanelSeparator',
  'useActivePanel',
  'useResizablePanels',
  'GlassRadius',
  'PolymorphicForwardRefComponent',
  'PolymorphicRef',
]) {
  if (!declarationSource.includes(publicSymbol)) {
    throw new Error(`dist/index.d.ts does not expose ${publicSymbol}.`);
  }
}

const packageJson = JSON.parse(await readFile('package.json', 'utf8'));

const expectedPackageFields = {
  main: './dist/index.js',
  module: './dist/index.js',
  types: './dist/index.d.ts',
};

for (const [field, expectedValue] of Object.entries(expectedPackageFields)) {
  if (packageJson[field] !== expectedValue) {
    throw new Error(`package.json ${field} must be ${expectedValue}.`);
  }
}

const expectedExports = {
  '.': {
    types: './dist/index.d.ts',
    import: './dist/index.js',
  },
  './css/components.css': './dist/index.css',
  './css/tokens.css': './dist/css/tokens.css',
  './css/tokens': './dist/css/tokens.css',
  './css/glass.module.css': './dist/css/glass.module.css',
  './css/glass': './dist/css/glass.module.css',
};

for (const [exportPath, expectedValue] of Object.entries(expectedExports)) {
  const actualValue = packageJson.exports?.[exportPath];

  if (JSON.stringify(actualValue) !== JSON.stringify(expectedValue)) {
    throw new Error(
      `package.json exports["${exportPath}"] must be ${JSON.stringify(expectedValue)}.`
    );
  }
}

if (
  Object.keys(packageJson.exports ?? {}).some((key) => key.startsWith('./src'))
) {
  throw new Error(
    'package.json must not export source paths for the v1 public contract.'
  );
}

if (packageJson.files?.includes('src')) {
  throw new Error(
    'package.json files must not ship src in the v1 npm package.'
  );
}

console.log('Dist package assertions passed.');
