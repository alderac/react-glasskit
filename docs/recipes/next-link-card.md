# Next Link Card

Use the polymorphic `as` prop when the whole glass card should be a link.

```tsx
import Link from 'next/link';
import { GlassRegular } from 'react-glasskit';

export function ProjectCard() {
  return (
    <GlassRegular
      as={Link}
      href="/projects/launch-plan"
      radius="lg"
      className="block p-5"
      aria-label="Open Launch Plan project"
    >
      <span className="text-sm font-medium">Project</span>
      <h2>Launch Plan</h2>
      <p>Review milestones, owners, and the next decision point.</p>
    </GlassRegular>
  );
}
```

Do not put nested interactive content inside a link card. If the surface needs
buttons, menus, checkboxes, or multiple actions, render a non-interactive glass
container and place those controls inside it. Use a link for navigation and a
button for in-place actions.
