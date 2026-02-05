import { LRUCache } from "@/app/core/cache/lruCache.core";
import { justifyMapType, PickerOption } from "../types/pageElement.types";
import { LightnessMap } from "../../services/types/css.services.types";

// ─── Keyword constants (re-exported for pageElements.ts etc.) ─────────────────

export const SIZE_KEYWORDS = {
  common: ["auto", "full", "screen", "min", "max", "fit"],
  zero: ["0"],
};

export const TEXT_SIZE_KEYWORDS = [
  "xs", "sm", "base", "lg", "xl",
  "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl",
];

export const COLOR_KEYWORDS = ["black", "white", "transparent", "current", "inherit"];

export const FONT_WEIGHT_KEYWORDS = [
  "thin", "extralight", "light", "normal",
  "medium", "semibold", "bold", "extrabold", "black",
];

export const SHADOW_KEYWORDS = ["sm", "md", "lg", "xl", "2xl", "inner", "none"];

export const PICKER_KEYWORDS: Record<string, string[]> = {
  'text-': ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl'],
  'font-': ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
  'leading-': ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
  'tracking-': ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
  'rounded-': ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
  'shadow-': ['none', 'sm', 'md', 'lg', 'xl', '2xl', 'inner'],
  'opacity-': ['0', '5', '10', '20', '25', '30', '40', '50', '60', '70', '75', '80', '90', '95', '100'],
  // 'grid-cols-':      ['1','2','3','4','5','6','7','8','9','10','11','12','none'],
  // 'bg-gradient-':    ['to-r','to-l','to-t','to-b','to-tr','to-tl','to-br','to-bl'],
};
export const colors = [
  "slate", "gray", "zinc", "neutral", "stone",
  "red", "orange", "amber", "yellow", "lime", "green",
  "emerald", "teal", "cyan", "sky", "blue", "indigo",
  "violet", "purple", "fuchsia", "pink", "rose", 'sunset', 'ocean', 'forest', 'purple', 'sky', 'fire', 'mint', 'royal', 'dusk', 'lemon', 'rose', 'aqua',

];
export const positions = [
  { name: "static", css: "position: static;" },
  { name: "relative", css: "position: relative;" },
  { name: "absolute", css: "position: absolute;" },
  { name: "fixed", css: "position: fixed;" },
  { name: "sticky", css: "position: sticky;" },
  { name: "position-none", css: "position: static;" },
];

export type positions = typeof positions;
export const displays = [
  { name: "block", css: "display: block;" },
  { name: "flex", css: "display: flex;" },
  { name: "grid", css: "display: grid;" },
  { name: "hidden", css: "display: none;" },];
export type displays = typeof displays;
export const ShadowValues = ["sm", "md", "lg", "xl", "2xl", "inner", "none"];
export const GridColValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "none"];
export const OpacityValues = ["0", "5", "10", "20", "25", "30", "40", "50", "60", "70", "75", "80", "90", "95", "100"]
export const BorderRadiusValues = ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"]
export const BREAKPOINTS = ["sm", "md", "lg", "xl", "2xl"];
export const lightness: LightnessMap = {
  50: 95, 100: 90, 200: 80, 300: 70, 400: 60, 500: 50, 600: 40, 700: 30, 800: 20, 900: 15, 950: 8,
}
export const CONTAINER_BREAKPOINTS = ["sm", "md", "lg", "xl", "2xl"];
export const THEME_VARIANTS = ["dark"];
export const COLOR_HUES: Record<string, number> = {
  "slate": 215,
  "gray": 220,
  'zinc': 240,
  'neutral': 0,
  'stone': 30,
  'red': 0,
  'orange': 25,
  'amber': 45,
  'yellow': 55,
  'lime': 85,
  'green': 142,
  'emerald': 160,
  'teal': 175,
  'cyan': 190,
  'sky': 200,
  'blue': 220,
  'indigo': 240,
  'violet': 260,
  'purple': 275,
  'fuchsia': 295,
  'pink': 330,
  'rose': 350,
  'sunset': 30,
  'ocean': 200,
  'forest': 140,
  'fire': 15,
  'mint': 150,
  'royal': 225,
  'dusk': 270,
  'lemon': 60,
  'aqua': 180,
};
export const STATE_VARIANTS = [
  "hover"
];
export const justifyMap: justifyMapType = {
  "start": "flex-start",
  "center": "center",
  "end": "flex-end",
  "between": "space-between",
  "around": "space-around",
  "evenly": "space-evenly",
};

export const zIndexes = ["0", "10", "20", "30", "40", "50", "-1", "99", "999", "auto"];
export const keywords = ["auto", "full", "screen", "min", "max", "fit", "0"];
export const spacingValues = [
  "0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5",
  "4", "5", "6", "7", "8", "9", "10", "11", "12",
  "14", "16", "20", "24", "28", "32", "36", "40",
  "44", "48", "52", "56", "60", "64", "72", "80", "96"
];
export const fractions = [
  "1/2", "1/3", "2/3", "1/4", "2/4", "3/4",
  "1/5", "2/5", "3/5", "4/5",
  "1/6", "2/6", "3/6", "4/6", "5/6",
  "1/12", "2/12", "3/12", "4/12", "5/12", "6/12",
  "7/12", "8/12", "9/12", "10/12", "11/12"
];
export const scales = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];
export const special = ["black", "white", "transparent", "current", "inherit"];

export const CONTAINER_QUERIES = BREAKPOINTS.map(bp => `@${bp}`);

export const BARE_KEYWORDS = [
  "flex", "grid", "block", "inline", "inline-block", "inline-flex",
  "inline-grid", "hidden", "static", "fixed", "absolute", "relative",
  "sticky", "rounded", "shadow", "transition"
];

