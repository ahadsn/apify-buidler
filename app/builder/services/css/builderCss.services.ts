import { TailwindRuleRegistry } from "../../elements/css/tailwindruleregistry";
import { LRUCache } from "@/app/core/cache/lruCache.core";
import { CompileTimeCssGenerator } from "./cssCompiler.services";
import { ClassGenerationOptions, LightnessMap, TailwindClassConfig } from "../types/css.services.types";
import { COLOR_HUES, lightness } from "../../elements/css/tailwindruleregistry";



// ─── Cache ────────────────────────────────────────────────────────────────────

/** Caches the result of parseClassString so parsing the same string twice is instant. */
export const parsedClassCache = new LRUCache<string, Record<string, TailwindClassConfig>>(2000);

/** Separate caches for regular and isolated CSS to prevent cache conflicts */
export const virtualCssCache = new LRUCache<string, string>(2000);
export const virtualCssIsolatedCache = new LRUCache<string, string>(2000);

/** Separate caches for regular and isolated class names */
export const classNameCache = new LRUCache<string, string>(500);
export const isolatedClassNameCache = new LRUCache<string, string>(500);

/** Separate caches for complete file generation */
export const cssFileCache = new LRUCache<string, string>(300);
export const cssFileIsolatedCache = new LRUCache<string, string>(300);

// ─── Variant catalogues (read-only, used only by the parser) ─────────────────
// These lists tell the parser HOW to classify each variant token it peels off.
// They are not lookup data — they are classification rules.

const BREAKPOINTS = ["sm", "md", "lg", "xl", "2xl"];

const THEME_VARIANTS = ["dark", "light", "contrast-more", "contrast-less", "print"];

const STATE_VARIANTS = [
  "hover", "focus", "focus-within", "focus-visible", "active", "visited",
  "target", "first", "last", "only", "odd", "even",
  "first-of-type", "last-of-type", "only-of-type",
  "empty", "disabled", "enabled", "checked", "indeterminate",
  "default", "required", "valid", "invalid", "in-range", "out-of-range",
  "placeholder-shown", "autofill", "read-only",
];

const GROUP_VARIANTS = [
  "group-hover", "group-focus", "group-focus-within", "group-active",
  "group-visited", "group-target", "group-first", "group-last",
  "group-only", "group-odd", "group-even", "group-disabled",
  "group-checked", "group-focus-visible", "group-valid", "group-invalid",
];

const PEER_VARIANTS = [
  "peer-hover", "peer-focus", "peer-focus-within", "peer-active",
  "peer-visited", "peer-target", "peer-first", "peer-last",
  "peer-only", "peer-odd", "peer-even", "peer-disabled",
  "peer-checked", "peer-focus-visible", "peer-valid", "peer-invalid",
  "peer-placeholder-shown", "peer-autofill", "peer-required",
];

const OTHER_VARIANTS = [
  "motion-safe", "motion-reduce", "portrait", "landscape", "ltr", "rtl",
  "open", "has-[]", "group-has-[]", "peer-has-[]",
  "before", "after", "first-letter", "first-line",
  "marker", "selection", "file", "backdrop",
  "placeholder", "supports-[]", "aria-[]", "data-[]",
];

// ─── Conflict groups ──────────────────────────────────────────────────────────
// Classes inside the same group are mutually exclusive at the same variant level.

const CONFLICT_GROUPS: RegExp[][] = [
  // display
  [
    /^display-default/,
    /^flex$/,
    /^grid$/,
    /^block$/,
    /^inline$/,
    /^inline-block$/,
    /^inline-flex$/,
    /^inline-grid$/,
    /^hidden$/,
  ],

  // position
  [
    /^static$/,
    /^position-none$/,
    /^fixed$/,
    /^absolute$/,
    /^relative$/,
    /^sticky$/,
  ],

  // background (color + gradient)
  [
    /^bg-/,
    /^bg-gradient-/,
    /^from-/, /^via-/, /^to-/],
];


// ─── Internal helpers ─────────────────────────────────────────────────────────

/** Splits a full class token into its variant prefix and the bare utility.
 *  e.g. "hover:md:text-sm" → { variants: "hover:md:", bare: "text-sm" } */
