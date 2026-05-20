import { Fragment, useEffect, useState, type ReactNode } from 'react';
import {
  GlassRegular,
  GlassClear,
  GlassPanel,
  GlassScrim,
  PanelSeparator,
  useActivePanel,
  useResizablePanels,
} from 'react-glasskit';

type DemoTheme = 'light' | 'dark';

function getPreferredDemoTheme(): DemoTheme {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

const installCodeSample = [
  '# after the first public npm release',
  'npm install react-glasskit',
  '',
  '# pre-release dogfood from this repo',
  'npm run build && npm pack',
  'npm install /absolute/path/to/react-glasskit-0.1.20.tgz',
  '',
  "import 'react-glasskit/css/tokens.css';",
  "import { GlassPanel, PanelSeparator, useResizablePanels } from 'react-glasskit';",
].join('\n');

const workspaceFiveCodeSample = [
  "import { GlassPanel, PanelSeparator, useActivePanel, useResizablePanels } from 'react-glasskit';",
  "import 'react-glasskit/css/tokens.css';",
  '',
  "type WorkspacePanel = 'editor' | 'inspector';",
  '',
  'export function Workspace() {',
  "  const activePanels = useActivePanel<WorkspacePanel>({ initialPanelId: 'editor' });",
  '  const layout = useResizablePanels({',
  "    primaryPanelId: 'editor-panel',",
  '    initialSize: 58,',
  '    minSize: 32,',
  '    maxSize: 72,',
  '  });',
  '',
  '  return (',
  "    <main ref={layout.containerRef} style={{ display: 'flex', minHeight: 360 }}>",
  '      <GlassPanel',
  '        id="editor-panel"',
  "        focused={activePanels.isFocused('editor')}",
  "        inactive={activePanels.isInactive('editor')}",
  '        style={layout.primaryPanelStyle}',
  "        onClick={() => activePanels.activatePanel('editor')}",
  '      >',
  '        Editor',
  '      </GlassPanel>',
  '      <PanelSeparator',
  '        resizable',
  '        aria-label="Resize editor and inspector panels"',
  '        {...layout.separatorProps}',
  '      />',
  '      <GlassPanel',
  "        focused={activePanels.isFocused('inspector')}",
  "        inactive={activePanels.isInactive('inspector')}",
  '        style={layout.secondaryPanelStyle}',
  "        onClick={() => activePanels.activatePanel('inspector')}",
  '      >',
  '        Inspector',
  '      </GlassPanel>',
  '    </main>',
  '  );',
  '}',
].join('\n');

const comparisonItems = [
  {
    need: 'One decorative overlay',
    localCss: 'Often enough',
    glasskit: 'More package than you need',
  },
  {
    need: 'Repeated workspace surfaces',
    localCss: 'Panel styles drift across files',
    glasskit: 'Shared primitives and tokens',
  },
  {
    need: 'Accessibility fallbacks',
    localCss: 'Every media query is app-owned',
    glasskit: 'Motion, transparency, contrast, and focus fallbacks ship together',
  },
  {
    need: 'Resizable split panels',
    localCss: 'Pointer, keyboard, and ARIA behavior are custom work',
    glasskit: 'PanelSeparator and useResizablePanels cover the v1 splitter path',
  },
];

const integrationItems = [
  {
    name: 'Tailwind CSS',
    description: 'Use utilities for layout and typography while GlassKit tokens control the material.',
  },
  {
    name: 'shadcn/ui',
    description: 'Keep shadcn controls and use GlassKit as the panel, overlay, and splitter surface.',
  },
  {
    name: 'Headless primitives',
    description: 'Pair Radix, Base UI, or React Aria behavior with GlassKit surfaces.',
  },
  {
    name: 'Design systems',
    description: 'Map Bootstrap, Chakra, Mantine, MUI, Panda, or vanilla-extract themes through CSS variables.',
  },
];

const regularCodeSample = [
  "import { GlassRegular } from 'react-glasskit';",
  '',
  'export function NavExample() {',
  '  return (',
  '    <GlassRegular',
  '      as="nav"',
  '      style={{',
  "        display: 'flex',",
  "        alignItems: 'center',",
  "        justifyContent: 'space-between',",
  '        gap: 16,',
  "        padding: '12px 20px',",
  '      }}',
  '    >',
  '      <strong>Acme App</strong>',
  '      <a href="/dashboard">Dashboard</a>',
  '      <a href="/projects">Projects</a>',
  '      <button type="button">Sign In</button>',
  '    </GlassRegular>',
  '  );',
  '}',
].join('\n');

const panelCodeSample = [
  "import { GlassPanel, PanelSeparator, useActivePanel } from 'react-glasskit';",
  '',
  'export function SplitPanelExample() {',
  "  const activePanels = useActivePanel<'editor' | 'inspector'>({",
  "    initialPanelId: 'editor',",
  '  });',
  '',
  '  return (',
  '    <div style={{ display: \'flex\', height: 320 }}>',
  '      <GlassPanel',
  "        focused={activePanels.isFocused('editor')}",
  "        inactive={activePanels.isInactive('editor')}",
  '        animate',
  '        style={{ flex: 1, padding: 20 }}',
  "        onClick={() => activePanels.activatePanel('editor')}",
  '      >',
  '        <h3>Editor</h3>',
  '        <p>Primary workspace panel. Click to focus.</p>',
  '      </GlassPanel>',
  '',
  '      <PanelSeparator orientation="vertical" />',
  '',
  '      <GlassPanel',
  "        focused={activePanels.isFocused('inspector')}",
  "        inactive={activePanels.isInactive('inspector')}",
  '        animate',
  '        style={{ flex: 1, padding: 20 }}',
  "        onClick={() => activePanels.activatePanel('inspector')}",
  '      >',
  '        <h3>Inspector</h3>',
  '        <p>Secondary detail panel. Click to focus.</p>',
  '      </GlassPanel>',
  '    </div>',
  '  );',
  '}',
].join('\n');

const clearCodeSample = [
  "import { GlassClear } from 'react-glasskit';",
  '',
  'export function FloatingToolbarExample() {',
  '  return (',
  '    <div',
  '      style={{',
  "        minHeight: 240,",
  "        display: 'grid',",
  "        placeItems: 'center',",
  "        background: 'linear-gradient(135deg, #0ea5e9, #ec4899, #22c55e)',",
  '      }}',
  '    >',
  '      <GlassClear dimmed>',
  '        <div style={{ display: \'flex\', gap: 12, padding: \'10px 20px\' }}>',
  '          <button type="button">Move</button>',
  '          <button type="button">Pen</button>',
  '          <button type="button">Shape</button>',
  '          <button type="button">Erase</button>',
  '        </div>',
  '      </GlassClear>',
  '    </div>',
  '  );',
  '}',
].join('\n');

const scrimCodeSample = [
  "import { GlassPanel, GlassScrim } from 'react-glasskit';",
  '',
  'export function MobileNavigation({ onClose }: { onClose: () => void }) {',
  '  return (',
  '    <div className="mobile-navigation-layer">',
  '      <GlassScrim',
  '        as="button"',
  '        type="button"',
  '        aria-label="Close navigation"',
  '        strength="regular"',
  '        onClick={onClose}',
  '      />',
  '      <GlassPanel as="nav" aria-label="Mobile navigation" radius="none">',
  '        <a href="/dashboard">Dashboard</a>',
  '        <a href="/projects">Projects</a>',
  '        <a href="/settings">Settings</a>',
  '      </GlassPanel>',
  '    </div>',
  '  );',
  '}',
].join('\n');

const linkCardCodeSample = [
  "import Link from 'next/link';",
  "import { GlassRegular } from 'react-glasskit';",
  '',
  'export function InfoCard() {',
  '  return (',
  '    <GlassRegular',
  '      as={Link}',
  '      href="/info"',
  '      radius="lg"',
  '      className="block p-5"',
  '      aria-label="Open information hub"',
  '    >',
  '      <span>Information hub</span>',
  '      <strong>Polymorphic glass surfaces with Next.js Link</strong>',
  '    </GlassRegular>',
  '  );',
  '}',
].join('\n');

const separatorCodeSample = [
  "import { GlassRegular, PanelSeparator, useResizablePanels } from 'react-glasskit';",
  '',
  'export function SeparatorExamples() {',
  '  const panels = useResizablePanels({',
  "    primaryPanelId: 'timeline-panel',",
  '    initialSize: 58,',
  '    minSize: 32,',
  '    maxSize: 72,',
  '  });',
  '',
  '  return (',
  '    <>',
  '      <div style={{ display: \'flex\', height: 150 }}>',
  '        <GlassRegular style={{ flex: 1 }}>Panel A</GlassRegular>',
  '        <PanelSeparator orientation="vertical" />',
  '        <GlassRegular style={{ flex: 1 }}>Panel B</GlassRegular>',
  '      </div>',
  '',
  '      <div ref={panels.containerRef} style={{ display: \'flex\', height: 150 }}>',
  "        <GlassRegular id=\"timeline-panel\" style={panels.primaryPanelStyle}>",
  '          Timeline {panels.primarySize}%',
  '        </GlassRegular>',
  '        <PanelSeparator',
  '          orientation="vertical"',
  '          resizable',
  '          aria-label="Resize timeline and inspector panes"',
  '          {...panels.separatorProps}',
  '        />',
  '        <GlassRegular style={panels.secondaryPanelStyle}>Inspector</GlassRegular>',
  '      </div>',
  '    </>',
  '  );',
  '}',
].join('\n');

const codeTokenPattern =
  /(\/\/.*)|('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")|(<\/?[\w.]+|\/?>)|(\b[A-Za-z_$][\w$-]*(?=\=))|(\b(?:import|from|export|function|return|const|let|type|as|if|new)\b)/g;

function highlightCode(source: string): ReactNode[] {
  return source.split('\n').flatMap((line, lineIndex) => {
    const nodes: ReactNode[] = [];
    let lastIndex = 0;

    for (const match of line.matchAll(codeTokenPattern)) {
      const [token, comment, stringValue, tag, attr, keyword] = match;
      const index = match.index ?? 0;

      if (index > lastIndex) {
        nodes.push(line.slice(lastIndex, index));
      }

      const className = comment
        ? 'cmt'
        : stringValue
          ? 'str'
          : tag
            ? 'tag'
            : attr
              ? 'attr'
              : keyword
                ? 'kw'
                : undefined;

      nodes.push(
        className ? (
          <span className={className} key={`${lineIndex}-${index}`}>
            {token}
          </span>
        ) : (
          token
        )
      );

      lastIndex = index + token.length;
    }

    if (lastIndex < line.length) {
      nodes.push(line.slice(lastIndex));
    }

    if (lineIndex < source.split('\n').length - 1) {
      nodes.push('\n');
    }

    return nodes.map((node, nodeIndex) => (
      <Fragment key={`${lineIndex}-${nodeIndex}`}>
        {node}
      </Fragment>
    ));
  });
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="demo-code">
      <code>{highlightCode(children)}</code>
    </pre>
  );
}

export default function App() {
  const [demoTheme, setDemoTheme] = useState<DemoTheme>(getPreferredDemoTheme);
  const activePanels = useActivePanel<'left' | 'right'>({
    initialPanelId: 'left',
  });
  const resizablePanels = useResizablePanels({
    primaryPanelId: 'timeline-panel',
    initialSize: 58,
    minSize: 32,
    maxSize: 72,
  });

  useEffect(() => {
    document.documentElement.dataset.theme = demoTheme;

    return () => {
      delete document.documentElement.dataset.theme;
    };
  }, [demoTheme]);

  return (
    <>
      {/* Animated mesh gradient background */}
      <div className="demo-bg" />

      <div className="demo-container">
        {/* ── Hero ─────────────────────────────────────────── */}
        <header className="demo-hero">
          <div className="demo-hero-bar">
            <div className="demo-badge">
            <span>v1 path</span> — Workspace Material Layer
            </div>
            <div className="demo-theme-toggle" aria-label="Demo color mode">
              <button
                type="button"
                aria-pressed={demoTheme === 'light'}
                onClick={() => setDemoTheme('light')}
              >
                Light
              </button>
              <button
                type="button"
                aria-pressed={demoTheme === 'dark'}
                onClick={() => setDemoTheme('dark')}
              >
                Dark
              </button>
            </div>
          </div>
          <h1>React GlassKit</h1>
          <p>
            Workspace-first glass primitives for React applications: panels,
            separators, overlays, focus states, and accessibility fallbacks without a
            full shell framework.
          </p>
        </header>

        <section className="demo-section demo-adoption" aria-labelledby="adoption-title">
          <p className="demo-section-label">Start Here</p>
          <h2 className="demo-section-title" id="adoption-title">
            Workspace in five minutes
          </h2>
          <p className="demo-section-desc">
            Install the package, import tokens once, then compose the public primitives into
            focused and resizable workspace panels.
          </p>

          <div className="demo-adoption-grid">
            <div>
              <h3>1. Install and import</h3>
              <CodeBlock>{installCodeSample}</CodeBlock>
            </div>
            <div>
              <h3>2. Compose a workspace</h3>
              <CodeBlock>{workspaceFiveCodeSample}</CodeBlock>
            </div>
          </div>
        </section>

        <section className="demo-section demo-comparison" aria-labelledby="comparison-title">
          <p className="demo-section-label">Why GlassKit</p>
          <h2 className="demo-section-title" id="comparison-title">
            When glass becomes a workspace system
          </h2>
          <p className="demo-section-desc">
            Local CSS is still the right answer for one decorative card. GlassKit starts to earn
            its keep when panels, overlays, focus states, and accessibility fallbacks repeat.
          </p>
          <div className="demo-comparison-grid">
            {comparisonItems.map((item) => (
              <div className="demo-comparison-row" key={item.need}>
                <strong>{item.need}</strong>
                <span>{item.localCss}</span>
                <span>{item.glasskit}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="demo-section demo-recipes" aria-labelledby="recipes-title">
          <p className="demo-section-label">Recipes</p>
          <h2 className="demo-section-title" id="recipes-title">
            Copyable paths, not exported shell abstractions
          </h2>
          <div className="demo-recipe-grid">
            <a className="demo-recipe-link" href="https://github.com/alderac/react-glasskit/blob/main/docs/recipes/workspace-in-five-minutes.md">
              <span>Workspace split</span>
              <strong>Focused and resizable panels</strong>
            </a>
            <a className="demo-recipe-link" href="https://github.com/alderac/react-glasskit/blob/main/docs/recipes/app-shell.md">
              <span>App shell</span>
              <strong>Sidebar, header, and primary workspace</strong>
            </a>
            <a className="demo-recipe-link" href="https://github.com/alderac/react-glasskit/blob/main/docs/recipes/canvas-hud.md">
              <span>Canvas HUD</span>
              <strong>Floating controls over media surfaces</strong>
            </a>
            <a className="demo-recipe-link demo-link-card" href="https://github.com/alderac/react-glasskit/blob/main/docs/recipes/next-link-card.md">
              <span>Link card</span>
              <strong>Polymorphic glass surfaces with Next.js Link</strong>
            </a>
          </div>
          <CodeBlock>{linkCardCodeSample}</CodeBlock>
        </section>

        <section className="demo-section demo-integrations" aria-labelledby="integrations-title">
          <p className="demo-section-label">Integrations</p>
          <h2 className="demo-section-title" id="integrations-title">
            Works with your stack
          </h2>
          <p className="demo-section-desc">
            GlassKit stays vanilla at the core. Existing UI systems keep their controls,
            while GlassKit supplies the glass material layer.
          </p>
          <div className="demo-integration-grid">
            {integrationItems.map((item) => (
              <a
                className="demo-recipe-link"
                href="https://github.com/alderac/react-glasskit/blob/main/docs/integrations/index.md"
                key={item.name}
              >
                <span>{item.name}</span>
                <strong>{item.description}</strong>
              </a>
            ))}
          </div>
        </section>

        {/* ── 1. GlassRegular — Navbar ─────────────────────── */}
        <section className="demo-section">
          <p className="demo-section-label">Component</p>
          <h2 className="demo-section-title">GlassRegular</h2>
          <p className="demo-section-desc">
            Medium-transparency surface for navigation layers — sidebars, toolbars,
            modals, and panel headers. Polymorphic via the <code>as</code> prop.
          </p>

          <div className="showcase-stage showcase-regular">
            <GlassRegular as="nav">
              <div className="demo-nav-inner">
                <div className="demo-nav-logo">⬡ Acme App</div>
                <ul className="demo-nav-links">
                  <li><a href="#!">Dashboard</a></li>
                  <li><a href="#!">Projects</a></li>
                  <li><a href="#!">Settings</a></li>
                </ul>
                <button className="demo-nav-btn">Sign In</button>
              </div>
            </GlassRegular>
          </div>

          <CodeBlock>{regularCodeSample}</CodeBlock>
        </section>

        {/* ── 2. GlassPanel — Focus / Inactive ─────────────── */}
        <section className="demo-section">
          <p className="demo-section-label">Component</p>
          <h2 className="demo-section-title">GlassPanel</h2>
          <p className="demo-section-desc">
            Workspace panel container with focus, inactive, and crystallize animation states.
            Click each panel to toggle focus — watch the macOS Tahoe-style fade.
          </p>

          <div className="showcase-stage showcase-panels">
            <div className="demo-panels-container">
              <GlassPanel
                focused={activePanels.isFocused('left')}
                inactive={activePanels.isInactive('left')}
                animate
                style={{ flex: 1 }}
                onClick={() => activePanels.activatePanel('left')}
              >
                <div className="demo-panel-content">
                  <h3>Editor</h3>
                  <p>Primary workspace panel. Click to focus.</p>
                  <div className="demo-skeleton">
                    <div className="demo-skeleton-line" />
                    <div className="demo-skeleton-line" />
                    <div className="demo-skeleton-line" />
                    <div className="demo-skeleton-line" />
                  </div>
                  <div className={`demo-panel-tag ${activePanels.activePanelId === 'left' ? 'focused' : 'inactive'}`}>
                    {activePanels.activePanelId === 'left' ? '● Focused' : '○ Inactive'}
                  </div>
                </div>
              </GlassPanel>

              <PanelSeparator orientation="vertical" />

              <GlassPanel
                focused={activePanels.isFocused('right')}
                inactive={activePanels.isInactive('right')}
                animate
                style={{ flex: 1 }}
                onClick={() => activePanels.activatePanel('right')}
              >
                <div className="demo-panel-content">
                  <h3>Inspector</h3>
                  <p>Secondary detail panel. Click to focus.</p>
                  <div className="demo-skeleton">
                    <div className="demo-skeleton-line" />
                    <div className="demo-skeleton-line" />
                    <div className="demo-skeleton-line" />
                    <div className="demo-skeleton-line" />
                  </div>
                  <div className={`demo-panel-tag ${activePanels.activePanelId === 'right' ? 'focused' : 'inactive'}`}>
                    {activePanels.activePanelId === 'right' ? '● Focused' : '○ Inactive'}
                  </div>
                </div>
              </GlassPanel>
            </div>
          </div>

          <CodeBlock>{panelCodeSample}</CodeBlock>
        </section>

        {/* ── 3. GlassClear — Floating Toolbar ─────────────── */}
        <section className="demo-section">
          <p className="demo-section-label">Component</p>
          <h2 className="demo-section-title">GlassClear</h2>
          <p className="demo-section-desc">
            High-transparency glass for media-rich overlays. Must sit over vibrant content.
            Use the <code>dimmed</code> prop to prevent color bleed.
          </p>

          <div className="showcase-stage showcase-vibrant">
            <div className="demo-clear-wrapper">
              <GlassClear dimmed>
                <div className="demo-clear-toolbar">
                  <button className="demo-tool-btn active" title="Move">⇱</button>
                  <button className="demo-tool-btn" title="Pen">✎</button>
                  <button className="demo-tool-btn" title="Shapes">◇</button>
                  <div className="demo-tool-divider" />
                  <button className="demo-tool-btn" title="Eraser">⌫</button>
                  <button className="demo-tool-btn" title="Color">◉</button>
                </div>
              </GlassClear>
            </div>
          </div>

          <CodeBlock>{clearCodeSample}</CodeBlock>
        </section>

        {/* ── 4. GlassScrim — Overlay Material ─────────────── */}
        <section className="demo-section demo-scrim">
          <p className="demo-section-label">Component</p>
          <h2 className="demo-section-title">GlassScrim</h2>
          <p className="demo-section-desc">
            Backdrop material for drawers, mobile navigation, and modal stacks. The scrim owns
            blur and dimming, while your app keeps focus, Escape handling, and scroll locks.
          </p>

          <div className="showcase-stage showcase-scrim">
            <div className="demo-scrim-stage">
              <GlassScrim strength="regular" radius="lg" className="demo-scrim-preview" />
              <GlassPanel as="nav" aria-label="Preview navigation" radius="lg" className="demo-scrim-panel">
                <a href="#!">Dashboard</a>
                <a href="#!">Projects</a>
                <a href="#!">Settings</a>
              </GlassPanel>
            </div>
          </div>

          <CodeBlock>{scrimCodeSample}</CodeBlock>
        </section>

        {/* ── 5. PanelSeparator ────────────────────────────── */}
        <section className="demo-section">
          <p className="demo-section-label">Component</p>
          <h2 className="demo-section-title">PanelSeparator</h2>
          <p className="demo-section-desc">
            Passive spatial dividers for split-panel layouts. Add <code>resizable</code>
            when the separator is wired to resize behavior.
          </p>

          <div className="showcase-stage showcase-separator">
            <div className="demo-separator-stack">
              <div className="demo-separator-example">
                <p className="demo-example-label">Passive divider</p>
                <div className="demo-separator-stage">
                  <GlassRegular style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="demo-separator-pane">Panel A</span>
                  </GlassRegular>
                  <PanelSeparator orientation="vertical" />
                  <GlassRegular style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="demo-separator-pane">Panel B</span>
                  </GlassRegular>
                  <PanelSeparator orientation="vertical" />
                  <GlassRegular style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="demo-separator-pane">Panel C</span>
                  </GlassRegular>
                </div>
              </div>

              <div className="demo-separator-example">
                <p className="demo-example-label">Resizable handle</p>
                <div
                  className="demo-separator-stage demo-resize-stage"
                  ref={resizablePanels.containerRef}
                >
                  <GlassRegular
                    id="timeline-panel"
                    style={{
                      ...resizablePanels.primaryPanelStyle,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span className="demo-separator-pane">
                      Timeline · {resizablePanels.primarySize}%
                    </span>
                  </GlassRegular>
                  <PanelSeparator
                    orientation="vertical"
                    resizable
                    aria-label="Resize timeline and inspector panes"
                    {...resizablePanels.separatorProps}
                  />
                  <GlassRegular
                    style={{
                      ...resizablePanels.secondaryPanelStyle,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span className="demo-separator-pane">Inspector</span>
                  </GlassRegular>
                </div>
              </div>
            </div>
          </div>

          <CodeBlock>{separatorCodeSample}</CodeBlock>
        </section>

        <section className="demo-section demo-trust" aria-labelledby="trust-title">
          <p className="demo-section-label">Trust</p>
          <h2 className="demo-section-title" id="trust-title">
            What the package verifies
          </h2>
          <div className="demo-trust-grid">
            <div>
              <strong>Package path</strong>
              <span>Build, declaration output, CSS exports, and packed Vite install smoke.</span>
            </div>
            <div>
              <strong>Interaction path</strong>
              <span>Component tests, active panel state, pointer resize, and keyboard resize.</span>
            </div>
            <div>
              <strong>Accessibility posture</strong>
              <span>Reduced motion, reduced transparency, increased contrast, and APG-oriented separator props.</span>
            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────── */}
        <footer className="demo-footer">
          <p>
            <a href="https://github.com/alderac/react-glasskit" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            {' · '}
            MIT License
            {' · '}
            Built by Adam C. Alderson
          </p>
        </footer>
      </div>
    </>
  );
}
