// ====================== TYPES ======================
export interface ElementStyles {
    // Spacing
    pt?: string; pb?: string; pl?: string; pr?: string;
    mt?: string; mb?: string; ml?: string; mr?: string;
    // Typography
    fontSize?: string;
    fontWeight?: string;
    textColor?: string;
    textAlign?: string;
    lineHeight?: string;
    letterSpacing?: string;
    // Background
    bgColor?: string;
    bgGradient?: string;
    bgImage?: string;
    bgSize?: string;
    bgPosition?: string;
    opacity?: string;
    // Border
    borderWidth?: string;
    borderColor?: string;
    borderRadius?: string;
    borderStyle?: string;
    // Dimensions
    width?: string;
    height?: string;
    minWidth?: string;
    maxWidth?: string;
    minHeight?: string;
    maxHeight?: string;
    // Shadow
    shadow?: string;
    // Display
    display?: string;
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
    gap?: string;
    gridCols?: string;
    // Position
    position?: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    zIndex?: string;
    // Effects
    transform?: string;
    transition?: string;
    animation?: string;
    // Overflow
    overflow?: string;
    overflowX?: string;
    overflowY?: string;
}

export interface BaseElement {
    id: string;
    type: string;
    styles: ElementStyles;
}

export interface HeadingElement extends BaseElement {
    type: 'heading';
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    content: string;
}

export interface TextElement extends BaseElement {
    type: 'text';
    content: string;
}

export interface ImageElement extends BaseElement {
    type: 'image';
    src: string;
    alt: string;
}

export interface ButtonElement extends BaseElement {
    type: 'button';
    text: string;
    href: string;
}

export interface ContainerElement extends BaseElement {
    type: 'container' | 'grid' | 'hero';
    children: Element[];
}

export interface ListElement extends BaseElement {
    type: 'list';
    listType: 'ul' | 'ol';
    items: string[];
}

export type Element = HeadingElement | TextElement | ImageElement | ButtonElement | ContainerElement | ListElement;

