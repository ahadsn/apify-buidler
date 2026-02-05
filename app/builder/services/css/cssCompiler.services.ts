
import { colors, ROOT_POPERTIES, scales, fractions, spacingValues, special, keywords, tailwindPickerOptions, zIndexes, BREAKPOINTS, STATE_VARIANTS, THEME_VARIANTS, CONTAINER_BREAKPOINTS, BorderRadiusValues, OpacityValues, ShadowValues, GridColValues, displays, positions, justifyMap } from "../../elements/css/tailwindruleregistry";
import { BuilderCssService } from "./builderCss.services";

// ─── Types ────────────────────────────────────────────────────────────────────


export interface CompileTimeCssOptions {
  /** Include responsive variants (sm:, md:, lg:, xl:, 2xl:) */
  includeResponsive?: boolean;
  /** Include state variants (hover:, focus:, active:, etc.) */
  includeStates?: boolean;
  /** Include theme variants (dark:) */
  includeTheme?: boolean;
  /** Include container query variants (@sm:, @md:, etc.) */
  includeContainerQueries?: boolean;
  /** Generate isolated (v-prefixed) versions */
  isolated?: boolean;
  /** Minify output (remove comments and extra whitespace) */
  minify?: boolean;
}

/** Generate all negative spacing values */
function generateNegativeSpacingValues(): string[] {
  return spacingValues
    .filter(v => v !== "0")
    .map(v => `-${v}`);
}

/** Generate all color tokens */
function generateColorTokens(): string[] {
  const tokens: string[] = [...special];
  for (const color of colors) {
    for (const scale of scales) {
      tokens.push(`${color}-${scale}`);
    }
  }
  return tokens;
}

/** Generate all size values (width/height) */
function generateSizeValues(): string[] {
  return [...keywords, ...spacingValues, ...fractions];
}

// ─── Utility Class Generators ─────────────────────────────────────────────────

interface UtilityClass {
  className: string;
  css: string;
}

/** Generate all display utilities */
function generateDisplayUtilities(): UtilityClass[] {
  return displays.map(d => ({ className: d.name, css: d.css }));
}
/** Generate all position utilities */
function generatePositionUtilities(): UtilityClass[] {

  return positions.map(p => ({ className: p.name, css: p.css }));
}

/** Generate all flex utilities */
function generateFlexUtilities(): UtilityClass[] {
  const utilities: UtilityClass[] = [];
  const directions = [
    { value: "row", css: "flex-direction: row;" },
    { value: "col", css: "flex-direction: column;" },
  ];
  directions.forEach(d => utilities.push({ className: `flex-${d.value}`, css: d.css }));

  // flex-wrap
  const wraps = [
    { value: "wrap", css: "flex-wrap: wrap;" },
    { value: "wrap-reverse", css: "flex-wrap: wrap-reverse;" },
    { value: "nowrap", css: "flex-wrap: nowrap;" },
  ];
  wraps.forEach(w => utilities.push({ className: `flex-${w.value}`, css: w.css }));

  // flex
  const flexValues = [
    { value: "1", css: "flex: 1 1 0%;" },
    { value: "auto", css: "flex: 1 1 auto;" },
    { value: "initial", css: "flex: 0 1 auto;" },
    { value: "none", css: "flex: none;" },
  ];
  flexValues.forEach(f => utilities.push({ className: `flex-${f.value}`, css: f.css }));

  return utilities;
}

