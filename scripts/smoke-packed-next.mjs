import { execFileSync } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const tempRoot = path.join(root, '.tmp');
const smokeRoot = path.join(tempRoot, 'smoke-next');

// Keep PR CI reproducible; scheduled dependency refreshes can move this fixture deliberately.
const pinnedNextSmokeDependencies = {
  '@types/node': '25.8.0',
  '@types/react': '19.2.14',
  '@types/react-dom': '19.2.3',
  next: '16.2.6',
  react: '19.2.6',
  'react-dom': '19.2.6',
  typescript: '6.0.3',
};

function run(command, args, cwd = root) {
  const resolvedCommand =
    process.platform === 'win32' &&
    command === 'npm' &&
    process.env.npm_execpath
      ? process.execPath
      : command;

  const resolvedArgs =
    resolvedCommand === process.execPath
      ? [process.env.npm_execpath, ...args]
      : args;

  return execFileSync(resolvedCommand, resolvedArgs, {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'inherit'],
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: '1',
    },
  });
}

await rm(smokeRoot, { recursive: true, force: true });
await mkdir(path.join(smokeRoot, 'app'), { recursive: true });
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
        build: 'next build',
      },
      dependencies: {
        ...pinnedNextSmokeDependencies,
        'react-glasskit': `file:${tarball}`,
      },
    },
    null,
    2
  )
);

await writeFile(
  path.join(smokeRoot, 'next.config.mjs'),
  `const nextConfig = {
  output: 'export',
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
`
);

await writeFile(
  path.join(smokeRoot, 'tsconfig.json'),
  JSON.stringify(
    {
      compilerOptions: {
        target: 'ES2022',
        lib: ['DOM', 'DOM.Iterable', 'ES2022'],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: 'ESNext',
        moduleResolution: 'Bundler',
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: 'preserve',
        incremental: true,
        plugins: [{ name: 'next' }],
      },
      include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
      exclude: ['node_modules'],
    },
    null,
    2
  )
);

await writeFile(
  path.join(smokeRoot, 'app/globals.css'),
  `html,
body {
  margin: 0;
  min-height: 100%;
  font-family: system-ui, sans-serif;
  background: linear-gradient(135deg, #08111f, #1e1b4b);
}

button {
  font: inherit;
}
`
);

await writeFile(
  path.join(smokeRoot, 'app/layout.tsx'),
  `import type { ReactNode } from 'react';
import 'react-glasskit/css/tokens.css';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`
);

await writeFile(
  path.join(smokeRoot, 'app/page.tsx'),
  `'use client';

import {
  GlassClear,
  GlassPanel,
  PanelSeparator,
  useActivePanel,
  useResizablePanels,
} from 'react-glasskit';

type PanelId = 'editor' | 'inspector';

export default function Page() {
  const activePanels = useActivePanel<PanelId>({
    initialPanelId: 'editor',
  });

  const panels = useResizablePanels({
    primaryPanelId: 'editor-panel',
    initialSize: 56,
    minSize: 30,
    maxSize: 70,
  });

  return (
    <main
      ref={panels.containerRef}
      style={{ display: 'flex', minHeight: 320, padding: 24 }}
    >
      <GlassPanel
        id="editor-panel"
        focused={activePanels.isFocused('editor')}
        inactive={activePanels.isInactive('editor')}
        style={{ ...panels.primaryPanelStyle, padding: 20 }}
        onClick={() => activePanels.activatePanel('editor')}
      >
        <h1>Editor</h1>
        <GlassClear dimmed style={{ padding: 12 }}>
          Packed Next.js consumer
        </GlassClear>
      </GlassPanel>
      <PanelSeparator
        resizable
        aria-label="Resize editor and inspector panels"
        {...panels.separatorProps}
      />
      <GlassPanel
        focused={activePanels.isFocused('inspector')}
        inactive={activePanels.isInactive('inspector')}
        style={{ ...panels.secondaryPanelStyle, padding: 20 }}
        onClick={() => activePanels.activatePanel('inspector')}
      >
        Inspector
      </GlassPanel>
    </main>
  );
}
`
);

run('npm', ['install', '--no-audit', '--no-fund'], smokeRoot);
run('npm', ['run', 'build'], smokeRoot);
console.log('Packed Next.js smoke test passed.');
