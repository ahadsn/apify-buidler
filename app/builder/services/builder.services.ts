import { Element, ElementStyles, ContainerElement } from '../elements/builder.elements';

export class BuilderService {
    /**
     * Find an element by ID in a tree structure
     */
    static findElement(id: string, elements: Element[]): Element | null {
        for (const el of elements) {
            if (el.id === id) return el;
            if ('children' in el && el.children) {
                const found = this.findElement(id, el.children);
                if (found) return found;
            }
        }
        return null;
    }

    /**
     * Update an element by ID recursively
     */
    static updateElement(elements: Element[], id: string, updates: Partial<Element>): Element[] {
        return elements.map(el => {
            if (el.id === id) {
                return { ...el, ...updates } as Element;
            }
            if ('children' in el && el.children) {
                return { ...el, children: this.updateElement(el.children, id, updates) } as Element;
            }
            return el;
        });
    }

    /**
     * Update styles for an element
     */
    static updateElementStyles(elements: Element[], id: string, styleUpdates: Partial<ElementStyles>): Element[] {
        const element = this.findElement(id, elements);
        if (!element) return elements;

        return this.updateElement(elements, id, {
            styles: { ...element.styles, ...styleUpdates }
        } as any);
    }

    /**
     * Add element to root or parent
     */
    static addElement(elements: Element[], newElement: Element, parentId?: string): Element[] {
        if (!parentId) {
            return [...elements, newElement];
        }

        return elements.map(el => {
            if (el.id === parentId && 'children' in el) {
                return { ...el, children: [...el.children, newElement] } as Element;
            }
            if ('children' in el && el.children) {
                return { ...el, children: this.addElement(el.children, newElement, parentId) } as Element;
            }
            return el;
        });
    }

    /**
     * Delete element by ID
     */
    static deleteElement(elements: Element[], id: string): Element[] {
        return elements.filter(el => {
            if (el.id === id) return false;
            if ('children' in el && el.children) {
                const container = el as ContainerElement;
                return true; // Keep the element but filter its children
            }
            return true;
        }).map(el => {
            if ('children' in el && el.children) {
                return { ...el, children: this.deleteElement(el.children, id) } as Element;
            }
            return el;
        });
    }