export const POSSIBLE_PREFIXES = [
  "bg-gradient-", "rounded-tl-", "rounded-tr-", "rounded-bl-", "rounded-br-",
  "rounded-t-", "rounded-b-", "rounded-l-", "rounded-r-", "rounded-",
  "border-t-", "border-b-", "border-l-", "border-r-", "border-",
  "text-", "bg-", "flex-", "items-", "justify-", "self-",
  "w-", "min-w-", "max-w-", "h-", "min-h-", "max-h-",
  "p-", "px-", "py-", "pt-", "pb-", "pl-", "pr-",
  "m-", "mx-", "my-", "mt-", "mb-", "ml-", "mr-",
  "gap-", "gap-x-", "gap-y-", "space-x-", "space-y-",
  "font-", "leading-", "tracking-", "shadow-", "opacity-", "z-",
  "grid-cols-", "overflow-", "transition-", "from-", "via-", "to-",
  "position-"
];
export function tailwindPickerOptions(prefix: string): PickerOption[] {
  const keywords = PICKER_KEYWORDS[prefix];
  if (!keywords) return [];

  const options: PickerOption[] = keywords.map((kw) => ({
    label: kw,
    value: `${prefix}${kw}`,
  }));

  // Border-radius is the only utility with a bare class (no value after the prefix).
  // Slot it in at position 1 so it sits between "none" and "sm".
  if (prefix === 'rounded-') {
    options.splice(1, 0, { label: 'default', value: 'rounded' });
  }

  // Shadow also has a bare `shadow` class — same treatment.
  if (prefix === 'shadow-') {
    options.splice(1, 0, { label: 'default', value: 'shadow' });
  }

  return options;
}

// ─── Color swatch palette ─────────────────────────────────────────────────────
// Used by the background / text / border color pickers in the style panel.

export interface SwatchEntry {
  /** Display name shown in tooltips / lists. */
  name: string;
  /** Raw Tailwind color token (e.g. "blue-500"). */
  value: string;
  /** The bg-* class used to render the swatch preview square. */
  swatchClass: string;
  /** When true the swatch square needs a visible border so it doesn't vanish
   *  against a white canvas. */
  needsBorder?: boolean;
}

export const SWATCH_PALETTE: SwatchEntry[] = [
  { name: 'Transparent', value: 'transparent', swatchClass: 'bg-transparent', needsBorder: true },
  { name: 'White', value: 'white', swatchClass: 'bg-white', needsBorder: true },
  { name: 'Black', value: 'black', swatchClass: 'bg-black' },

  // Grays
  { name: 'Gray 50', value: 'gray-50', swatchClass: 'bg-gray-50', needsBorder: true },
  { name: 'Gray 100', value: 'gray-100', swatchClass: 'bg-gray-100', needsBorder: true },
  { name: 'Gray 200', value: 'gray-200', swatchClass: 'bg-gray-200' },
  { name: 'Gray 300', value: 'gray-300', swatchClass: 'bg-gray-300' },
  { name: 'Gray 400', value: 'gray-400', swatchClass: 'bg-gray-400' },
  { name: 'Gray 500', value: 'gray-500', swatchClass: 'bg-gray-500' },
  { name: 'Gray 600', value: 'gray-600', swatchClass: 'bg-gray-600' },
  { name: 'Gray 700', value: 'gray-700', swatchClass: 'bg-gray-700' },
  { name: 'Gray 800', value: 'gray-800', swatchClass: 'bg-gray-800' },
  { name: 'Gray 900', value: 'gray-900', swatchClass: 'bg-gray-900' },

  // Reds
  { name: 'Red 400', value: 'red-400', swatchClass: 'bg-red-400' },
  { name: 'Red 500', value: 'red-500', swatchClass: 'bg-red-500' },
  { name: 'Red 600', value: 'red-600', swatchClass: 'bg-red-600' },

  // Oranges
  { name: 'Orange 400', value: 'orange-400', swatchClass: 'bg-orange-400' },
  { name: 'Orange 500', value: 'orange-500', swatchClass: 'bg-orange-500' },
  { name: 'Orange 600', value: 'orange-600', swatchClass: 'bg-orange-600' },

  // Yellows
  { name: 'Yellow 400', value: 'yellow-400', swatchClass: 'bg-yellow-400' },
  { name: 'Yellow 500', value: 'yellow-500', swatchClass: 'bg-yellow-500' },
  { name: 'Yellow 600', value: 'yellow-600', swatchClass: 'bg-yellow-600' },

  // Greens
  { name: 'Green 400', value: 'green-400', swatchClass: 'bg-green-400' },
  { name: 'Green 500', value: 'green-500', swatchClass: 'bg-green-500' },
  { name: 'Green 600', value: 'green-600', swatchClass: 'bg-green-600' },

  // Blues
  { name: 'Blue 400', value: 'blue-400', swatchClass: 'bg-blue-400' },
  { name: 'Blue 500', value: 'blue-500', swatchClass: 'bg-blue-500' },
  { name: 'Blue 600', value: 'blue-600', swatchClass: 'bg-blue-600' },

  // Indigos
  { name: 'Indigo 400', value: 'indigo-400', swatchClass: 'bg-indigo-400' },
  { name: 'Indigo 500', value: 'indigo-500', swatchClass: 'bg-indigo-500' },
  { name: 'Indigo 600', value: 'indigo-600', swatchClass: 'bg-indigo-600' },

  // Purples
  { name: 'Purple 400', value: 'purple-400', swatchClass: 'bg-purple-400' },
  { name: 'Purple 500', value: 'purple-500', swatchClass: 'bg-purple-500' },
  { name: 'Purple 600', value: 'purple-600', swatchClass: 'bg-purple-600' },

  // Pinks
  { name: 'Pink 400', value: 'pink-400', swatchClass: 'bg-pink-400' },
  { name: 'Pink 500', value: 'pink-500', swatchClass: 'bg-pink-500' },
  { name: 'Pink 600', value: 'pink-600', swatchClass: 'bg-pink-600' },

  // Cyans
  { name: 'Cyan 400', value: 'cyan-400', swatchClass: 'bg-cyan-400' },
  { name: 'Cyan 500', value: 'cyan-500', swatchClass: 'bg-cyan-500' },
  { name: 'Cyan 600', value: 'cyan-600', swatchClass: 'bg-cyan-600' },

  // Teals
  { name: 'Teal 400', value: 'teal-400', swatchClass: 'bg-teal-400' },
  { name: 'Teal 500', value: 'teal-500', swatchClass: 'bg-teal-500' },
  { name: 'Teal 600', value: 'teal-600', swatchClass: 'bg-teal-600' },
];

// ─── Standalone Values ─────────────────────────────────────────────────────────

