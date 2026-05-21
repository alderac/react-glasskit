import { readFile } from 'node:fs/promises';
import path from 'node:path';

const fixtureFiles = (process.env.AGENT_DOCS_AUDIT_FIXTURE ?? '')
  .split(path.delimiter)
  .filter(Boolean);

const checks = [
  {
    files: [
      'README.md',
      'docs/getting-started.md',
      'demo/src/App.tsx',
      'AGENTS.md',
      'llms.txt',
      ...fixtureFiles,
    ],
    pattern: /react-glasskit-\d+\.\d+\.\d+\.tgz/g,
    message:
      'Do not hardcode generated react-glasskit tarball versions in agent-visible docs. Refer to the tarball printed by npm pack instead.',
  },
  {
    files: [
      'README.md',
      'docs/getting-started.md',
      'demo/src/App.tsx',
      'src/index.ts',
      'AGENTS.md',
      'llms.txt',
      ...fixtureFiles,
    ],
    pattern: /react-glasskit\/src\/css\/tokens\.css/g,
    message:
      'Use the public token CSS export react-glasskit/css/tokens.css in agent-visible docs.',
  },
];

const failures = [];

for (const check of checks) {
  for (const filePath of check.files) {
    const source = await readFile(filePath, 'utf8');
    const matches = [...source.matchAll(check.pattern)];

    for (const match of matches) {
      const lineNumber = source.slice(0, match.index).split(/\r?\n/).length;
      failures.push(`${filePath}:${lineNumber}: ${check.message}`);
    }
  }
}

if (failures.length > 0) {
  throw new Error(`Agent-visible docs audit failed:\n${failures.join('\n')}`);
}

console.log('Agent-visible docs audit passed.');