    /**
     * Duplicate element with new IDs
     */
    static duplicateElement(element: Element): Element {
        const newId = `el_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        if ('children' in element && element.children) {
            const container = element as ContainerElement;
            return {
                ...container,
                id: newId,
                children: container.children.map(child => this.duplicateElement(child))
            } as Element;
        }

        return { ...element, id: newId } as Element;
    }

    /**
     * Move element up or down
     */
    static moveElement(elements: Element[], id: string, direction: 'up' | 'down'): Element[] {
        const idx = elements.findIndex(el => el.id === id);

        if (idx === -1) {
            return elements.map(el => {
                if ('children' in el && el.children) {
                    return { ...el, children: this.moveElement(el.children, id, direction) } as Element;
                }
                return el;
            });
        }

        const newIdx = direction === 'up' ? idx - 1 : idx + 1;
        if (newIdx < 0 || newIdx >= elements.length) return elements;

        const newElements = [...elements];
        [newElements[idx], newElements[newIdx]] = [newElements[newIdx], newElements[idx]];
        return newElements;
    }

    /**
     * Convert styles object to Tailwind classes
     */
    static stylesToTailwind(styles: ElementStyles): string {
        const classes: string[] = [];

        // Padding
        if (styles.pt) classes.push(`pt-${styles.pt}`);
        if (styles.pb) classes.push(`pb-${styles.pb}`);
        if (styles.pl) classes.push(`pl-${styles.pl}`);
        if (styles.pr) classes.push(`pr-${styles.pr}`);

        // Margin
        if (styles.mt) classes.push(`mt-${styles.mt}`);
        if (styles.mb) classes.push(`mb-${styles.mb}`);
        if (styles.ml) classes.push(`ml-${styles.ml}`);
        if (styles.mr) classes.push(`mr-${styles.mr}`);

        // Typography
        if (styles.fontSize) classes.push(`text-${styles.fontSize}`);
        if (styles.fontWeight) classes.push(`font-${styles.fontWeight}`);
        if (styles.textColor) classes.push(`text-${styles.textColor}`);
        if (styles.textAlign) classes.push(`text-${styles.textAlign}`);
        if (styles.lineHeight) classes.push(`leading-${styles.lineHeight}`);
        if (styles.letterSpacing) classes.push(`tracking-${styles.letterSpacing}`);

        // Background
        if (styles.bgColor) classes.push(`bg-${styles.bgColor}`);
        if (styles.bgGradient) classes.push(`bg-gradient-to-r ${styles.bgGradient}`);
        if (styles.bgImage) classes.push(`bg-[url('${styles.bgImage}')]`);
        if (styles.bgSize) classes.push(`bg-${styles.bgSize}`);
        if (styles.bgPosition) classes.push(`bg-${styles.bgPosition}`);
        if (styles.opacity) classes.push(`opacity-${styles.opacity}`);

        // Border
        if (styles.borderWidth) classes.push(`border-${styles.borderWidth}`);
        if (styles.borderColor) classes.push(`border-${styles.borderColor}`);
        if (styles.borderRadius) classes.push(`rounded-${styles.borderRadius}`);
        if (styles.borderStyle) classes.push(`border-${styles.borderStyle}`);

        // Dimensions
        if (styles.width) classes.push(`w-${styles.width}`);
        if (styles.height) classes.push(`h-${styles.height}`);
        if (styles.minWidth) classes.push(`min-w-${styles.minWidth}`);
        if (styles.maxWidth) classes.push(`max-w-${styles.maxWidth}`);
        if (styles.minHeight) classes.push(`min-h-${styles.minHeight}`);
        if (styles.maxHeight) classes.push(`max-h-${styles.maxHeight}`);

        // Shadow
        if (styles.shadow) classes.push(`shadow-${styles.shadow}`);

        // Display & Layout
        if (styles.display === 'flex') {
            classes.push('flex');
            if (styles.flexDirection) classes.push(`flex-${styles.flexDirection}`);
            if (styles.justifyContent) classes.push(`justify-${styles.justifyContent}`);
            if (styles.alignItems) classes.push(`items-${styles.alignItems}`);
        } else if (styles.display === 'grid') {
            classes.push('grid');
            if (styles.gridCols) classes.push(`grid-cols-${styles.gridCols} md:grid-cols-${styles.gridCols}`);
        } else if (styles.display === 'inline-block') {
            classes.push('inline-block');
        } else if (styles.display === 'block') {
            classes.push('block');
        } else if (styles.display === 'inline') {
            classes.push('inline');
        }

        if (styles.gap) classes.push(`gap-${styles.gap}`);

        // Position
        if (styles.position) classes.push(styles.position);
        if (styles.top) classes.push(`top-${styles.top}`);
        if (styles.right) classes.push(`right-${styles.right}`);
        if (styles.bottom) classes.push(`bottom-${styles.bottom}`);
        if (styles.left) classes.push(`left-${styles.left}`);
        if (styles.zIndex) classes.push(`z-${styles.zIndex}`);

        // Effects
        if (styles.transform) classes.push(styles.transform);
        if (styles.transition) classes.push(`transition-${styles.transition}`);

        // Overflow
        if (styles.overflow) classes.push(`overflow-${styles.overflow}`);
        if (styles.overflowX) classes.push(`overflow-x-${styles.overflowX}`);
        if (styles.overflowY) classes.push(`overflow-y-${styles.overflowY}`);

        return classes.join(' ');
    }

    /**
     * Render element to HTML string
     */
    static renderElementToHTML(el: Element): string {
        const className = this.stylesToTailwind(el.styles);

        switch (el.type) {
            case 'heading':
                return `<${el.tag} class="${className}">${el.content}</${el.tag}>`;
            case 'text':
                return `<p class="${className}">${el.content}</p>`;
            case 'image':
                return `<img src="${el.src}" alt="${el.alt}" class="${className}" />`;
            case 'button':
                return `<a href="${el.href}" class="${className} hover:opacity-80 transition">${el.text}</a>`;
            case 'list':
                const items = el.items.map(item => `<li class="mb-2">${item}</li>`).join('');
                return `<${el.listType} class="${className} list-disc">${items}</${el.listType}>`;
            case 'container':
            case 'grid':
            case 'hero':
                const children = el.children.map(child => this.renderElementToHTML(child)).join('\n    ');
                return `<div class="${className}">\n    ${children}\n  </div>`;
            default:
                return '';
        }
    }

    /**
     * Export full HTML document
     */
    static exportHTML(elements: Element[], background: string, maxWidth: string, padding: string): void {
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { 
      background-color: ${background};
    }
  </style>
</head>
<body>
  <div class="mx-auto" style="max-width: ${maxWidth}; padding: ${padding};">
    ${elements.map(el => this.renderElementToHTML(el)).join('\n    ')}
  </div>
</body>
</html>`;

        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'portfolio.html';
        a.click();
        URL.revokeObjectURL(url);
    }
}