/** Generate all alignment utilities */
function generateAlignmentUtilities(): UtilityClass[] {
  const utilities: UtilityClass[] = [];

  // items (align-items)
  const items = ["start", "center", "end", "baseline", "stretch"];
  items.forEach(item => {
    const value = item === "start" || item === "end" ? `flex-${item}` : item;
    utilities.push({ className: `items-${item}`, css: `align-items: ${value};` });
  });

  // justify (justify-content)
  // const justifyMap: Record<string, string> = {
  //   "start": "flex-start",
  //   "center": "center",
  //   "end": "flex-end",
  //   "between": "space-between",
  //   "around": "space-around",
  //   "evenly": "space-evenly",
  //   "normal": "normal",
  //   "stretch": "stretch",
  // };


  Object.entries(justifyMap).forEach(([key, value]) => {
    utilities.push({ className: `justify-${key}`, css: `justify-content: ${value};` });
  });

  // self (align-self)
  const selfValues = ["auto", "start", "center", "end", "stretch", "baseline"];
  selfValues.forEach(self => {
    const value = self === "start" || self === "end" ? `flex-${self}` : self;
    utilities.push({ className: `self-${self}`, css: `align-self: ${value};` });
  });

  return utilities;
}

/** Generate all text utilities */
function generateTextUtilities(): UtilityClass[] {
  const utilities: UtilityClass[] = [];

  // Text sizes
  tailwindPickerOptions('text-').map(o => o.label).forEach(size => {
    utilities.push({
      className: `text-${size}`,
      css: `font-size: var(--tw-${size});`
    });
  });

  // Text colors
  generateColorTokens().forEach(color => {
    const cssValue = ["black", "white", "transparent", "current", "inherit"].includes(color)
      ? color === "black" ? "#000"
        : color === "white" ? "#fff"
          : color
      : `var(--tw-${color})`;
    utilities.push({
      className: `text-${color}`,
      css: `color: ${cssValue};`
    });
  });

  // Text alignment
  ["left", "center", "right", "justify", "start", "end"].forEach(align => {
    utilities.push({
      className: `text-${align}`,
      css: `text-align: ${align};`
    });
  });

  return utilities;
}
/** Generate all background utilities */
export function generateBackgroundUtilities(): UtilityClass[] {
  const utilities: UtilityClass[] = [];
  // Background colors
  generateColorTokens().forEach(color => {
    const cssValue =
      ["black", "white", "transparent", "current", "inherit"].includes(color)
        ? color === "black"
          ? "#000"
          : color === "white"
            ? "#fff"
            : color
        : `var(--tw-${color})`;

    utilities.push({
      className: `bg-${color}`,
      css: `background-color:${cssValue};`
    });
  });

  // Gradient directions
  const gradientDirs = [
    { suffix: "to-r", dir: "to right" },
    { suffix: "to-l", dir: "to left" },
    { suffix: "to-t", dir: "to top" },
    { suffix: "to-b", dir: "to bottom" },
    { suffix: "to-tr", dir: "to top right" },
    { suffix: "to-tl", dir: "to top left" },
    { suffix: "to-br", dir: "to bottom right" },
    { suffix: "to-bl", dir: "to bottom left" },
  ];

  gradientDirs.forEach(({ suffix, dir }) => {
    utilities.push({
      className: `bg-gradient-${suffix}`,
      css: `background-image:linear-gradient(${dir},var(--tw-gradient-from),var(--tw-gradient-via,var(--tw-gradient-from)),var(--tw-gradient-to));`
    });
  });

  // FROM
  generateColorTokens().forEach(color => {
    utilities.push({
      className: `from-${color}`,
      css: `--tw-gradient-from:var(--tw-${color});`
    });
  });

  // VIA
  generateColorTokens().forEach(color => {
    utilities.push({
      className: `via-${color}`,
      css: `--tw-gradient-via:var(--tw-${color});`
    });
  });

  // TO
  generateColorTokens().forEach(color => {
    utilities.push({
      className: `to-${color}`,
      css: `--tw-gradient-to:var(--tw-${color});`
    });
  });

  return utilities;
}