export const STANDALONE_VALUES: Record<string, string[]> = {
  // ────────── Display / Layout ──────────
  'display': [
    'block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid', 'inline-grid', 'hidden', 'display-default'
  ],
  'position': [
    'static', 'relative', 'absolute', 'fixed', 'sticky'
  ],
  // ────────── Borders & Radius ──────────
  'borderStyle': [
    'border'
  ],
  'borderRadius': [
    'rounded',
  ],
  'visibility': [
    'visible', 'invisible'
  ],

};


// ─── Gradient presets ─────────────────────────────────────────────────────────


export interface GradientPreset {
  /** Display name shown in the gradient picker. */
  name: string;
  /** The Tailwind gradient classes (direction + from/via/to). */
  classes: string;
}

export const GRADIENT_PRESETS: GradientPreset[] = [
  { name: 'Sunset', classes: 'to-r from-orange-500 via-red-500 to-pink-500' },
  { name: 'Ocean', classes: 'to-r from-blue-500 via-cyan-500 to-teal-500' },
  { name: 'Forest', classes: 'to-r from-green-500 via-emerald-500 to-teal-500' },
  { name: 'Purple Dream', classes: 'to-r from-purple-500 via-pink-500 to-red-500' },
  { name: 'Sky', classes: 'to-r from-blue-400 via-blue-500 to-blue-600' },
  { name: 'Fire', classes: 'to-r from-yellow-400 via-orange-500 to-red-600' },
  { name: 'Mint', classes: 'to-r from-green-300 via-teal-400 to-cyan-500' },
  { name: 'Royal', classes: 'to-r from-indigo-500 via-purple-500 to-pink-500' },
  { name: 'Dusk', classes: 'to-r from-pink-300 via-purple-400 to-indigo-500' },
  { name: 'Lemon', classes: 'to-r from-yellow-300 via-green-400 to-teal-500' },
  { name: 'Rose', classes: 'to-r from-red-400 via-pink-500 to-purple-500' },
  { name: 'Aqua', classes: 'to-r from-cyan-300 via-blue-400 to-indigo-500' },
];

export const ROOT_POPERTIES = `
  /* ═══════════════════════════════════════════════════════════
  /* ─── Special Colors ─────────────────────────────────────── */
  --tw-transparent: transparent;
  --tw-current: currentColor;
  --tw-inherit: inherit;
  --tw-black: #000;
  --tw-white: #fff;
  /* ═══════════════════════════════════════════════════════════
   *  TYPOGRAPHY 
   *  ═══════════════════════════════════════════════════════════ */
  /* ─── Font Weights (9) ───────────────────────────────────── */
  --tw-font-thin: 100;
  --tw-font-extralight: 200;
  --tw-font-light: 300;
  --tw-font-normal: 400;
  --tw-font-medium: 500;
  --tw-font-semibold: 600;
  --tw-font-bold: 700;
  --tw-font-extrabold: 800;
  --tw-font-black: 900;
  /* ─── Font Sizes (13) ────────────────────────────────────── */
  --tw-xs: 0.75rem;      /* 12px */
  --tw-sm: 0.875rem;     /* 14px */
  --tw-base: 1rem;       /* 16px */
  --tw-lg: 1.125rem;     /* 18px */
  --tw-xl: 1.25rem;      /* 20px */
  --tw-2xl: 1.5rem;      /* 24px */
  --tw-3xl: 1.875rem;    /* 30px */
  --tw-4xl: 2.25rem;     /* 36px */
  --tw-5xl: 3rem;        /* 48px */
  --tw-6xl: 3.75rem;     /* 60px */
  --tw-7xl: 4.5rem;      /* 72px */
  --tw-8xl: 6rem;        /* 96px */
  --tw-9xl: 8rem;        /* 128px */
  /* ─── Line Heights (6) ───────────────────────────────────── */
  --tw-leading-none: 1;
  --tw-leading-tight: 1.25;
  --tw-leading-snug: 1.375;
  --tw-leading-normal: 1.5;
  --tw-leading-relaxed: 1.625;
  --tw-leading-loose: 2;
  /* ─── Letter Spacing (6) ─────────────────────────────────── */
  --tw-tracking-tighter: -0.05em;
  --tw-tracking-tight: -0.025em;
  --tw-tracking-normal: 0em;
  --tw-tracking-wide: 0.025em;
  --tw-tracking-wider: 0.05em;
  --tw-tracking-widest: 0.1em;
  /* ═══════════════════════════════════════════════════════════
   *  BORDER & EFFECTS 
   *  ═══════════════════════════════════════════════════════════ */
  /* ─── Border Radius (8) ──────────────────────────────────── */
  --tw-rounded-none: 0px;
  --tw-rounded-sm: 0.125rem;    /* 2px */
  --tw-rounded-md: 0.375rem;    /* 6px */
  --tw-rounded-lg: 0.5rem;      /* 8px */
  --tw-rounded-xl: 0.75rem;     /* 12px */
  --tw-rounded-2xl: 1rem;       /* 16px */
  --tw-rounded-3xl: 1.5rem;     /* 24px */
  --tw-rounded-full: 9999px;
  
  /* ─── Box Shadows (8) ────────────────────────────────────── */
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --tw-shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  --tw-shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-none: 0 0 #0000;
  
  /* ─── Opacity (21) - Note: Not typically stored as variables,
       calculated inline as opacity: N/100 ─────────────────── */
  /* Included for completeness if needed by virtual CSS system */
  
  /* ═══════════════════════════════════════════════════════════
   *  TRANSITIONS (6 variables)
   *  ═══════════════════════════════════════════════════════════ */
  --tw-transition-none: none;
  --tw-transition-all: all;
  --tw-transition-colors: color, background-color, border-color, text-decoration-color, fill, stroke;
  --tw-transition-opacity: opacity;
  --tw-transition-shadow: box-shadow;
  --tw-transition-transform: transform;
  
  /* ═══════════════════════════════════════════════════════════
   *  CUSTOM PIXEL SIZES (10 variables)
   *  From virtual CSS usage
   *  ═══════════════════════════════════════════════════════════ */
  --tw-size-16px: 16px;
  --tw-size-32px: 32px;
  --tw-size-48px: 48px;
  --tw-size-64px: 64px;
  --tw-size-96px: 96px;
  --tw-size-128px: 128px;
  --tw-size-192px: 192px;
  --tw-size-256px: 256px;
  --tw-size-384px: 384px;
  --tw-size-512px: 512px;
    /* ═══════════════════════════════════════════════════════════
   * gradients

   *  ═══════════════════════════════════════════════════════════ */
--tw-gradient-from: transparent;
--tw-gradient-to: transparent;
--tw-gradient-via: transparent;

--tw-gradient-from-position: 0%;
--tw-gradient-via-position: 50%;
--tw-gradient-to-position: 100%;
`

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Describes how a single Tailwind prefix (e.g. "text-", "p-") is validated.
 * `prefix`  — the literal prefix string including the trailing hyphen.
 * `pattern` — regex that the VALUE portion must match to be recognised.
 */
