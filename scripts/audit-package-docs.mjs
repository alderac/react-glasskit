import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

function runNpm(args) {
  if (process.env.npm_execpath) {
    return execFileSync(process.execPath, [process.env.npm_execpath, ...args], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
  }

  return execFileSync('npm', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

function parsePackOutput(output) {
  const jsonStart = output.indexOf('[');
  const jsonEnd = output.lastIndexOf(']');

  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error('npm pack --dry-run --json did not return JSON output.');
  }

  return JSON.parse(output.slice(jsonStart, jsonEnd + 1));
}

function isExternalLink(href) {
  return /^[a-z][a-z0-9+.-]*:/i.test(href);
}

function extractHref(rawTarget) {
  const target = rawTarget.trim();

  if (target.startsWith('<')) {
    const closingBracket = target.indexOf('>');
    return closingBracket === -1 ? target : target.slice(1, closingBracket);
  }

  return target.split(/\s+/)[0];
}

const packOutput = runNpm(['pack', '--dry-run', '--json', '--ignore-scripts']);
const [packInfo] = parsePackOutput(packOutput);
const packedFiles = new Set(
  packInfo.files.map((file) => file.path.replaceAll('\\', '/'))
);
const markdownFiles = [...packedFiles].filter((filePath) =>
  filePath.endsWith('.md')
);
const markdownLinkPattern = /!?\[[^\]]*\]\(([^)]+)\)/g;
const failures = [];

for (const filePath of packedFiles) {
  if (filePath.startsWith('docs/superpowers/')) {
    failures.push(
      `${filePath}: docs/superpowers is internal planning state and must not ship.`
    );
  }
}

for (const filePath of markdownFiles) {
  const source = await readFile(filePath, 'utf8');

  for (const match of source.matchAll(markdownLinkPattern)) {
    const href = extractHref(match[1]);
    const lineNumber = source.slice(0, match.index).split(/\r?\n/).length;

    if (!href || href.startsWith('#') || isExternalLink(href)) {
      continue;
    }

    const linkedPath = href.split(/[?#]/)[0];

    if (!linkedPath) {
      continue;
    }

    if (linkedPath.startsWith('/')) {
      failures.push(
        `${filePath}:${lineNumber}: root-relative link "${href}" will not resolve from the packed package.`
      );
      continue;
    }

    const resolvedPath = path.posix.normalize(
      path.posix.join(path.posix.dirname(filePath), linkedPath)
    );

    if (resolvedPath.startsWith('../') || resolvedPath === '..') {
      failures.push(
        `${filePath}:${lineNumber}: link "${href}" resolves outside the packed package.`
      );
      continue;
    }

    if (!packedFiles.has(resolvedPath)) {
      failures.push(
        `${filePath}:${lineNumber}: link "${href}" resolves to "${resolvedPath}", which is not included in the packed package.`
      );
    }
  }
}

if (failures.length > 0) {
  throw new Error(`Package docs audit failed:\n${failures.join('\n')}`);
}

console.log('Package docs audit passed.');
