import { useState } from 'react';
import { GlassRegular, GlassClear, GlassPanel, PanelSeparator } from 'react-glasskit';

export default function App() {
  const [activePanel, setActivePanel] = useState<'left' | 'right'>('left');

  return (
    <>
      {/* Animated mesh gradient background */}
      <div className="demo-bg" />

      <div className="demo-container">
        {/* ── Hero ─────────────────────────────────────────── */}
        <header className="demo-hero">
          <div className="demo-badge">
            <span>v0.1.0</span> — Liquid Glass Architecture
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

          <div className="showcase-stage">
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

          <div className="demo-code">
            <span className="cmt">{'// Renders as <nav> with full type safety'}</span>{'\n'}
            <span className="tag">{'<GlassRegular'}</span> <span className="attr">as</span>=<span className="str">"nav"</span><span className="tag">{'>'}</span>{'\n'}
            {'  '}<span className="tag">{'<div'}</span> <span className="attr">className</span>=<span className="str">"nav-inner"</span><span className="tag">{'>'}</span>{'\n'}
            {'    '}<span className="tag">{'<Logo />'}</span>{'\n'}
            {'    '}<span className="tag">{'<NavLinks />'}</span>{'\n'}
            {'  '}<span className="tag">{'</div>'}</span>{'\n'}
            <span className="tag">{'</GlassRegular>'}</span>
          </div>
        </section>

        {/* ── 2. GlassPanel — Focus / Inactive ─────────────── */}
        <section className="demo-section">
          <p className="demo-section-label">Component</p>
          <h2 className="demo-section-title">GlassPanel</h2>
          <p className="demo-section-desc">
            Workspace panel container with focus, inactive, and crystallize animation states.
            Click each panel to toggle focus — watch the macOS Tahoe-style fade.
          </p>

          <div className="showcase-stage">
            <div className="demo-panels-container">
              <GlassPanel
                focused={activePanel === 'left'}
                inactive={activePanel !== 'left'}
                animate
                style={{ flex: 1 }}
                onClick={() => setActivePanel('left')}
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
                  <div className={`demo-panel-tag ${activePanel === 'left' ? 'focused' : 'inactive'}`}>
                    {activePanel === 'left' ? '● Focused' : '○ Inactive'}
                  </div>
                </div>
              </GlassPanel>

              <PanelSeparator orientation="vertical" />

              <GlassPanel
                focused={activePanel === 'right'}
                inactive={activePanel !== 'right'}
                animate
                style={{ flex: 1 }}
                onClick={() => setActivePanel('right')}
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
                  <div className={`demo-panel-tag ${activePanel === 'right' ? 'focused' : 'inactive'}`}>
                    {activePanel === 'right' ? '● Focused' : '○ Inactive'}
                  </div>
                </div>
              </GlassPanel>
            </div>
          </div>

          <div className="demo-code">
            <span className="tag">{'<GlassPanel'}</span> <span className="attr">focused</span> <span className="attr">animate</span><span className="tag">{'>'}</span>{'\n'}
            {'  Active panel content'}{'\n'}
            <span className="tag">{'</GlassPanel>'}</span>{'\n'}
            <span className="tag">{'<PanelSeparator'}</span> <span className="attr">orientation</span>=<span className="str">"vertical"</span> <span className="tag">{'/>'}</span>{'\n'}
            <span className="tag">{'<GlassPanel'}</span> <span className="attr">inactive</span><span className="tag">{'>'}</span>{'\n'}
            {'  Inactive panel content'}{'\n'}
            <span className="tag">{'</GlassPanel>'}</span>
          </div>
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

          <div className="demo-code">
            <span className="cmt">{'// dimmed adds a darkening layer for text legibility'}</span>{'\n'}
            <span className="tag">{'<GlassClear'}</span> <span className="attr">dimmed</span><span className="tag">{'>'}</span>{'\n'}
            {'  '}<span className="tag">{'<Toolbar />'}</span>{'\n'}
            <span className="tag">{'</GlassClear>'}</span>
          </div>
        </section>

        {/* ── 4. PanelSeparator ────────────────────────────── */}
        <section className="demo-section">
          <p className="demo-section-label">Component</p>
          <h2 className="demo-section-title">PanelSeparator</h2>
          <p className="demo-section-desc">
            Spatial dividers for split-panel layouts. Nearly invisible at rest —
            hover to reveal. Expanded touch targets on mobile via CSS.
          </p>

          <div className="showcase-stage">
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

          <div className="demo-code">
            <span className="tag">{'<PanelSeparator'}</span> <span className="attr">orientation</span>=<span className="str">"vertical"</span> <span className="tag">{'/>'}</span>{'\n'}
            <span className="tag">{'<PanelSeparator'}</span> <span className="attr">orientation</span>=<span className="str">"horizontal"</span> <span className="tag">{'/>'}</span>
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
