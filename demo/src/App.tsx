import { Fragment, type ReactNode } from 'react';
import {
  GlassRegular,
  GlassClear,
  GlassPanel,
  PanelSeparator,
  useActivePanel,
  useResizablePanels,
} from 'react-glasskit';

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
  const activePanels = useActivePanel<'left' | 'right'>({
    initialPanelId: 'left',
  });
  const resizablePanels = useResizablePanels({
    primaryPanelId: 'timeline-panel',
    initialSize: 58,
    minSize: 32,
    maxSize: 72,
  });

  return (
    <>
      {/* Animated mesh gradient background */}
      <div className="demo-bg" />

      <div className="demo-container">
        {/* ── Hero ─────────────────────────────────────────── */}
        <header className="demo-hero">
          <div className="demo-badge">
            <span>v0.1.11</span> — Liquid Glass Architecture
          </div>
          <h1>React GlassKit</h1>
          <p>
            Translucent frosted glass components for React.
            Project-agnostic. Accessibility-first. Dark mode built in.
          </p>
        </header>

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

        {/* ── 4. PanelSeparator ────────────────────────────── */}
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