export type TailwindPrefixRule = {
  prefix: string;
  pattern: RegExp;
};

/** What resolveVariantWrappers returns — every CSS layer that needs to wrap a rule. */
export interface VariantWrappers {
  /** e.g. ":hover", "::before", ":nth-child(odd)" — appended to the selector */
  pseudoSelector: string | null;
  /** e.g. "@media (min-width: 768px)" */
  mediaQuery: string | null;
  /** e.g. "@container (min-width: 768px)" */
  containerQuery: string | null;
  /** e.g. "@media (prefers-color-scheme: dark)" */
  themeWrapper: string | null;
}

// ─── Caches ───────────────────────────────────────────────────────────────────

export const ruleLookupCache = new LRUCache<string, TailwindPrefixRule[]>(2000);

// ─── Validation regex fragments ──────────────────────────────────────────────

const FRACTION = "\\d+\\/\\d+";
const ARBITRARY_SIMPLE = "\\d+(?:\\.\\d+)?(?:px|rem|em|%|vw|vh|ch|ex|svh|lvh|dvh)";
const ARBITRARY_CALC = "calc\\([^\\s\\]]+\\)";
const ARBITRARY_VAR = "var\\(--[a-zA-Z0-9-_]+\\)";
const ARBITRARY_PX = "\\[(\\d+)px\\]";
const ARBITRARY = `\\[(?:${ARBITRARY_SIMPLE}|${ARBITRARY_CALC}|${ARBITRARY_VAR})\\]`;

const SPACING_SCALE =
  "(?:0(?:\\.5)?|1(?:\\.5)?|2(?:\\.5)?|3(?:\\.5)?|[4-9]|1[0-2]|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|128|256|384|512)";

const TAILWIND_COLORS = [
  "slate", "gray", "zinc", "neutral", "stone",
  "red", "orange", "amber", "yellow", "lime", "green",
  "emerald", "teal", "cyan", "sky", "blue", "indigo",
  "violet", "purple", "fuchsia", "pink", "rose",
];
const COLOR_SCALES = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];
const COLOR_SCALE = `(?:${TAILWIND_COLORS.join("|")})-(?:${COLOR_SCALES.join("|")})`;

// ─── Composed validation patterns ────────────────────────────────────────────

const keywordsToRegex = (kw: string[]) => new RegExp(`^(${kw.join("|")})$`);

const TEXT_SIZE_PATTERN = new RegExp(`^(${TEXT_SIZE_KEYWORDS.join("|")}|${ARBITRARY})$`);
const BORDER_SIZE_PATTERN = new RegExp(`^(0|2|4|8|${ARBITRARY_PX})$`);
const COLOR_PATTERN = new RegExp(`^(${COLOR_KEYWORDS.join("|")}|${COLOR_SCALE})$`);
const WIDTH_PATTERN = new RegExp(
  `^(${SIZE_KEYWORDS.common.join("|")}|${SIZE_KEYWORDS.zero.join("|")}|${FRACTION}|${ARBITRARY}|${SPACING_SCALE})$`,
);
const SPACING_PATTERN = new RegExp(`^(-?(?:${SPACING_SCALE})|${ARBITRARY})$`);
const POSITIVE_SPACING_PATTERN = new RegExp(`^(${SPACING_SCALE}|${ARBITRARY})$`);
const OPACITY_PATTERN = /^(0|5|10|15|20|25|30|35|40|45|50|55|60|65|70|75|80|85|90|95|100)$/;
const Z_INDEX_PATTERN = new RegExp(`^(0|10|20|30|40|50|-1|999|99|auto)$`);
const GRID_COLS_PATTERN = /^(1|2|3|4|5|6|7|8|9|10|11|12|none)$/;
const GRADIENT_DIRECTION = /^(to-r|to-l|to-t|to-b|to-tr|to-tl|to-br|to-bl)$/;

// ─── Static Tailwind definition maps ─────────────────────────────────────────
// Every map below is a fixed fact about how Tailwind works.  Nothing here is
// computed at runtime — it is all looked up.

/** Responsive breakpoint name → min-width value. */
const BREAKPOINT_MAP: Record<string, string> = {
  sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px",
};

/**
 * Tailwind variant keyword → the CSS pseudo-class or pseudo-element it produces.
 * Covers state variants, group/peer variants that map directly, and pseudo-elements.
 */
const PSEUDO_MAP: Record<string, string> = {
  // state
  hover: ":hover",
  focus: ":focus",
  "focus-within": ":focus-within",
  "focus-visible": ":focus-visible",
  active: ":active",
  visited: ":visited",
  target: ":target",
  first: ":first-child",
  last: ":last-child",
  only: ":only-child",
  odd: ":nth-child(odd)",
  even: ":nth-child(even)",
  "first-of-type": ":first-of-type",
  "last-of-type": ":last-of-type",
  "only-of-type": ":only-of-type",
  empty: ":empty",
  disabled: ":disabled",
  enabled: ":enabled",
  checked: ":checked",
  indeterminate: ":indeterminate",
  default: ":default",
  required: ":required",
  valid: ":valid",
  invalid: ":invalid",
  "in-range": ":in-range",
  "out-of-range": ":out-of-range",
  "placeholder-shown": ":placeholder-shown",
  autofill: ":autofill",
  "read-only": ":read-only",
  open: ":open",
  // pseudo-elements
  before: "::before",
  after: "::after",
  "first-letter": "::first-letter",
  "first-line": "::first-line",
  marker: "::marker",
  selection: "::selection",
  file: "::file-selector-button",
  backdrop: "::backdrop",
  placeholder: "::placeholder",
};