/** Generate all spacing utilities (padding, margin, gap) */
function generateSpacingUtilities(): UtilityClass[] {
  const utilities: UtilityClass[] = [];

  const negativeValues = generateNegativeSpacingValues();

  // Helper to convert token to CSS value
  const toSpacing = (v: string) => {
    if (v === "0") return "0";
    if (v.startsWith("-")) return `-${Number(v.slice(1)) * 0.25}rem`;
    return `${Number(v) * 0.25}rem`;
  };

  // Padding (positive only)
  const paddingPrefixes = ["p", "px", "py", "pt", "pb", "pl", "pr"];
  const paddingMap: Record<string, string> = {
    "p": "padding",
    "px": "padding-left: {v}; padding-right: {v}",
    "py": "padding-top: {v}; padding-bottom: {v}",
    "pt": "padding-top",
    "pb": "padding-bottom",
    "pl": "padding-left",
    "pr": "padding-right",
  };

  paddingPrefixes.forEach(prefix => {
    spacingValues.forEach(value => {
      const css = paddingMap[prefix].includes("{v}")
        ? paddingMap[prefix].replace(/{v}/g, toSpacing(value))
        : `${paddingMap[prefix]}: ${toSpacing(value)};`;
      utilities.push({
        className: `${prefix}-${value}`,
        css
      });
    });
  });

  // Margin (positive and negative)
  const marginPrefixes = ["m", "mx", "my", "mt", "mb", "ml", "mr"];
  const marginMap: Record<string, string> = {
    "m": "margin",
    "mx": "margin-left: {v}; margin-right: {v}",
    "my": "margin-top: {v}; margin-bottom: {v}",
    "mt": "margin-top",
    "mb": "margin-bottom",
    "ml": "margin-left",
    "mr": "margin-right",
  };

  marginPrefixes.forEach(prefix => {
    [...spacingValues, ...negativeValues].forEach(value => {
      const css = marginMap[prefix].includes("{v}")
        ? marginMap[prefix].replace(/{v}/g, toSpacing(value))
        : `${marginMap[prefix]}: ${toSpacing(value)};`;
      utilities.push({
        className: `${prefix}-${value}`,
        css
      });
    });
  });

  // Gap (positive only)
  const gapPrefixes = ["gap", "gap-x", "gap-y"];
  const gapMap: Record<string, string> = {
    "gap": "gap",
    "gap-x": "column-gap",
    "gap-y": "row-gap",
  };

  gapPrefixes.forEach(prefix => {
    spacingValues.forEach(value => {
      utilities.push({
        className: `${prefix}-${value}`,
        css: `${gapMap[prefix]}: ${toSpacing(value)};`
      });
    });
  });

  return utilities;
}

/** Generate all sizing utilities (width, height) */
function generateSizingUtilities(): UtilityClass[] {
  const utilities: UtilityClass[] = [];
  const sizeValues = generateSizeValues();

  const toSize = (v: string, type: 'vw' | 'vh') => {
    const screen = type === 'vw' ? '100vw' : '100vh';
    const keywords: Record<string, string> = {
      auto: "auto", full: "100%", screen,
      min: "min-content", max: "max-content", fit: "fit-content",
      "0": "0",
    };
    if (keywords[v]) return keywords[v];
    if (v.includes("/")) {
      const [num, den] = v.split("/").map(Number);
      return `${(num / den) * 100}%`;
    }
    if (!isNaN(Number(v))) return `${Number(v) * 0.25}rem`;
    return `var(--tw-size-${v})`;
  };

  const sizePrefixes = ["w", "min-w", "max-w", "h", "min-h", "max-h"];
  const sizeMap: Record<string, { prop: string; type: 'vw' | 'vh' }> = {
    "w": { prop: "width", type: 'vw' },
    "min-w": { prop: "min-width", type: 'vw' },
    "max-w": { prop: "max-width", type: 'vw' },
    "h": { prop: "height", type: 'vh' },
    "min-h": { prop: "min-height", type: 'vh' },
    "max-h": { prop: "max-height", type: 'vh' },
  };

  sizePrefixes.forEach(prefix => {
    const { prop, type } = sizeMap[prefix];
    sizeValues.forEach(value => {
      utilities.push({
        className: `${prefix}-${value}`,
        css: `${prop}: ${toSize(value, type)};`
      });
    });
  });

  return utilities;
}

