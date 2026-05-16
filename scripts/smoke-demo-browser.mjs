import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const host = '127.0.0.1';
const port = '4174';
const basePath = '/react-glasskit/';
const baseUrl = `http://${host}:${port}${basePath}`;

function npmInvocation(args) {
  if (process.platform === 'win32' && process.env.npm_execpath) {
    return {
      command: process.execPath,
      args: [process.env.npm_execpath, ...args],
    };
  }

  return { command: 'npm', args };
}

function startDemoServer() {
  const { command, args } = npmInvocation([
    '--prefix',
    'demo',
    'run',
    'preview',
    '--',
    '--host',
    host,
    '--port',
    port,
    '--strictPort',
  ]);

  const child = spawn(command, args, {
    stdio: ['ignore', 'pipe', 'pipe'],
    env: {
      ...process.env,
      BROWSER: 'none',
    },
  });

  child.stdout.on('data', (chunk) => process.stdout.write(chunk));
  child.stderr.on('data', (chunk) => process.stderr.write(chunk));

  return child;
}

async function stopDemoServer(child) {
  if (!child.pid || child.exitCode !== null) return;

  if (process.platform === 'win32') {
    await new Promise((resolve) => {
      const taskkill = spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], {
        stdio: 'ignore',
      });
      taskkill.on('close', resolve);
      taskkill.on('error', resolve);
    });
    return;
  }

  child.kill('SIGTERM');
}

async function waitForDemo() {
  const startedAt = Date.now();
  const timeoutMs = 60_000;

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  throw new Error(`Demo server did not respond at ${baseUrl}.`);
}

async function assertHeading(page, name) {
  await page.getByRole('heading', { name }).first().waitFor({
    state: 'visible',
    timeout: 10_000,
  });
}

async function smokeContext(browser, name, contextOptions) {
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();

  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await assertHeading(page, 'React GlassKit');
  await assertHeading(page, 'Workspace in five minutes');
  await assertHeading(page, 'When glass becomes a workspace system');
  await assertHeading(page, 'What the package verifies');

  const separator = page
    .getByRole('separator', { name: /resize timeline and inspector panes/i })
    .first();

  await separator.focus();

  const initialValue = await separator.getAttribute('aria-valuenow');
  if (initialValue !== '58') {
    throw new Error(`${name}: expected separator to start at aria-valuenow="58".`);
  }

  await page.keyboard.press('ArrowRight');

  const arrowValue = await separator.getAttribute('aria-valuenow');
  if (arrowValue !== '63') {
    throw new Error(`${name}: expected ArrowRight to move separator to 63.`);
  }

  await page.keyboard.press('Home');

  const homeValue = await separator.getAttribute('aria-valuenow');
  if (homeValue !== '32') {
    throw new Error(`${name}: expected Home to move separator to 32.`);
  }

  const screenshot = await page.screenshot();
  if (screenshot.length < 10_000) {
    throw new Error(`${name}: screenshot looked unexpectedly small.`);
  }

  await context.close();
}

const server = startDemoServer();

try {
  await waitForDemo();
  const browser = await chromium.launch();

  try {
    await smokeContext(browser, 'desktop', {
      viewport: { width: 1280, height: 900 },
      colorScheme: 'dark',
    });

    await smokeContext(browser, 'mobile', {
      viewport: { width: 390, height: 844 },
      isMobile: true,
      colorScheme: 'dark',
    });

    await smokeContext(browser, 'reduced motion', {
      viewport: { width: 1024, height: 768 },
      colorScheme: 'dark',
      reducedMotion: 'reduce',
    });

    await smokeContext(browser, 'forced colors', {
      viewport: { width: 1024, height: 768 },
      colorScheme: 'dark',
      forcedColors: 'active',
    });
  } finally {
    await browser.close();
  }

  console.log('Demo browser smoke passed.');
} finally {
  await stopDemoServer(server);
}