/**
 * Bare-keyword classes (no prefix, no value) → the single CSS declaration they produce.
 * These are utilities like "flex", "hidden", "relative" that have no hyphen at all.
 */
const BARE_KEYWORD_DECLARATIONS: Record<string, string> = {
  // display
  flex: "display: flex;",
  grid: "display: grid;",
  block: "display: block;",
  inline: "display: inline;",
  "inline-block": "display: inline-block;",
  "inline-flex": "display: inline-flex;",
  "inline-grid": "display: inline-grid;",
  hidden: "display: none;",
  // position
  static: "position: static;",
  fixed: "position: fixed;",
  absolute: "position: absolute;",
  relative: "position: relative;",
  sticky: "position: sticky;",
  // bare border-radius / shadow / transition
  rounded: "border-radius: 0.25rem;",
  shadow: "box-shadow: var(--tw-shadow);",
  transition: "transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;",
};

/**
 * Prefix → the CSS property it controls.
 * Used as the fallback when an arbitrary value like w-[calc(100%-2rem)] is encountered
 * and we need to know which property to assign the raw value to.
 */
const PREFIX_TO_CSS_PROPERTY: Record<string, string> = {
  "w-": "width",
  "h-": "height",
  "min-w-": "min-width",
  "max-w-": "max-width",
  "min-h-": "min-height",
  "max-h-": "max-height",
  "p-": "padding",
  "px-": "padding-inline",
  "py-": "padding-block",
  "pt-": "padding-top",
  "pb-": "padding-bottom",
  "pl-": "padding-left",
  "pr-": "padding-right",
  "m-": "margin",
  "mx-": "margin-inline",
  "my-": "margin-block",
  "mt-": "margin-top",
  "mb-": "margin-bottom",
  "ml-": "margin-left",
  "mr-": "margin-right",
  "text-": "font-size",
  "bg-": "background-color",
  "border-": "border-width",
  "border-t-": "border-top-width",
  "border-b-": "border-bottom-width",
  "border-l-": "border-left-width",
  "border-r-": "border-right-width",
  "rounded-": "border-radius",
  "rounded-t-": "border-top-left-radius",
  "rounded-b-": "border-bottom-left-radius",
  "rounded-l-": "border-top-left-radius",
  "rounded-r-": "border-top-right-radius",
  "rounded-tl-": "border-top-left-radius",
  "rounded-tr-": "border-top-right-radius",
  "rounded-bl-": "border-bottom-left-radius",
  "rounded-br-": "border-bottom-right-radius",
  "font-": "font-weight",
  "leading-": "line-height",
  "tracking-": "letter-spacing",
  "shadow-": "box-shadow",
  "opacity-": "opacity",
  "z-": "z-index",
  "gap-": "gap",
  "gap-x-": "column-gap",
  "gap-y-": "row-gap",
  "overflow-": "overflow",
  "transition-": "transition-property",
  "space-x-": "margin-left",
  "space-y-": "margin-top",
};

// ─── Token → CSS value converters ─────────────────────────────────────────────
// Pure math / keyword lookups.  No orchestration.

/** "1/2" → "50%", "2/3" → "66.666667%", etc. */
function fractionValue(token: string): string {
  const [num, den] = token.split("/").map(Number);
  return `${(num / den) * 100}%`;
}

/** Tailwind spacing token → CSS value.  Handles negatives and fractions. */
function spacingValue(token: string): string {
  if (token === "0") return "0";
  if (token.startsWith("-")) return `-${spacingValue(token.slice(1))}`;
  if (!isNaN(Number(token))) return `${Number(token) * 0.25}rem`;
  return `var(--tw-spacing-${token})`;
}

/** Tailwind size token → CSS value.  Superset of spacing: also handles
 *  keywords like "full", "screen", "fit" and fractions. */
function sizeValue(token: string, type: string): string {
  let screen;
  type == 'vw' ? screen = '100vw' : screen = '100vh';
  const keywords: Record<string, string> = {
    auto: "auto", full: "100%", screen: screen,
    min: "min-content", max: "max-content", fit: "fit-content",
    "0": "0",
  };
  if (keywords[token]) return keywords[token];
  if (token.includes("/")) return fractionValue(token);
  if (!isNaN(Number(token))) return `${Number(token) * 0.25}rem`;
  return `var(--tw-size-${token})`;
}

// ─── Prefixed declaration handler map ─────────────────────────────────────────
// Given a prefix that HAS a value (e.g. "text-" + "red-500"), return the full
// CSS declaration string.  Each entry mirrors exactly one family in ALL_RULES.

type DeclarationResolver = (value: string) => string | null;

const COLOR_VALUE_MAP: Record<string, string> = {
  'black': '#000',
  'white': '#fff',
  'transparent': 'transparent',
  'current': 'currentColor',
  'inherit': 'inherit'
};

