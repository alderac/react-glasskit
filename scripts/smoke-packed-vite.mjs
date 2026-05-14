import { mkdir, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const tempRoot = path.join(root, '.tmp');
const smokeRoot = path.join(tempRoot, 'smoke-vite');

function run(command, args, cwd = root) {
  if (process.platform === 'win32' && command === 'npm' && process.env.npm_execpath) {
    return execFileSync(process.execPath, [process.env.npm_execpath, ...args], {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'inherit'],
    });
  }

  return execFileSync(command, args, {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'inherit'],
  });
}

await rm(smokeRoot, { recursive: true, force: true });
await mkdir(path.join(smokeRoot, 'src'), { recursive: true });
await mkdir(tempRoot, { recursive: true });

const packOutput = run('npm', ['pack', '--pack-destination', tempRoot]);
const tarballName = packOutput.trim().split(/\r?\n/).at(-1);

if (!tarballName) {
  throw new Error('npm pack did not return a tarball name.');
}

const tarball = path.join(tempRoot, tarballName).replaceAll('\\', '/');

await writeFile(
  path.join(smokeRoot, 'package.json'),
  JSON.stringify(
    {
      private: true,
      type: 'module',
      scripts: {
        build: 'tsc --noEmit && vite build',
      },
      dependencies: {
        '@vitejs/plugin-react': '^4.3.0',
        typescript: '^5.4.0',
        vite: '^5.4.0',
        react: '^18.3.1',
        'react-dom': '^18.3.1',
        'react-glasskit': `file:${tarball}`,
      },
      devDependencies: {
        '@types/react': '^18.3.0',
        '@types/react-dom': '^18.3.0',
      },
    },
    null,
    2
  )
);

await writeFile(
  path.join(smokeRoot, 'tsconfig.json'),
  JSON.stringify(
    {
      compilerOptions: {
        target: 'ES2020',
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        module: 'ESNext',
        moduleResolution: 'bundler',
        jsx: 'react-jsx',
        strict: true,
        skipLibCheck: true,
      },
      include: ['src'],
    },
    null,
    2
  )
);

await writeFile(
  path.join(smokeRoot, 'index.html'),
  '<div id="root"></div><script type="module" src="/src/main.tsx"></script>\n'
);

await writeFile(
  path.join(smokeRoot, 'src/main.tsx'),
  `import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  GlassPanel,
  PanelSeparator,
  useResizablePanels,
} from 'react-glasskit';
import 'react-glasskit/css/tokens.css';

function App() {
  const panels = useResizablePanels({
    primaryPanelId: 'left-panel',
    initialSize: 55,
  });

  return (
    <main ref={panels.containerRef} style={{ display: 'flex', minHeight: 240 }}>
      <GlassPanel id="left-panel" style={panels.primaryPanelStyle}>
        Left
      </GlassPanel>
      <PanelSeparator
        resizable
        aria-label="Resize panels"
        {...panels.separatorProps}
      />
      <GlassPanel style={panels.secondaryPanelStyle}>Right</GlassPanel>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
`
);

run('npm', ['install', '--no-audit', '--no-fund'], smokeRoot);
run('npm', ['run', 'build'], smokeRoot);