// ====================== ELEMENT FACTORY ======================
export class ElementFactory {
    static create(type: string): Element {
        const id = `el_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        switch (type) {
            case 'heading':
                return {
                    id,
                    type: 'heading',
                    tag: 'h1',
                    content: 'Your Heading',
                    styles: {
                        fontSize: '5xl',
                        fontWeight: 'bold',
                        textColor: 'gray-900',
                        mb: '4',
                    },
                };

            case 'text':
                return {
                    id,
                    type: 'text',
                    content: 'Your paragraph text goes here. Click to edit and customize the styling.',
                    styles: {
                        fontSize: 'base',
                        textColor: 'gray-700',
                        mb: '4',
                    },
                };

            case 'image':
                return {
                    id,
                    type: 'image',
                    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
                    alt: 'Portfolio image',
                    styles: {
                        width: 'full',
                        borderRadius: 'lg',
                        shadow: 'lg',
                        mb: '4',
                    },
                };

            case 'button':
                return {
                    id,
                    type: 'button',
                    text: 'Click Me',
                    href: '#',
                    styles: {
                        bgColor: 'blue-600',
                        textColor: 'white',
                        fontSize: 'base',
                        fontWeight: 'semibold',
                        pt: '3',
                        pb: '3',
                        pl: '8',
                        pr: '8',
                        borderRadius: 'lg',
                        display: 'inline-block',
                    },
                };

            case 'container':
                return {
                    id,
                    type: 'container',
                    children: [],
                    styles: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4',
                        pt: '6',
                        pb: '6',
                        pl: '6',
                        pr: '6',
                        bgColor: 'white',
                        borderRadius: 'lg',
                        shadow: 'md',
                    },
                };

            case 'grid':
                return {
                    id,
                    type: 'grid',
                    children: [],
                    styles: {
                        display: 'grid',
                        gridCols: '3',
                        gap: '6',
                        pt: '6',
                        pb: '6',
                        pl: '6',
                        pr: '6',
                    },
                };

            case 'hero':
                return {
                    id,
                    type: 'hero',
                    children: [],
                    styles: {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgGradient: 'from-purple-600 to-blue-600',
                        textColor: 'white',
                        pt: '24',
                        pb: '24',
                        pl: '8',
                        pr: '8',
                    },
                };

            case 'list':
                return {
                    id,
                    type: 'list',
                    listType: 'ul',
                    items: ['First item', 'Second item', 'Third item'],
                    styles: {
                        textColor: 'gray-700',
                        pl: '5',
                        mb: '4',
                    },
                };

            default:
                return {
                    id,
                    type: 'text',
                    content: 'Unknown element',
                    styles: {
                        fontSize: 'base',
                        textColor: 'gray-700',
                        mb: '4',
                    },
                };
        }
    }
}

// ====================== TAILWIND UTILITIES ======================
export const TAILWIND_VALUES = {
    spacing: {
        '0': '0',
        '0.5': '0.125rem',
        '1': '0.25rem',
        '1.5': '0.375rem',
        '2': '0.5rem',
        '2.5': '0.625rem',
        '3': '0.75rem',
        '3.5': '0.875rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '11': '2.75rem',
        '12': '3rem',
        '14': '3.5rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '28': '7rem',
        '32': '8rem',
        '36': '9rem',
        '40': '10rem',
        '44': '11rem',
        '48': '12rem',
        '52': '13rem',
        '56': '14rem',
        '60': '15rem',
        '64': '16rem',
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
    },
    fontSize: {
        'xs': 'text-xs',
        'sm': 'text-sm',
        'base': 'text-base',
        'lg': 'text-lg',
        'xl': 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
        '5xl': 'text-5xl',
        '6xl': 'text-6xl',
        '7xl': 'text-7xl',
        '8xl': 'text-8xl',
        '9xl': 'text-9xl',
    },
    fontWeight: {
        'thin': 'font-thin',
        'extralight': 'font-extralight',
        'light': 'font-light',
        'normal': 'font-normal',
        'medium': 'font-medium',
        'semibold': 'font-semibold',
        'bold': 'font-bold',
        'extrabold': 'font-extrabold',
        'black': 'font-black',
    },
    lineHeight: {
        'none': 'leading-none',
        'tight': 'leading-tight',
        'snug': 'leading-snug',
        'normal': 'leading-normal',
        'relaxed': 'leading-relaxed',
        'loose': 'leading-loose',
    },
    letterSpacing: {
        'tighter': 'tracking-tighter',
        'tight': 'tracking-tight',
        'normal': 'tracking-normal',
        'wide': 'tracking-wide',
        'wider': 'tracking-wider',
        'widest': 'tracking-widest',
    },
    borderRadius: {
        'none': 'rounded-none',
        'sm': 'rounded-sm',
        'DEFAULT': 'rounded',
        'md': 'rounded-md',
        'lg': 'rounded-lg',
        'xl': 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
        'full': 'rounded-full',
    },
    shadow: {
        'none': 'shadow-none',
        'sm': 'shadow-sm',
        'DEFAULT': 'shadow',
        'md': 'shadow-md',
        'lg': 'shadow-lg',
        'xl': 'shadow-xl',
        '2xl': 'shadow-2xl',
        'inner': 'shadow-inner',
    },
    opacity: {
        '0': 'opacity-0',
        '5': 'opacity-5',
        '10': 'opacity-10',
        '20': 'opacity-20',
        '25': 'opacity-25',
        '30': 'opacity-30',
        '40': 'opacity-40',
        '50': 'opacity-50',
        '60': 'opacity-60',
        '70': 'opacity-70',
        '75': 'opacity-75',
        '80': 'opacity-80',
        '90': 'opacity-90',
        '95': 'opacity-95',
        '100': 'opacity-100',
    },
};

export const COLOR_PALETTE = [
    { name: 'Transparent', value: 'transparent', class: 'bg-transparent', border: true },
    { name: 'White', value: 'white', class: 'bg-white' },
    { name: 'Black', value: 'black', class: 'bg-black' },
    { name: 'Gray 50', value: 'gray-50', class: 'bg-gray-50' },
    { name: 'Gray 100', value: 'gray-100', class: 'bg-gray-100' },
    { name: 'Gray 200', value: 'gray-200', class: 'bg-gray-200' },
    { name: 'Gray 300', value: 'gray-300', class: 'bg-gray-300' },
    { name: 'Gray 400', value: 'gray-400', class: 'bg-gray-400' },
    { name: 'Gray 500', value: 'gray-500', class: 'bg-gray-500' },
    { name: 'Gray 600', value: 'gray-600', class: 'bg-gray-600' },
    { name: 'Gray 700', value: 'gray-700', class: 'bg-gray-700' },
    { name: 'Gray 800', value: 'gray-800', class: 'bg-gray-800' },
    { name: 'Gray 900', value: 'gray-900', class: 'bg-gray-900' },
    { name: 'Red 400', value: 'red-400', class: 'bg-red-400' },
    { name: 'Red 500', value: 'red-500', class: 'bg-red-500' },
    { name: 'Red 600', value: 'red-600', class: 'bg-red-600' },
    { name: 'Orange 400', value: 'orange-400', class: 'bg-orange-400' },
    { name: 'Orange 500', value: 'orange-500', class: 'bg-orange-500' },
    { name: 'Orange 600', value: 'orange-600', class: 'bg-orange-600' },
    { name: 'Yellow 400', value: 'yellow-400', class: 'bg-yellow-400' },
    { name: 'Yellow 500', value: 'yellow-500', class: 'bg-yellow-500' },
    { name: 'Yellow 600', value: 'yellow-600', class: 'bg-yellow-600' },
    { name: 'Green 400', value: 'green-400', class: 'bg-green-400' },
    { name: 'Green 500', value: 'green-500', class: 'bg-green-500' },
    { name: 'Green 600', value: 'green-600', class: 'bg-green-600' },
    { name: 'Blue 400', value: 'blue-400', class: 'bg-blue-400' },
    { name: 'Blue 500', value: 'blue-500', class: 'bg-blue-500' },
    { name: 'Blue 600', value: 'blue-600', class: 'bg-blue-600' },
    { name: 'Indigo 400', value: 'indigo-400', class: 'bg-indigo-400' },
    { name: 'Indigo 500', value: 'indigo-500', class: 'bg-indigo-500' },
    { name: 'Indigo 600', value: 'indigo-600', class: 'bg-indigo-600' },
    { name: 'Purple 400', value: 'purple-400', class: 'bg-purple-400' },
    { name: 'Purple 500', value: 'purple-500', class: 'bg-purple-500' },
    { name: 'Purple 600', value: 'purple-600', class: 'bg-purple-600' },
    { name: 'Pink 400', value: 'pink-400', class: 'bg-pink-400' },
    { name: 'Pink 500', value: 'pink-500', class: 'bg-pink-500' },
    { name: 'Pink 600', value: 'pink-600', class: 'bg-pink-600' },
    { name: 'Cyan 400', value: 'cyan-400', class: 'bg-cyan-400' },
    { name: 'Cyan 500', value: 'cyan-500', class: 'bg-cyan-500' },
    { name: 'Cyan 600', value: 'cyan-600', class: 'bg-cyan-600' },
    { name: 'Teal 400', value: 'teal-400', class: 'bg-teal-400' },
    { name: 'Teal 500', value: 'teal-500', class: 'bg-teal-500' },
    { name: 'Teal 600', value: 'teal-600', class: 'bg-teal-600' },
];

export const GRADIENT_PRESETS = [
    { name: 'Sunset', value: 'from-orange-500 via-red-500 to-pink-500' },
    { name: 'Ocean', value: 'from-blue-500 via-cyan-500 to-teal-500' },
    { name: 'Forest', value: 'from-green-500 via-emerald-500 to-teal-500' },
    { name: 'Purple Dream', value: 'from-purple-500 via-pink-500 to-red-500' },
    { name: 'Sky', value: 'from-blue-400 via-blue-500 to-blue-600' },
    { name: 'Fire', value: 'from-yellow-400 via-orange-500 to-red-600' },
    { name: 'Mint', value: 'from-green-300 via-teal-400 to-cyan-500' },
    { name: 'Royal', value: 'from-indigo-500 via-purple-500 to-pink-500' },
    { name: 'Dusk', value: 'from-pink-300 via-purple-400 to-indigo-500' },
    { name: 'Lemon', value: 'from-yellow-300 via-green-400 to-teal-500' },
    { name: 'Rose', value: 'from-red-400 via-pink-500 to-purple-500' },
    { name: 'Aqua', value: 'from-cyan-300 via-blue-400 to-indigo-500' },
];