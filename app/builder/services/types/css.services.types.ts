// ─── Types ────────────────────────────────────────────────────────────────────

export interface TailwindClassConfig {
  /** Responsive / container-query breakpoints  (e.g. ["md"]) */
  queries: string[];
  /** Pseudo-class / pseudo-element states      (e.g. ["hover"]) */
  states: string[];
  /** Theme variants                            (e.g. ["dark"]) */
  theme: string[];
  /** The utility prefix including trailing "-" (e.g. "text-") */
  prefix: string;
  /** The value after the prefix                (e.g. "red-500") */
  value: string;
  /** Unique lookup key built from all of the above (excludes value) */
  key: string;
}

/**
 * Options for controlling class generation behavior
 */
export interface ClassGenerationOptions {
  /** If true, prefix all classes with 'v-' for isolation */
  isolated?: boolean;
}
export type LightnessMap = Record<string, number>
export interface GeneratedCssRule {
  /** The selector (e.g., ".sm\\:hover\\:text-blue-500:hover") */
  selector: string;
  /** The CSS declaration (e.g., "color: var(--tw-blue-500);") */
  declaration: string;
  /** Any wrapper (media query, container query, etc.) */
  wrapper: string | null;
}
export interface ParsedTailwindClass {
  /** Original full class name (e.g., "sm:hover:text-blue-500") */
  original: string;
  /** Responsive breakpoints (e.g., ["sm", "md"]) */
  queries: string[];
  /** State variants (e.g., ["hover", "focus"]) */
  states: string[];
  /** Theme variants (e.g., ["dark"]) */
  theme: string[];
  /** The utility prefix (e.g., "text-", "bg-", "") */
  prefix: string;
  /** The value after the prefix (e.g., "blue-500", "center") */
  value: string;
}
