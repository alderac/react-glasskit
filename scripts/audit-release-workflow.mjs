import { readFile } from 'node:fs/promises';

const lineBreakPattern = /\r?\n/;
const jobHeaderPattern = /^ {2}[\w-]+:/;

function extractJob(source, jobName) {
  const lines = source.split(lineBreakPattern);
  const startIndex = lines.indexOf(`  ${jobName}:`);

  if (startIndex === -1) {
    throw new Error(`Release workflow is missing the "${jobName}" job.`);
  }

  const jobLines = [];

  for (const line of lines.slice(startIndex + 1)) {
    if (jobHeaderPattern.test(line)) {
      break;
    }

    jobLines.push(line);
  }

  return jobLines.join('\n');
}

function assertIncludes(source, expected, message) {
  if (!source.includes(expected)) {
    throw new Error(message);
  }
}

const releaseWorkflow = await readFile('.github/workflows/release.yml', 'utf8');
const publishJob = extractJob(releaseWorkflow, 'publish');

const requiredPublishSetup = [
  {
    expected: 'demo/package-lock.json',
    message:
      'Publish job must cache demo dependencies because release:publish runs smoke:demo.',
  },
  {
    expected: 'name: Install demo dependencies',
    message:
      'Publish job must install demo dependencies because release:publish runs smoke:demo.',
  },
  {
    expected: 'working-directory: demo',
    message: 'Publish job must run demo dependency installation inside demo.',
  },
  {
    expected: 'npx playwright install --with-deps chromium',
    message:
      'Publish job must install Chromium because release:publish runs the demo browser smoke.',
  },
];

for (const check of requiredPublishSetup) {
  assertIncludes(publishJob, check.expected, check.message);
}

console.log('Release workflow audit passed.');