/** Generate all border utilities */
function generateBorderUtilities(): UtilityClass[] {
  const utilities: UtilityClass[] = [];

  // Border widths
  const borderWidths = ["0", "2", "4", "8"];
  const borderPrefixes = ["border", "border-t", "border-b", "border-l", "border-r"];
  const borderMap: Record<string, string> = {
    "border": "border-width",
    "border-t": "border-top-width",
    "border-b": "border-bottom-width",
    "border-l": "border-left-width",
    "border-r": "border-right-width",
  };

  borderPrefixes.forEach(prefix => {
    borderWidths.forEach(width => {
      utilities.push({
        className: `${prefix}-${width}`,
        css: `${borderMap[prefix]}: ${width === "0" ? "0" : width + "px"};`
      });
    });
  });

  // Border default (no width suffix)
  utilities.push({
    className: "border",
    css: "border-width: 1px;"
  });

  // Border colors
  generateColorTokens().forEach(color => {
    const cssValue = ["black", "white", "transparent", "current", "inherit"].includes(color)
      ? color === "black" ? "#000"
        : color === "white" ? "#fff"
          : color
      : `var(--tw-${color})`;
    utilities.push({
      className: `border-${color}`,
      css: `border-color: ${cssValue};`
    });
  });

  // Border radius
  utilities.push({
    className: "rounded",
    css: "border-radius: 0.25rem;"
  });


  const radiusPrefixes = [
    "rounded", "rounded-t", "rounded-b", "rounded-l", "rounded-r",
    "rounded-tl", "rounded-tr", "rounded-bl", "rounded-br"
  ];

  radiusPrefixes.forEach(prefix => {
    BorderRadiusValues.forEach(value => {
      let css: string;
      switch (prefix) {
        case "rounded":
          css = `border-radius: var(--tw-rounded-${value});`;
          break;
        case "rounded-t":
          css = `border-top-left-radius: var(--tw-rounded-${value}); border-top-right-radius: var(--tw-rounded-${value});`;
          break;
        case "rounded-b":
          css = `border-bottom-left-radius: var(--tw-rounded-${value}); border-bottom-right-radius: var(--tw-rounded-${value});`;
          break;
        case "rounded-l":
          css = `border-top-left-radius: var(--tw-rounded-${value}); border-bottom-left-radius: var(--tw-rounded-${value});`;
          break;
        case "rounded-r":
          css = `border-top-right-radius: var(--tw-rounded-${value}); border-bottom-right-radius: var(--tw-rounded-${value});`;
          break;
        case "rounded-tl":
          css = `border-top-left-radius: var(--tw-rounded-${value});`;
          break;
        case "rounded-tr":
          css = `border-top-right-radius: var(--tw-rounded-${value});`;
          break;
        case "rounded-bl":
          css = `border-bottom-left-radius: var(--tw-rounded-${value});`;
          break;
        case "rounded-br":
          css = `border-bottom-right-radius: var(--tw-rounded-${value});`;
          break;
        default:
          css = "";
      }
      if (css) {
        utilities.push({
          className: `${prefix}-${value}`,
          css
        });
      }
    });
  });

  return utilities;
}

/** Generate all typography utilities */
function generateTypographyUtilities(): UtilityClass[] {
  const utilities: UtilityClass[] = [];

  // Font weights
  tailwindPickerOptions('font-').map(o => o.label).forEach(weight => {
    utilities.push({
      className: `font-${weight}`,
      css: `font-weight: var(--tw-font-${weight});`
    });
  });

  // Line heights
  tailwindPickerOptions('leading-').map(o => o.label).forEach(leading => {
    utilities.push({
      className: `leading-${leading}`,
      css: `line-height: var(--tw-leading-${leading});`
    });
  });

  // Letter spacing
  tailwindPickerOptions('tracking-').map(o => o.label).forEach(tracking => {
    utilities.push({
      className: `tracking-${tracking}`,
      css: `letter-spacing: var(--tw-tracking-${tracking});`
    });
  });

  return utilities;
}

