/**
 * Lightweight class name joiner. Filters out falsy values and joins with spaces.
 * Used throughout components to conditionally compose Tailwind class strings
 * without pulling in clsx/tailwind-merge.
 */
export function cn(
  ...classes: (string | false | null | undefined)[]
): string {
  return classes.filter(Boolean).join(' ');
}