function splitVariants(cls: string): { variants: string; bare: string } {
  const m = cls.match(/^([a-z0-9-]+:)*/);
  const variants = m ? m[0] : "";
  return { variants, bare: cls.slice(variants.length) };
}

/** Returns the conflict group that contains `bare`, or null. */
function findConflictGroup(bare: string): RegExp[] | null {
  for (const group of CONFLICT_GROUPS) {
    if (group.some(rx => rx.test(bare))) {
      return group;
    }
  }
  return null;
}


/**
 * Single-pass filter that removes two kinds of stale classes from the existing
 * array before a new class is appended:
 *   1. Old values for the same utility prefix  (e.g. "text-sm" when "text-lg" is coming)
 *   2. Conflict-group collisions               (e.g. "block" when "flex" is coming)
 *
 * Both checks only fire when the variant prefix matches exactly, so
 * "hover:flex" never clobbers a bare "block".
 */
function removeStaleAndConflicting(
  newClass: string,
  existing: string[],
  rules: ReturnType<typeof TailwindRuleRegistry.findRulesForPrefix>,
): string[] {
  const { variants: newVariants, bare: newBare } = splitVariants(newClass);
  const conflictGroup = findConflictGroup(newBare);

  return existing.filter((cls) => {
    const { variants, bare } = splitVariants(cls);

    // Different variant level → can never conflict
    if (variants !== newVariants) return true;

    // Check 1: stale prefix match
    for (const rule of rules) {
      if (bare.startsWith(rule.prefix)) {
        const existingValue = bare.slice(rule.prefix.length);
        if (rule.pattern.test(existingValue)) return false;
      }
    }

    // Check 2: conflict-group collision
    if (
      conflictGroup &&
      bare !== newBare &&
      conflictGroup.some(rx => rx.test(bare))
    ) {
      return false;
    }


    return true;
  });
}

/** Escapes characters that are special inside a CSS selector. */
function escapeCssSelector(cls: string): string {
  return cls.replace(/[:[]/g, "\\$&").replace(/\]/g, "\\]");
}

// ─── Service ──────────────────────────────────────────────────────────────────

export class BuilderCssService {

  // ── Class string assembly ───────────────────────────────────────────────────

  /**
   * Builds the full class string from a config object.
   *   { queries: ["md"], states: ["hover"], theme: ["dark"], prefix: "text-", value: "red-500" }
   *   → "md:hover:dark:text-red-500"
   * 
   * @param config - The Tailwind class configuration
   * @param options - Generation options (isolated mode, etc.)
   */
  static buildClassString(
    config: TailwindClassConfig,
    options: ClassGenerationOptions = {}
  ): string {
    const variants = [
      ...(config.queries ?? []),
      ...(config.states ?? []),
      ...(config.theme ?? []),
    ]
      .filter(Boolean)
      .map((v) => `${v}:`)
      .join("");

    const baseClass = `${variants}${config.prefix}${config.value}`;

    // Apply isolation prefix if requested
    return options.isolated ? `v-${baseClass}` : baseClass;
  }

  // ── Class string transformation ─────────────────────────────────────────────

  /**
   * Converts a class string between regular and isolated formats.
   * Handles both single classes and space-separated lists.
   * Results are cached for performance.
   * 
   * @param className - The class string to transform
   * @param options - Generation options
   */
  static transformClassName(
    className: string,
    options: ClassGenerationOptions = {}
  ): string {
    if (!className || className.trim() === '') return className;

    // Use appropriate cache based on mode
    const cache = options.isolated ? isolatedClassNameCache : classNameCache;
    const cacheKey = `${className}:${options.isolated ? 'isolated' : 'regular'}`;

    const cached = cache.get(cacheKey);
    if (cached) return cached;

    const classes = className.split(/\s+/).filter(Boolean);
    const transformed = classes.map(cls => {
      if (options.isolated) {
        // Convert to isolated: add v- prefix if not already present
        return cls.startsWith('v-') ? cls : `v-${cls}`;
      } else {
        // Convert to regular: remove v- prefix if present
        return cls.startsWith('v-') ? cls.slice(2) : cls;
      }
    });

    const result = transformed.join(' ');
    cache.put(cacheKey, result);

    return result;
  }

  // ── Class string application ────────────────────────────────────────────────