const PREFIX_DECLARATION_RESOLVERS: Record<string, DeclarationResolver> = {
  "text-": (v) => {
    if (["center", "right", "left", "justify", "start", "end"].includes(v))
      return `text-align: ${v};`;
    if (TEXT_SIZE_KEYWORDS.includes(v))
      return `font-size: var(--tw-${v});`;
    if (COLOR_VALUE_MAP[v])
      return `color: ${COLOR_VALUE_MAP[v]};`;
    return `color: var(--tw-${v});`;
  },
  "flex-": (v) => {
    const flexMap: Record<string, string> = {
      'row': 'flex-direction: row;',
      'row-reverse': 'flex-direction: row-reverse;',
      'col': 'flex-direction: column;',
      'col-reverse': 'flex-direction: column-reverse;',
      'wrap': 'flex-wrap: wrap;',
      'wrap-reverse': 'flex-wrap: wrap-reverse;',
      'nowrap': 'flex-wrap: nowrap;',
      '1': 'flex: 1 1 0%;',
      'auto': 'flex: 1 1 auto;',
      'initial': 'flex: 0 1 auto;',
      'none': 'flex: none;',
    };
    return flexMap[v] || null;
  },
  "items-": (v) => {
    const itemsMap: Record<string, string> = {
      'start': 'align-items: flex-start;',
      'center': 'align-items: center;',
      'end': 'align-items: flex-end;',
      'baseline': 'align-items: baseline;',
      'stretch': 'align-items: stretch;',
    };
    return itemsMap[v] || null;
  },
  "justify-": (v) => {
    const justifyMap: Record<string, string> = {
      'start': 'justify-content: flex-start;',
      'center': 'justify-content: center;',
      'end': 'justify-content: flex-end;',
      'between': 'justify-content: space-between;',
      'around': 'justify-content: space-around;',
      'evenly': 'justify-content: space-evenly;',
      'normal': 'justify-content: normal;',
      'stretch': 'justify-content: stretch;',
    };
    return justifyMap[v] || null;
  },
  "self-": (v) => {
    const selfMap: Record<string, string> = {
      'auto': 'align-self: auto;',
      'start': 'align-self: flex-start;',
      'center': 'align-self: center;',
      'end': 'align-self: flex-end;',
      'stretch': 'align-self: stretch;',
      'baseline': 'align-self: baseline;',
    };
    return selfMap[v] || null;
  },
  "bg-": (v) => {
    if (COLOR_VALUE_MAP[v])
      return `background-color: ${COLOR_VALUE_MAP[v]};`;
    return `background-color: var(--tw-${v});`;
  },
  "bg-gradient-": (v) => {
    const directionMap: Record<string, string> = {
      'to-r': 'to right',
      'to-l': 'to left',
      'to-t': 'to top',
      'to-b': 'to bottom',
      'to-tr': 'to top right',
      'to-tl': 'to top left',
      'to-br': 'to bottom right',
      'to-bl': 'to bottom left',
    };
    return `background-image: linear-gradient(${directionMap[v] || 'to right'}, var(--tw-gradient-stops));`;
  },
  "from-": (v) => {
    if (COLOR_VALUE_MAP[v]) {
      return `
      --tw-gradient-from: ${COLOR_VALUE_MAP[v]};
      --tw-gradient-stops: var(--tw-gradient-from),
        var(--tw-gradient-to, ${COLOR_VALUE_MAP[v].replace('1)', '0)')});
    `;
    }

    return `
    --tw-gradient-from: rgb(var(--tw-${v}) / 1);
    --tw-gradient-stops: var(--tw-gradient-from),
      var(--tw-gradient-to, rgb(var(--tw-${v}) / 0));
  `;
  },

  "via-": (v) => {
    if (COLOR_VALUE_MAP[v]) {
      return `
      --tw-gradient-stops: var(--tw-gradient-from),
        ${COLOR_VALUE_MAP[v]},
        var(--tw-gradient-to, ${COLOR_VALUE_MAP[v].replace('1)', '0)')});
    `;
    }

    return `
    --tw-gradient-stops: var(--tw-gradient-from),
      rgb(var(--tw-${v}) / 1),
      var(--tw-gradient-to, rgb(var(--tw-${v}) / 0));
  `;
  },

  "to-": (v) => {
    if (COLOR_VALUE_MAP[v]) {
      return `--tw-gradient-to: ${COLOR_VALUE_MAP[v]};`;
    }

    return `--tw-gradient-to: rgb(var(--tw-${v}) / 1);`;
  },

  "w-": (v) => `width: ${sizeValue(v, 'vw')};`,
  "min-w-": (v) => `min-width: ${sizeValue(v, 'vw')};`,
  "max-w-": (v) => `max-width: ${sizeValue(v, 'vw')};`,
  "h-": (v) => `height: ${sizeValue(v, 'vh')};`,
  "min-h-": (v) => `min-height: ${sizeValue(v, 'vh')};`,
  "max-h-": (v) => `max-height: ${sizeValue(v, 'vh')};`,
  "p-": (v) => `padding: ${spacingValue(v)};`,
  "px-": (v) => `padding-left: ${spacingValue(v)}; padding-right: ${spacingValue(v)};`,
  "py-": (v) => `padding-top: ${spacingValue(v)}; padding-bottom: ${spacingValue(v)};`,
  "pt-": (v) => `padding-top: ${spacingValue(v)};`,
  "pb-": (v) => `padding-bottom: ${spacingValue(v)};`,
  "pl-": (v) => `padding-left: ${spacingValue(v)};`,
  "pr-": (v) => `padding-right: ${spacingValue(v)};`,
  "m-": (v) => `margin: ${spacingValue(v)};`,
  "mx-": (v) => `margin-left: ${spacingValue(v)}; margin-right: ${spacingValue(v)};`,
  "my-": (v) => `margin-top: ${spacingValue(v)}; margin-bottom: ${spacingValue(v)};`,
  "mt-": (v) => `margin-top: ${spacingValue(v)};`,
  "mb-": (v) => `margin-bottom: ${spacingValue(v)};`,
  "ml-": (v) => `margin-left: ${spacingValue(v)};`,
  "mr-": (v) => `margin-right: ${spacingValue(v)};`,
  "gap-": (v) => `gap: ${spacingValue(v)};`,
  "gap-x-": (v) => `column-gap: ${spacingValue(v)};`,
  "gap-y-": (v) => `row-gap: ${spacingValue(v)};`,
  "space-x-": (v) => `--tw-space-x-reverse: 0; margin-right: calc(${spacingValue(v)} * calc(1 - var(--tw-space-x-reverse))); margin-left: calc(${spacingValue(v)} * var(--tw-space-x-reverse));`,
  "space-y-": (v) => `--tw-space-y-reverse: 0; margin-bottom: calc(${spacingValue(v)} * calc(1 - var(--tw-space-y-reverse))); margin-top: calc(${spacingValue(v)} * var(--tw-space-y-reverse));`,
  "border-": (v) => {
    if (/^(0|2|4|8)$/.test(v)) return `border-width: ${v === "0" ? "0" : v}px;`;
    if (COLOR_VALUE_MAP[v])
      return `border-color: ${COLOR_VALUE_MAP[v]};`;
    return `border-color: var(--tw-border-${v});`;
  },
  "border-t-": (v) => `border-top-width: ${v === "0" ? "0" : v}px;`,
  "border-b-": (v) => `border-bottom-width: ${v === "0" ? "0" : v}px;`,
  "border-l-": (v) => `border-left-width: ${v === "0" ? "0" : v}px;`,
  "border-r-": (v) => `border-right-width: ${v === "0" ? "0" : v}px;`,
  "rounded-": (v) => `border-radius: var(--tw-rounded-${v});`,
  "rounded-t-": (v) => `border-top-left-radius: var(--tw-rounded-${v}); border-top-right-radius: var(--tw-rounded-${v});`,
  "rounded-b-": (v) => `border-bottom-left-radius: var(--tw-rounded-${v}); border-bottom-right-radius: var(--tw-rounded-${v});`,
  "rounded-l-": (v) => `border-top-left-radius: var(--tw-rounded-${v}); border-bottom-left-radius: var(--tw-rounded-${v});`,
  "rounded-r-": (v) => `border-top-right-radius: var(--tw-rounded-${v}); border-bottom-right-radius: var(--tw-rounded-${v});`,
  "rounded-tl-": (v) => `border-top-left-radius: var(--tw-rounded-${v});`,
  "rounded-tr-": (v) => `border-top-right-radius: var(--tw-rounded-${v});`,
  "rounded-bl-": (v) => `border-bottom-left-radius: var(--tw-rounded-${v});`,
  "rounded-br-": (v) => `border-bottom-right-radius: var(--tw-rounded-${v});`,
  "font-": (v) => `font-weight: var(--tw-font-${v});`,
  "leading-": (v) => `line-height: var(--tw-leading-${v});`,
  "tracking-": (v) => `letter-spacing: var(--tw-tracking-${v});`,
  "shadow-": (v) => `box-shadow: var(--tw-shadow-${v});`,
  "opacity-": (v) => `opacity: ${Number(v) / 100};`,
  "z-": (v) => `z-index: ${v};`,
  "grid-cols-": (v) => v === 'none' ?
    `grid-template-columns: none;` :
    `grid-template-columns: repeat(${v}, minmax(0, 1fr));`,
  "overflow-": (v) => {
    if (v.startsWith("x-")) return `overflow-x: ${v.slice(2)};`;
    if (v.startsWith("y-")) return `overflow-y: ${v.slice(2)};`;
    return `overflow: ${v};`;
  },
  "transition-": (v) => `transition-property: var(--tw-transition-${v}); transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;`,
};