/** Generate all effect utilities (shadow, opacity) */
function generateEffectUtilities(): UtilityClass[] {
  const utilities: UtilityClass[] = [];

  // Shadows
  utilities.push({
    className: "shadow",
    css: "box-shadow: var(--tw-shadow);"
  });

  ShadowValues.forEach(shadow => {
    utilities.push({
      className: `shadow-${shadow}`,
      css: `box-shadow: var(--tw-shadow-${shadow});`
    });
  });

  // Opacity
  OpacityValues.forEach(opacity => {
    utilities.push({
      className: `opacity-${opacity}`,
      css: `opacity: ${Number(opacity) / 100};`
    });
  });

  // Z-index
  zIndexes.forEach(z => {
    utilities.push({
      className: `z-${z}`,
      css: `z-index: ${z};`
    });
  });

  return utilities;
}

/** Generate all grid utilities */
function generateGridUtilities(): UtilityClass[] {
  const utilities: UtilityClass[] = [];

  GridColValues.forEach(cols => {
    utilities.push({
      className: `grid-cols-${cols}`,
      css: cols === "none"
        ? "grid-template-columns: none;"
        : `grid-template-columns: repeat(${cols}, minmax(0, 1fr));`
    });
  });

  return utilities;
}

/** Generate all overflow utilities */
function generateOverflowUtilities(): UtilityClass[] {
  const utilities: UtilityClass[] = [];
  const overflowValues = ["auto", "hidden", "visible", "scroll"];

  overflowValues.forEach(value => {
    utilities.push({
      className: `overflow-${value}`,
      css: `overflow: ${value};`
    });
    utilities.push({
      className: `overflow-x-${value}`,
      css: `overflow-x: ${value};`
    });
    utilities.push({
      className: `overflow-y-${value}`,
      css: `overflow-y: ${value};`
    });
  });

  return utilities;
}

/** Generate all transition utilities */
function generateTransitionUtilities(): UtilityClass[] {
  const utilities: UtilityClass[] = [];

  utilities.push({
    className: "transition",
    css: "transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;"
  });

  const transitionTypes = ["none", "all", "colors", "opacity", "shadow", "transform"];
  transitionTypes.forEach(type => {
    utilities.push({
      className: `transition-${type}`,
      css: `transition-property: var(--tw-transition-${type}); transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;`
    });
  });

  return utilities;
}

// ─── Main Generator ───────────────────────────────────────────────────────────

export class CompileTimeCssGenerator {

  /**
   * Generate all base utilities (no variants)
   */
  static generateAllBaseUtilities(): UtilityClass[] {
    return [
      ...generateDisplayUtilities(),
      ...generatePositionUtilities(),
      ...generateFlexUtilities(),
      ...generateAlignmentUtilities(),
      ...generateTextUtilities(),
      ...generateBackgroundUtilities(),
      ...generateSpacingUtilities(),
      ...generateSizingUtilities(),
      ...generateBorderUtilities(),
      ...generateTypographyUtilities(),
      ...generateEffectUtilities(),
      ...generateGridUtilities(),
      ...generateOverflowUtilities(),
      ...generateTransitionUtilities(),

    ];
  }

  /**
   * Escape CSS selector special characters
   */
  private static escapeCssSelector(cls: string): string {
    return cls.replace(/[:[]/g, "\\$&").replace(/\]/g, "\\]");
  }