  /**
   * Takes an existing space-separated class string and a new config,
   * removes anything the new class supersedes (stale values + conflicts),
   * then appends the new class.
   *
   * Input and output are both plain class strings — no mutation, no side effects.
   * 
   * @param config - The new class configuration to apply
   * @param currentClassString - The existing class string
   * @param options - Generation options (isolated mode, etc.)
   */
  static applyClassToString(
    config: TailwindClassConfig,
    currentClassString: string,
    options: ClassGenerationOptions = {}
  ): string {
    const newClass = this.buildClassString(config, options);
    const rules = TailwindRuleRegistry.findRulesForPrefix(config.prefix, config.value);


    if (rules.length === 0 && (config.value == null || config.value.trim() === "")) {
      return currentClassString;
    }

    const existing = currentClassString.split(/\s+/).filter((c) => c.length > 0);
    const filtered = removeStaleAndConflicting(newClass, existing, rules);

    filtered.push(newClass);
    return filtered.join(" ");
  }

  // ── Parsing ─────────────────────────────────────────────────────────────────

  /**
   * Parses a space-separated Tailwind class string into a record keyed by
   * lookup key. Each entry is a full TailwindClassConfig.
   *
   * Results are LRU-cached so repeated parses of the same string are free.
   * Automatically handles both regular and isolated (v-prefixed) classes.
   * 
   * @param classString - The class string to parse
   */
  static parseClassString(classString: string): Record<string, TailwindClassConfig> {
    const cached = parsedClassCache.get(classString);
    if (cached) return cached;

    const classes = classString.split(/\s+/).filter(Boolean);
    const result: Record<string, TailwindClassConfig> = {};

    for (const token of classes) {
      if (!token) continue;

      // Remove v- prefix if present for parsing
      const actualToken = token.startsWith('v-') ? token.slice(2) : token;

      let queries: string[] = [];
      let states: string[] = [];
      let theme: string[] = [];
      let rest = actualToken;

      // ── Peel variant prefixes one at a time ──────────────────────────────
      while (true) {
        let matched = false;

        // Arbitrary bracket variants: has-[...]:, aria-[...]:, data-[...]: …
        const arbitraryVariant = rest.match(/^(has|group-has|peer-has|supports|aria|data)-\[([^\]]+)\]:/);
        if (arbitraryVariant) {
          states.push(arbitraryVariant[0].slice(0, -1));
          rest = rest.slice(arbitraryVariant[0].length);
          matched = true;
          continue;
        }

        // Container queries: @sm:, @md:, …
        const containerMatch = rest.match(/^(@(?:sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl)):/);
        if (containerMatch) {
          queries.push(containerMatch[1]);
          rest = rest.slice(containerMatch[0].length);
          matched = true;
          continue;
        }

        // Regular named variant
        const variantMatch = rest.match(/^([a-z0-9-]+):/);
        if (variantMatch) {
          const v = variantMatch[1];

          if (BREAKPOINTS.includes(v)) queries.push(v);
          else if (THEME_VARIANTS.includes(v)) theme.push(v);
          else if (STATE_VARIANTS.includes(v) || GROUP_VARIANTS.includes(v) ||
            PEER_VARIANTS.includes(v) || OTHER_VARIANTS.includes(v)) {
            states.push(v);
          } else {
            states.push(v); // unknown → treat as state
          }

          rest = rest.slice(variantMatch[0].length);
          matched = true;
          continue;
        }

        if (!matched) break;
      }

      // ── Classify the bare utility ────────────────────────────────────────

      // Arbitrary value: text-[#fff], w-[calc(100%-2rem)], …
      const arbitraryValue = rest.match(/^(.+?)-\[(.+)\]$/);
      if (arbitraryValue) {
        const [, rawPrefix, value] = arbitraryValue;
        if (value === "..." || value.includes("url(...)")) continue;

        const prefix = rawPrefix + "-";
        const key = this.buildLookupKey(prefix, queries, states, theme);
        result[key] = { queries, states, theme, prefix, value, key };
        continue;
      }

      // No hyphen at all: bare keywords like "block", "flex", "hidden"
      if (!rest.includes("-")) {
        result[rest] = { queries, states, theme, prefix: "", value: rest, key: rest };
        continue;
      }

      // Negative utility: -mt-4, -left-2, …
      if (rest.startsWith("-")) {
        const withoutSign = rest.slice(1);
        const lastHyphen = withoutSign.lastIndexOf("-");
        const prefix = lastHyphen === -1 ? "-" : "-" + withoutSign.slice(0, lastHyphen + 1);
        const value = lastHyphen === -1 ? withoutSign : withoutSign.slice(lastHyphen + 1);
        const key = this.buildLookupKey(prefix, queries, states, theme);
        result[key] = { queries, states, theme, prefix, value, key };
        continue;
      }

      // Fraction utility: w-1/2, h-2/3, …
      if (rest.includes("/")) {
        const lastHyphen = rest.lastIndexOf("-");
        const prefix = rest.slice(0, lastHyphen + 1);
        const value = rest.slice(lastHyphen + 1);
        const key = this.buildLookupKey(prefix, queries, states, theme);
        result[key] = { queries, states, theme, prefix, value, key };
        continue;
      }

      // Multi-part prefix: bg-gradient-to-r, rounded-tl-lg, etc.
      // Look for longest matching prefix from the registry
      let longestPrefix = "";
      let longestValue = "";

      for (let i = rest.length - 1; i >= 0; i--) {
        if (rest[i] === "-") {
          const testPrefix = rest.slice(0, i + 1);
          const testValue = rest.slice(i + 1);

          const rules = TailwindRuleRegistry.findRulesForPrefix(testPrefix, testValue);
          if (rules.length > 0) {
            longestPrefix = testPrefix;
            longestValue = testValue;
            break;
          }
        }
      }

      if (longestPrefix) {
        const key = this.buildLookupKey(longestPrefix, queries, states, theme);
        result[key] = { queries, states, theme, prefix: longestPrefix, value: longestValue, key };
        continue;
      }

      // Generic case: split on the LAST hyphen
      const lastHyphen = rest.lastIndexOf("-");
      const prefix = rest.slice(0, lastHyphen + 1);
      const value = rest.slice(lastHyphen + 1);
      const key = this.buildLookupKey(prefix, queries, states, theme);
      result[key] = { queries, states, theme, prefix, value, key };
    }