// ─── Registry class ───────────────────────────────────────────────────────────

export class TailwindRuleRegistry {

  // ── Validation ──────────────────────────────────────────────────────────────

  /** Master list — every prefix Tailwind can produce and how to validate its value. */
  static ALL_RULES: TailwindPrefixRule[] = [
    // TEXT
    { prefix: "text-", pattern: TEXT_SIZE_PATTERN },
    { prefix: "text-", pattern: COLOR_PATTERN },
    { prefix: "text-", pattern: /^(center|right|left|justify|start|end)$/ },
    // BACKGROUND
    { prefix: "bg-", pattern: COLOR_PATTERN },
    // GRADIENT
    { prefix: "bg-gradient-", pattern: GRADIENT_DIRECTION },
    { prefix: "from-", pattern: COLOR_PATTERN },
    { prefix: "via-", pattern: COLOR_PATTERN },
    { prefix: "to-", pattern: COLOR_PATTERN },
    // FLEX
    { prefix: "flex-", pattern: /^(row|row-reverse|col|col-reverse|wrap|wrap-reverse|nowrap|1|auto|initial|none)$/ },
    // ITEMS (align-items)
    { prefix: "items-", pattern: /^(start|center|end|baseline|stretch)$/ },
    // JUSTIFY (justify-content) 
    { prefix: "justify-", pattern: /^(start|center|end|between|around|evenly|normal|stretch)$/ },
    // SELF (align-self)
    { prefix: "self-", pattern: /^(auto|start|center|end|stretch|baseline)$/ },
    // WIDTH
    { prefix: "w-", pattern: WIDTH_PATTERN },
    { prefix: "min-w-", pattern: WIDTH_PATTERN },
    { prefix: "max-w-", pattern: WIDTH_PATTERN },
    // HEIGHT
    { prefix: "h-", pattern: WIDTH_PATTERN },
    { prefix: "min-h-", pattern: WIDTH_PATTERN },
    { prefix: "max-h-", pattern: WIDTH_PATTERN },
    // BORDER
    { prefix: "border-", pattern: BORDER_SIZE_PATTERN },
    { prefix: "border-", pattern: COLOR_PATTERN },
    { prefix: "border-t-", pattern: BORDER_SIZE_PATTERN },
    { prefix: "border-b-", pattern: BORDER_SIZE_PATTERN },
    { prefix: "border-l-", pattern: BORDER_SIZE_PATTERN },
    { prefix: "border-r-", pattern: BORDER_SIZE_PATTERN },
    // ROUNDED
    { prefix: "rounded", pattern: /^$/ },
    { prefix: "rounded-", pattern: /^(none|sm|md|lg|xl|2xl|3xl|full)$/ },
    { prefix: "rounded-t-", pattern: /^(none|sm|md|lg|xl|2xl|3xl|full)$/ },
    { prefix: "rounded-b-", pattern: /^(none|sm|md|lg|xl|2xl|3xl|full)$/ },
    { prefix: "rounded-l-", pattern: /^(none|sm|md|lg|xl|2xl|3xl|full)$/ },
    { prefix: "rounded-r-", pattern: /^(none|sm|md|lg|xl|2xl|3xl|full)$/ },
    { prefix: "rounded-tl-", pattern: /^(none|sm|md|lg|xl|2xl|3xl|full)$/ },
    { prefix: "rounded-tr-", pattern: /^(none|sm|md|lg|xl|2xl|3xl|full)$/ },
    { prefix: "rounded-bl-", pattern: /^(none|sm|md|lg|xl|2xl|3xl|full)$/ },
    { prefix: "rounded-br-", pattern: /^(none|sm|md|lg|xl|2xl|3xl|full)$/ },
    // FONT
    { prefix: "font-", pattern: keywordsToRegex(FONT_WEIGHT_KEYWORDS) },
    // LINE-HEIGHT
    { prefix: "leading-", pattern: /^(none|tight|snug|normal|relaxed|loose|3|4|5|6|7|8|9|10)$/ },
    // TRACKING
    { prefix: "tracking-", pattern: /^(tighter|tight|normal|wide|wider|widest)$/ },
    // SHADOW
    { prefix: "shadow", pattern: /^$/ },
    { prefix: "shadow-", pattern: /^(sm|md|lg|xl|2xl|inner|none)$/ },
    // OPACITY
    { prefix: "opacity-", pattern: OPACITY_PATTERN },
    // Z-INDEX
    { prefix: "z-", pattern: Z_INDEX_PATTERN },
    // GRID
    { prefix: "grid-cols-", pattern: GRID_COLS_PATTERN },
    // OVERFLOW
    { prefix: "overflow-", pattern: /^(auto|hidden|visible|scroll|x-auto|x-hidden|x-visible|x-scroll|y-auto|y-hidden|y-visible|y-scroll)$/ },
    // TRANSITION
    { prefix: "transition", pattern: /^$/ },
    { prefix: "transition-", pattern: /^(none|all|colors|opacity|shadow|transform)$/ },
    // POSITION
    { prefix: "position-", pattern: /^(none)$/ },
    // GAP
    { prefix: "gap-", pattern: POSITIVE_SPACING_PATTERN },
    { prefix: "gap-x-", pattern: POSITIVE_SPACING_PATTERN },
    { prefix: "gap-y-", pattern: POSITIVE_SPACING_PATTERN },
    // SPACE
    { prefix: "space-x-", pattern: SPACING_PATTERN },
    { prefix: "space-y-", pattern: SPACING_PATTERN },
    // MARGIN
    { prefix: "m-", pattern: SPACING_PATTERN },
    { prefix: "mx-", pattern: SPACING_PATTERN },
    { prefix: "my-", pattern: SPACING_PATTERN },
    { prefix: "mt-", pattern: SPACING_PATTERN },
    { prefix: "mb-", pattern: SPACING_PATTERN },
    { prefix: "ml-", pattern: SPACING_PATTERN },
    { prefix: "mr-", pattern: SPACING_PATTERN },
    // PADDING
    { prefix: "p-", pattern: POSITIVE_SPACING_PATTERN },
    { prefix: "px-", pattern: POSITIVE_SPACING_PATTERN },
    { prefix: "py-", pattern: POSITIVE_SPACING_PATTERN },
    { prefix: "pt-", pattern: POSITIVE_SPACING_PATTERN },
    { prefix: "pb-", pattern: POSITIVE_SPACING_PATTERN },
    { prefix: "pl-", pattern: POSITIVE_SPACING_PATTERN },
    { prefix: "pr-", pattern: POSITIVE_SPACING_PATTERN },
  ];