  /**
   * Apply variant wrapper to a CSS rule
   */
  private static applyVariant(
    className: string,
    css: string,
    variant: string,
    isolated: boolean = false
  ): string {
    const prefix = isolated ? "v-" : "";
    const fullClass = `${prefix}${variant}${className}`;
    const escaped = this.escapeCssSelector(fullClass);

    // Responsive breakpoints
    if (BREAKPOINTS.includes(variant.replace(":", ""))) {
      const bp = variant.replace(":", "");
      const breakpointMap: Record<string, string> = {
        sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px"
      };
      return `@media (min-width: ${breakpointMap[bp]}) {\n  .${escaped} { ${css} }\n}`;
    }

    // Container queries
    if (variant.startsWith("@")) {
      const bp = variant.slice(1).replace(":", "");
      const breakpointMap: Record<string, string> = {
        sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px"
      };
      return `@container (min-width: ${breakpointMap[bp]}) {\n  .${escaped} { ${css} }\n}`;
    }

    // Theme variants
    if (variant === "dark:") {
      return `@media (prefers-color-scheme: dark) {\n  .${escaped} { ${css} }\n}`;
    }

    // State variants
    // const pseudoMap: Record<string, string> = {
    //   "hover:": ":hover",
    //   "focus:": ":focus",
    //   "focus-within:": ":focus-within",
    //   "focus-visible:": ":focus-visible",
    //   "active:": ":active",
    //   "visited:": ":visited",
    //   "target:": ":target",
    //   "first:": ":first-child",
    //   "last:": ":last-child",
    //   "only:": ":only-child",
    //   "odd:": ":nth-child(odd)",
    //   "even:": ":nth-child(even)",
    //   "disabled:": ":disabled",
    //   "enabled:": ":enabled",
    //   "checked:": ":checked",
    // };

    const pseudoMap: Record<string, string> = {
      "hover:": ":hover",
      "focus:": ":focus",
      "focus-within:": ":focus-within",
      "focus-visible:": ":focus-visible",
      "active:": ":active",
      "visited:": ":visited",
      "disabled:": ":disabled",
      "enabled:": ":enabled",
      "checked:": ":checked",
    };
    const pseudo = pseudoMap[variant];
    if (pseudo) {
      return `.${escaped}${pseudo} { ${css} }`;
    }

    return `.${escaped} { ${css} }`;
  }

  /**
   * Generate complete CSS file with all utilities and variants
   */
  static generateCompleteCssFile(options: CompileTimeCssOptions = {}): string {
    const {
      includeResponsive = true,
      includeStates = true,
      includeTheme = true,
      includeContainerQueries = false,
      isolated = false,
      minify = false,
    } = options;

    const baseUtilities = this.generateAllBaseUtilities();
    const rules: string[] = [];

    // Generate base utilities
    baseUtilities.forEach(({ className, css }) => {
      const prefix = isolated ? "v-" : "";
      const fullClass = `${prefix}${className}`;
      const escaped = this.escapeCssSelector(fullClass);
      rules.push(`.${escaped} { ${css} }`);
    });

    // Generate responsive variants
    if (includeResponsive) {
      BREAKPOINTS.forEach(bp => {
        baseUtilities.forEach(({ className, css }) => {
          rules.push(this.applyVariant(className, css, `${bp}:`, isolated));
        });
      });
    }

    // Generate state variants
    if (includeStates) {
      STATE_VARIANTS.forEach(state => {
        baseUtilities.forEach(({ className, css }) => {
          rules.push(this.applyVariant(className, css, `${state}:`, isolated));
        });
      });
    }

    // Generate theme variants
    if (includeTheme) {
      THEME_VARIANTS.forEach(theme => {
        baseUtilities.forEach(({ className, css }) => {
          rules.push(this.applyVariant(className, css, `${theme}:`, isolated));
        });
      });
    }

    // Generate container query variants
    if (includeContainerQueries) {
      CONTAINER_BREAKPOINTS.forEach(bp => {
        baseUtilities.forEach(({ className, css }) => {
          rules.push(this.applyVariant(className, css, `@${bp}:`, isolated));
        });
      });
    }
    const variables = this.getStaticVariables();
    // Build final CSS
    const header = minify ? "" : [
      "/* ════════════════════════════════════════════════════════════════════════════════",
      " *  COMPLETE TAILWIND CSS - COMPILE TIME GENERATED",
      ` *  Mode: ${isolated ? 'Isolated (v-prefixed)' : 'Regular'}`,
      ` *  Responsive: ${includeResponsive}`,
      ` *  States: ${includeStates}`,
      ` *  Theme: ${includeTheme}`,
      ` *  Container Queries: ${includeContainerQueries}`,
      " *  Generated: " + new Date().toISOString(),
      ` *  Total Rules: ${rules.length + variables}`,
      " *  ════════════════════════════════════════════════════════════════════════════════ */",
      "",
      "",
    ].join("\n");



    const css = minify
      ? rules.join(" ")
      : rules.map(r => r.trim()).join("");
    return (header + variables + css)

  }
  static extractInlineCSSVars(css: string): string {
    return Array.from(
      css.matchAll(/(--[a-zA-Z0-9-_]+)\s*:\s*([^;]+);/g),
      m => `${m[1]}: ${m[2]};`
    ).join(' ')
  }

