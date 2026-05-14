/**
 * CSS Modules ambient type declaration.
 * Without this, TypeScript cannot resolve `import styles from '*.module.css'`
 * and will emit "Cannot find module" errors.
 */
declare module '*.module.css' {
  const classes: Readonly<Record<string, string>>;
  export default classes;
}