    parsedClassCache.put(classString, result);
    return result;
  }
  /**
   * Builds a deterministic lookup key from the variant + prefix parts of a class.
   * Value is deliberately excluded so that two classes that differ only in value
   * map to the same key — which is what lets applyClassToString replace
   * "text-sm" with "text-lg" in one step.
   */

  static buildLookupKey(
    prefix = "",
    queries: unknown[] = [],
    states: unknown[] = [],
    theme: unknown[] = [],
  ): string {
    return [...queries, ...theme, ...states, prefix]
      .filter((v): v is string => typeof v === "string" && v.length > 0)
      .sort()
      .join("|");
  }



  /**
   * Converts className to isolated className (v-prefixed).
   * Alias for transformClassName with isolated: true.
   * 
   * @param className - The class string to convert
   */
  static getIsolatedClassName(className: string): string {
    return this.transformClassName(className, { isolated: true });
  }

  /**
   * Converts isolated className back to regular className.
   * 
   * @param className - The isolated class string to convert
   */
  static getRegularClassName(className: string): string {
    return this.transformClassName(className, { isolated: false });
  }

  /**
   * Get color code
   */
  static getColorCode(name: string, shade: string): string | null {
 
    const h = COLOR_HUES[name]
    const l = lightness[shade]
    if (h === undefined || l === undefined) return null
    const s = 70

    const a = (s / 100) * Math.min(l / 100, 1 - l / 100)

    const f = (n: number): string => {
      const k = (n + h / 30) % 12
      const c =
        l / 100 -
        a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)))
      return Math.round(255 * c).toString(16).padStart(2, '0')
    }

    return `#${f(0)}${f(8)}${f(4)}`
  }


  static compileCssFile(isolated: boolean, minify: boolean, includeContainerQueries: boolean, includeResponsive: boolean, includeStates: boolean, includeTheme: boolean,) {
    // Generate the CSS
    const css = CompileTimeCssGenerator.generateCompleteCssFile({
      includeResponsive: includeResponsive,
      includeStates: includeStates,
      includeTheme: includeTheme,
      includeContainerQueries: includeContainerQueries,
      isolated: isolated,
      minify: minify,
    });

    return css;

  }



}
