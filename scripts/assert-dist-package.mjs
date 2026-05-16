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
const cssEntryImportPattern =
  /^\s*(?:\/\*[\s\S]*?\*\/\s*|\/\/[^\n]*\n\s*)*import\s+['"]\.\/index\.css['"](?:\s+with\s+\{[^;]*\})?\s*;/;

if (!cssEntryImportPattern.test(entrySource)) {
  throw new Error("dist/index.js must import './index.css' before runtime exports.");
}

const declarationSource = await readFile('dist/index.d.ts', 'utf8');

for (const publicSymbol of [
  'GlassRegular',
  'GlassClear',
  'GlassPanel',
  'PanelSeparator',
  'useActivePanel',
  'useResizablePanels',
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

console.log('Dist package assertions passed.');
