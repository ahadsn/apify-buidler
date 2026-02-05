import { BuilderActions } from '../../actions/builder.actions';
import { PageElement, ContainerElement } from '../../elements/types/pageElement.types';
import { ViewType } from '../../store/builder.store';
import {  JitCssCompiler } from '../css/jitCssCompiler.service';
export interface config {
  theme: string[],
  key: string,
  queries: string[],
  states: string[],
  prefix: string,
  value: string,
}

//cache instances

let usedClasses:string[]=[];

export class BuilderService {

  /**
   * Find an element by ID in a tree structure
   */
  static findElement(id: string, elements: PageElement[]): PageElement | null {



    for (const el of elements) {
      if (el.id === id) return el;
      if ('children' in el && el.children) {
        const found = this.findElement(id, el.children);
        if (found) {

          return found;
        }
      }
    }
    return null;
  }

  /**
   * Update an element by ID recursively
   */
  static updateElement(elements: PageElement[], id: string, updates: Partial<PageElement>): PageElement[] {
    return elements.map(el => {
      if (el.id === id) {
        return { ...el, ...updates } as PageElement;
      }
      if ('children' in el && el.children) {
        return { ...el, children: this.updateElement(el.children, id, updates) } as PageElement;
      }
      return el;
    });
  }


  /**
* getquery
*/
  static getQuery(
    view: ViewType[]
  ) {
    let query: string[] = [];

    query = [];

    if (view.includes('smallPhone')) {
      query.push('');
    }

    if (view.includes('mobile')) {
      query.push('sm');
    }

    if (view.includes('tablet')) {
      query.push('md');
    }

    if (view.includes('laptop')) {
      query.push('lg');
    }

    if (view.includes('desktop')) {
      query.push('xl');
    }

    return query;
  }
  /*
   * css active style
   * 
   */
  static getActiveStyle(
    parsedArray: config[],
    input: { queries: string[]; states: string[]; key: string, theme: string[] }
  ): {
    result: boolean;
    res: { prefix: string; value: string };
  } {
    const match = parsedArray.find(
      c =>
        this.getKey(c.prefix, c.value) === input.key &&
        this.shallowArrayEqual(c.queries, input.queries) &&
        this.shallowArrayEqual(c.states, input.states)
    );

    if (!match) {
      return { result: false, res: { prefix: '', value: '' } };
    }

    const res: { prefix: string; value: string } = { prefix: '', value: '' };

    match.prefix ? res.prefix = match.prefix : '';
    match.value ? res.value = match.value : '';

    return Object.keys(res).length
      ? { result: true, res }
      : { result: false, res: { prefix: '', value: '' } };
  }


  static shallowArrayEqual(a: string[], b: string[]) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => v === b[i]);
  }

  /**
      * css get key
      */
  static getKey(prefix: string, value: string,) {
    let key;
    if (prefix.length != 0) {
      key = prefix;
    } else {
      key = value
    }
    return key;

  }



  /**
   * Add element to root or parent
   */
  static addElement(elements: PageElement[], newElement: PageElement, parentId?: string): PageElement[] {
    if (!parentId) {
      return [...elements, newElement];
    }

    return elements.map(el => {
      if (el.id === parentId && 'children' in el) {
        return { ...el, children: [...el.children, newElement] } as PageElement;
      }
      if ('children' in el && el.children) {
        return { ...el, children: this.addElement(el.children, newElement, parentId) } as PageElement;
      }
      return el;
    });
  }

  /**
   * Delete element by ID
   */
  static deleteElement(elements: PageElement[], id: string): PageElement[] {
    return elements.filter(el => {
      if (el.id === id) return false;
      if ('children' in el && el.children) {
        const container = el as ContainerElement;
        return true; // Keep the element but filter its children
      }
      return true;
    }).map(el => {
      if ('children' in el && el.children) {
        return { ...el, children: this.deleteElement(el.children, id) } as PageElement;
      }
      return el;
    });
  }

  /**
   * Duplicate element with new IDs
   */
  static duplicateElement(element: PageElement): PageElement {
    const newId = `el_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    if ('children' in element && element.children) {
      const container = element as ContainerElement;
      return {
        ...container,
        id: newId,
        children: container.children.map(child => this.duplicateElement(child))
      } as PageElement;
    }

    return { ...element, id: newId } as PageElement;
  }

  /**
   * Move element up or down
   */
  static moveElement(elements: PageElement[], id: string, direction: 'up' | 'down'): PageElement[] {
    const idx = elements.findIndex(el => el.id === id);

    if (idx === -1) {
      return elements.map(el => {
        if ('children' in el && el.children) {
          return { ...el, children: this.moveElement(el.children, id, direction) } as PageElement;
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
   * generateProductionCss
   **/
  
static generateProductionCss(classname='p-8 p-6 p-6 p-7 p-7 text-white text-gray-600 text-white') {
  for (const cls of classname.split(' ')) {
    if (!usedClasses.includes(cls)) {
      usedClasses.push(cls);
    }
  }

}

  /**
   * Render element to HTML string
   */
  static renderElementToHTML(el: PageElement): string {
    const className = BuilderActions.getClassName(el.id);

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



  // ─── Convenience Functions ────────────────────────────────────────────────────

/**
 * Quick helper to generate CSS for a single class
 */
static  generateCss(className: string): string | null {
  const compiler = new JitCssCompiler();
  return compiler.generateCss(className);
}

/**
 * Quick helper to generate CSS for multiple classes
 */
static generateCssForClasses(classNames: string[]): string {
  const compiler = new JitCssCompiler();
  return compiler.generateCssForClasses(classNames);
}

/**
 * Quick helper to generate complete CSS file for classes
 */
static  generateCssFile(classNames: string[], options?: {
  includeVariables?: boolean;
  minify?: boolean;
}): string {
  const compiler = new JitCssCompiler();
  return compiler.generateCssFile(classNames, options);
}

/**
 * Quick helper to generate CSS from HTML content
 */
static generateCssForHtml(html: string, options?: {
  includeVariables?: boolean;
  minify?: boolean;
}): string {
  const compiler = new JitCssCompiler();
  return compiler.generateCssForHtml(html, options);
}
  /**
   * Export full HTML document
   */
  static exportHTML(elements: PageElement[], background: string, maxWidth: string, padding: string): void {

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Portfolio</title>
  <style></style>
</head>
<body>
  <div class="mx-auto" style="max-width: ${maxWidth}; padding: ${padding};">
    ${elements.map(el => this.renderElementToHTML(el)).join('\n')}
  </div>
</body>
 <script>

 </script>
</html>`;

let css =this.generateCssForHtml(html, {
  includeVariables: true,
  minify:true,
})
    const html2 = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Portfolio</title>
  <style>${css}</style>
</head>
<body>
  <div class="mx-auto" style="max-width: ${maxWidth}; padding: ${padding};">
    ${elements.map(el => this.renderElementToHTML(el)).join('\n')}
  </div>
</body>
 <script>

 </script>
</html>`
    const blob = new Blob([html2], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.html';
    a.click();
    URL.revokeObjectURL(url);
  }




}