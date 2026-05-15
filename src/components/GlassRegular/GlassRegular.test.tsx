import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { GlassRegular } from './GlassRegular';

describe('GlassRegular', () => {
  it('renders as a polymorphic element', () => {
    render(
      <GlassRegular as="nav" aria-label="Primary navigation">
        Workspace
      </GlassRegular>
    );

    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeInTheDocument();
  });

  it('merges consumer class names', () => {
    render(<GlassRegular className="custom-shell">Content</GlassRegular>);

    expect(screen.getByText('Content')).toHaveClass('custom-shell');
  });
});
