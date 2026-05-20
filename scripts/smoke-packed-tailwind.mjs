import { execFileSync } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const tempRoot = path.join(root, '.tmp');
const smokeRoot = path.join(tempRoot, 'smoke-tailwind');

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
  });
}

await rm(smokeRoot, { recursive: true, force: true });
await mkdir(path.join(smokeRoot, 'src'), { recursive: true });
await mkdir(tempRoot, { recursive: true });

const packOutput = run('npm', [
  'pack',
  '--pack-destination',
  tempRoot,
  '--ignore-scripts',
]);
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
        build: 'vite build',
      },
      dependencies: {
        '@vitejs/plugin-react': '^6.0.2',
        vite: '^8.0.13',
        typescript: '^5.4.0',
        react: '^19.2.6',
        'react-dom': '^19.2.6',
        tailwindcss: '^4.0.0',
        '@tailwindcss/vite': '^4.0.0',
        'react-glasskit': `file:${tarball}`,
      },
      devDependencies: {},
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
  path.join(smokeRoot, 'vite.config.ts'),
  `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
`
);

await writeFile(
  path.join(smokeRoot, 'tsconfig.json'),
  JSON.stringify(
    {
      compilerOptions: {
        target: 'ES2022',
        useDefineForClassFields: true,
        lib: ['DOM', 'DOM.Iterable', 'ES2022'],
        allowJs: false,
        skipLibCheck: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        strict: true,
        forceConsistentCasingInFileNames: true,
        module: 'ESNext',
        moduleResolution: 'Bundler',
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: 'react-jsx',
      },
      include: ['src'],
    },
    null,
    2
  )
);

await writeFile(
  path.join(smokeRoot, 'src/styles.css'),
  `@import "tailwindcss";
@import "react-glasskit/css/tokens.css";

:root {
  --glass-radius: 0.75rem;
}

.dark {
  --glass-bg-panel: rgb(15 23 42 / 0.72);
}
`
);

await writeFile(
  path.join(smokeRoot, 'src/main.tsx'),
  `import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  GlassClear,
  GlassPanel,
  PanelSeparator,
  useActivePanel,
  useResizablePanels,
} from 'react-glasskit';
import './styles.css';

type PanelId = 'editor' | 'inspector';

function App() {
  const active = useActivePanel<PanelId>({ initialPanelId: 'editor' });
  const panels = useResizablePanels({
    primaryPanelId: 'editor-panel',
    initialSize: 58,
    minSize: 30,
    maxSize: 75,
  });

  return (
    <main
      ref={panels.containerRef}
      className="flex min-h-screen gap-0 bg-slate-950 p-6 text-slate-50"
    >
      <GlassPanel
        id="editor-panel"
        focused={active.isFocused('editor')}
        inactive={active.isInactive('editor')}
        className="grid min-w-0 content-start gap-3 p-5"
        style={panels.primaryPanelStyle}
        onClick={() => active.activatePanel('editor')}
      >
        <h1 className="text-xl font-semibold">Editor</h1>
        <GlassClear dimmed className="p-3 text-sm">
          Tailwind utilities compose with GlassKit surfaces.
        </GlassClear>
      </GlassPanel>

      <PanelSeparator
        resizable
        aria-label="Resize editor and inspector panels"
        {...panels.separatorProps}
      />

      <GlassPanel
        focused={active.isFocused('inspector')}
        inactive={active.isInactive('inspector')}
        className="grid min-w-0 content-start gap-3 p-5"
        style={panels.secondaryPanelStyle}
        onClick={() => active.activatePanel('inspector')}
      >
        <h2 className="text-lg font-semibold">Inspector</h2>
      </GlassPanel>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
`
);

run('npm', ['install', '--no-audit', '--no-fund'], smokeRoot);
run('npm', ['run', 'build'], smokeRoot);
console.log('Packed Tailwind smoke test passed.');