  /** Pre-grouped by prefix for O(1) bucket lookup. */
  private static rulesByPrefix: Map<string, TailwindPrefixRule[]> = (() => {
    const map = new Map<string, TailwindPrefixRule[]>();
    for (const rule of TailwindRuleRegistry.ALL_RULES) {
      if (!map.has(rule.prefix)) map.set(rule.prefix, []);
      map.get(rule.prefix)!.push(rule);
    }
    return map;
  })();

  /**
   * Returns the matching rules for a given prefix, optionally filtered
   * to only the one whose pattern matches `value`.
   * Results are cached so repeated calls for the same prefix+value are free.
   */
  static findRulesForPrefix(prefix: string, value?: string): TailwindPrefixRule[] {
    const cacheKey = value !== undefined ? `${prefix}:${value}` : prefix;

    const cached = ruleLookupCache.get(cacheKey);
    if (cached) return cached;

    const bucket = this.rulesByPrefix.get(prefix);
    if (!bucket) return [];

    let result: TailwindPrefixRule[];

    if (value === undefined) {
      result = bucket;
    } else if (bucket.length === 1) {
      result = bucket[0].pattern.test(value) ? bucket : [];
    } else {
      const match = bucket.find((r) => r.pattern.test(value));
      result = match ? [match] : [];
    }

    ruleLookupCache.put(cacheKey, result);
    return result;
  }

  // ── CSS declaration resolution ──────────────────────────────────────────────

  /**
   * Given a prefix and value, returns the complete CSS declaration string
   * (e.g. "padding-top: 1rem;") or null if the combination is not recognised.
   *
   * Handles three cases in order:
   *   1. Arbitrary value  →  looks up the CSS property for the prefix and
   *                           assigns the raw bracketed value directly.
   *   2. Bare keyword     →  prefix is empty, value IS the class name.
   *                           Looks up in BARE_KEYWORD_DECLARATIONS.
   *   3. Prefixed utility →  delegates to PREFIX_DECLARATION_RESOLVERS.
   */
  static resolveCssDeclaration(prefix: string, value: string): string | null {
    // 1. Arbitrary value: text-[#fff], w-[calc(100%-2rem)], …
    if (value.startsWith("[") && value.endsWith("]")) {
      const raw = value.slice(1, -1);
      const prop = PREFIX_TO_CSS_PROPERTY[prefix];
      return prop ? `${prop}: ${raw};` : null;
    }

    // 2. Bare keyword (prefix is "")
    if (prefix === "") {
      return BARE_KEYWORD_DECLARATIONS[value] ?? null;
    }

    // 3. Prefixed utility
    const resolver = PREFIX_DECLARATION_RESOLVERS[prefix];
    return resolver ? resolver(value) : null;
  }

  // ── Variant wrapper resolution ──────────────────────────────────────────────

  /**
   * Given the variant arrays from a TailwindClassConfig, returns the CSS
   * wrappers (media query, container query, pseudo selector, theme wrapper)
   * that need to surround the base rule.
   *
   * The service composes these around the declaration — this method only
   * decides *what* they are.
   */
  static resolveVariantWrappers(
    queries: string[],
    states: string[],
    theme: string[],
  ): VariantWrappers {
    let mediaQuery: string | null = null;
    let containerQuery: string | null = null;

    for (const q of queries) {
      if (q.startsWith("@")) {
        const bp = q.slice(1);
        containerQuery = `@container (min-width: ${BREAKPOINT_MAP[bp] ?? "0px"})`;
      } else if (BREAKPOINT_MAP[q]) {
        mediaQuery = `@media (min-width: ${BREAKPOINT_MAP[q]})`;
      }
    }

    let pseudoSelector: string | null = null;
    for (const s of states) {
      const pseudo = PSEUDO_MAP[s];
      if (pseudo) pseudoSelector = (pseudoSelector ?? "") + pseudo;
    }

    let themeWrapper: string | null = null;
    if (theme.includes("dark")) {
      themeWrapper = "@media (prefers-color-scheme: dark)";
    }

    return { pseudoSelector, mediaQuery, containerQuery, themeWrapper };
  }
}