import { BARE_KEYWORDS, BREAKPOINTS, CONTAINER_QUERIES, POSSIBLE_PREFIXES, STATE_VARIANTS, THEME_VARIANTS } from "../../elements/css/tailwindruleregistry"
import { TailwindRuleRegistry, ruleLookupCache } from "../../elements/css/tailwindruleregistry";
import { CompileTimeCssGenerator } from "./cssCompiler.services";
import { GeneratedCssRule, ParsedTailwindClass } from "../types/css.services.types";



// ─── JIT CSS Compiler ─────────────────────────────────────────────────────────

export class JitCssCompiler {
  private generatedRules = new Map<string, GeneratedCssRule>();

  /**
   * Parse a Tailwind class name into its components
   * Examples:
   *   "text-blue-500" → { queries: [], states: [], theme: [], prefix: "text-", value: "blue-500" }
   *   "sm:hover:text-center" → { queries: ["sm"], states: ["hover"], prefix: "text-", value: "center" }
   *   "dark:bg-gray-900" → { theme: ["dark"], prefix: "bg-", value: "gray-900" }
   */
  static parseClassName(className: string): ParsedTailwindClass | null {
    const parts = className.split(":");
    const utility = parts[parts.length - 1]

    const queries: string[] = [];
    const states: string[] = [];
    const theme: string[] = [];

    // Classify variants
    for (let i = 0; i < parts.length - 1; i++) {
      const variant = parts[i];
      if (BREAKPOINTS.includes(variant)) {
        queries.push(variant);
      } else if (CONTAINER_QUERIES.includes(variant)) {
        queries.push(variant);
      } else if (STATE_VARIANTS.includes(variant)) {
        states.push(variant);
      } else if (THEME_VARIANTS.includes(variant)) {
        theme.push(variant);
      }
    }

    // Parse the utility itself
    let prefix = "";
    let value = utility;

    // Try to find a matching prefix (check longest first)
    for (const possiblePrefix of POSSIBLE_PREFIXES) {
      if (utility.startsWith(possiblePrefix)) {
        prefix = possiblePrefix;
        value = utility.slice(possiblePrefix.length);
        break;
      }
    }

    // Special case: bare keywords
    if (prefix === "" && !value) {
      value = utility;
    }

    return {
      original: className,
      queries,
      states,
      theme,
      prefix,
      value
    };
  }

  /**
   * Validate if a parsed class is valid Tailwind
   */
  static validateClass(parsed: ParsedTailwindClass): boolean {
    const { prefix, value } = parsed;

    // Check if it's a bare keyword
    if (prefix === "" && BARE_KEYWORDS.includes(value)) {
      return true;
    }

    // Check against the rule registry
    const rules = TailwindRuleRegistry.findRulesForPrefix(prefix, value);
    return rules.length > 0;
  }

  /**
   * Escape CSS selector special characters
   */
  private static escapeCssSelector(cls: string): string {
    return cls
      .replace(/[:[]/g, "\\$&")
      .replace(/\]/g, "\\]")
      .replace(/@/g, "\\@");
  }

  /**
   * Generate CSS for a single class name
   */
  generateCss(className: string): string | null {
    // Check cache first
    if (this.generatedRules.has(className)) {
      return this.formatRule(this.generatedRules.get(className)!);
    }

    // Parse the class
    const parsed = JitCssCompiler.parseClassName(className);
    if (!parsed) return null;

    // Validate
    if (!JitCssCompiler.validateClass(parsed)) {
      return null;
    }

    // Get the base CSS declaration
    const declaration = TailwindRuleRegistry.resolveCssDeclaration(
      parsed.prefix,
      parsed.value
    );

    if (!declaration) return null;

    // Get variant wrappers
    const wrappers = TailwindRuleRegistry.resolveVariantWrappers(
      parsed.queries,
      parsed.states,
      parsed.theme
    );

    // Build the selector
    const escapedClass = JitCssCompiler.escapeCssSelector(className);
    let selector = `.${escapedClass}`;
    
    if (wrappers.pseudoSelector) {
      selector += wrappers.pseudoSelector;
    }

    // Build the wrapper
    let wrapper: string | null = null;
    
    if (wrappers.mediaQuery) {
      wrapper = wrappers.mediaQuery;
    } else if (wrappers.containerQuery) {
      wrapper = wrappers.containerQuery;
    } else if (wrappers.themeWrapper) {
      wrapper = wrappers.themeWrapper;
    }

    const rule: GeneratedCssRule = {
      selector,
      declaration,
      wrapper
    };

    // Cache the rule
    this.generatedRules.set(className, rule);

    return this.formatRule(rule);
  }

  /**
   * Format a generated rule into CSS string
   */
  private formatRule(rule: GeneratedCssRule): string {
    const innerRule = `${rule.selector} { ${rule.declaration} }`;
    
    if (rule.wrapper) {
      return `${rule.wrapper} {\n  ${innerRule}\n}`;
    }
    
    return innerRule;
  }

  /**
   * Generate CSS for multiple class names
   */
  generateCssForClasses(classNames: string[]): string {
    const cssRules: string[] = [];
    
    for (const className of classNames) {
      const css = this.generateCss(className);
      if (css) {
        cssRules.push(css);
      }
    }

    return cssRules.join("\n\n");
  }

  /**
   * Generate complete CSS file for specific classes
   * Includes CSS variables and the generated rules
   */
  generateCssFile(classNames: string[], options: {
    includeVariables?: boolean;
    minify?: boolean;
  } = {}): string {
    const { includeVariables = true, minify = false } = options;

    const rules: string[] = [];

    // Add variables if requested
    if (includeVariables) {
      const variables = CompileTimeCssGenerator.getStaticVariables();
      rules.push(variables);
    }

    // Generate CSS for each class
    const css = this.generateCssForClasses(classNames);
    if (css) {
      rules.push(css);
    }

    if (minify) {
      return rules.join(" ").replace(/\s+/g, " ");
    }

    const header = [
      "/* ════════════════════════════════════════════════════════════════════════════════",
      " *  JIT TAILWIND CSS - GENERATED ON DEMAND",
      ` *  Classes: ${classNames.length}`,
      " *  Generated: " + new Date().toISOString(),
      " *  ════════════════════════════════════════════════════════════════════════════════ */",
      "",
    ].join("\n");

    return header + rules.join("\n\n");
  }

  /**
   * Extract all class names from HTML content
   */
  static extractClassNames(html: string): string[] {
    const classRegex = /class(?:Name)?=["']([^"']+)["']/g;
    const classes = new Set<string>();

    let match;
    while ((match = classRegex.exec(html)) !== null) {ruleLookupCache
      const classList = match[1].split(/\s+/).filter(Boolean);
      classList.forEach(cls => classes.add(cls));
    }

    return Array.from(classes);
  }

  /**
   * Generate CSS for all classes found in HTML
   */
  generateCssForHtml(html: string, options?: {
    includeVariables?: boolean;
    minify?: boolean;
  }): string {
    const classNames = JitCssCompiler.extractClassNames(html);
    return this.generateCssFile(classNames, options);
  }
}