  /**
   * Generate CSS file with only specific utility categories
   */
  static generateSelectiveCssFile(
    categories: {
      display?: boolean;
      position?: boolean;
      flex?: boolean;
      text?: boolean;
      background?: boolean;
      spacing?: boolean;
      sizing?: boolean;
      border?: boolean;
      typography?: boolean;
      effects?: boolean;
      grid?: boolean;
      overflow?: boolean;
      transition?: boolean;
    },
    options: CompileTimeCssOptions = {}
  ): string {
    const utilities: UtilityClass[] = [];

    if (categories.display) utilities.push(...generateDisplayUtilities());
    if (categories.position) utilities.push(...generatePositionUtilities());
    if (categories.flex) utilities.push(...generateFlexUtilities());
    if (categories.text) utilities.push(...generateTextUtilities());
    if (categories.background) utilities.push(...generateBackgroundUtilities());
    if (categories.spacing) utilities.push(...generateSpacingUtilities());
    if (categories.sizing) utilities.push(...generateSizingUtilities());
    if (categories.border) utilities.push(...generateBorderUtilities());
    if (categories.typography) utilities.push(...generateTypographyUtilities());
    if (categories.effects) utilities.push(...generateEffectUtilities());
    if (categories.grid) utilities.push(...generateGridUtilities());
    if (categories.overflow) utilities.push(...generateOverflowUtilities());
    if (categories.transition) utilities.push(...generateTransitionUtilities());

    const rules: string[] = [];
    const isolated = options.isolated || false;

    // Generate base utilities
    utilities.forEach(({ className, css }) => {
      const prefix = isolated ? "v-" : "";
      const fullClass = `${prefix}${className}`;
      const escaped = this.escapeCssSelector(fullClass);
      rules.push(`.${escaped} { ${css} }`);
    });

    // Apply variants if requested
    if (options.includeResponsive) {
      BREAKPOINTS.forEach(bp => {
        utilities.forEach(({ className, css }) => {
          rules.push(this.applyVariant(className, css, `${bp}:`, isolated));
        });
      });
    }

    if (options.includeStates) {
      STATE_VARIANTS.forEach(state => {
        utilities.forEach(({ className, css }) => {
          rules.push(this.applyVariant(className, css, `${state}:`, isolated));
        });
      });
    }

    const header = [
      "/* ════════════════════════════════════════════════════════════════════════════════",
      " *  SELECTIVE TAILWIND CSS - COMPILE TIME GENERATED",
      " *  Categories: " + Object.keys(categories).filter(k => categories[k as keyof typeof categories]).join(", "),
      " *  Generated: " + new Date().toISOString(),
      " *  ════════════════════════════════════════════════════════════════════════════════ */",
      "",
      ROOT_POPERTIES,
      "",
    ].join("\n");

    return header + rules.join("\n\n");
  }

  /**
 * Get Static Variable 
 */
  static getStaticVariables(): string {
    let staticVariables = [];

    for (const color of colors) {
      for (const scale of scales) {
        let code = BuilderCssService.getColorCode(color, scale);

        let varaiable = `--tw-${color}-${scale}:${code};`
        staticVariables.push(varaiable);
      }
    }
    let str = `:root{${staticVariables.join('') + this.extractInlineCSSVars(ROOT_POPERTIES)}}`;


    return str;
  }



}

