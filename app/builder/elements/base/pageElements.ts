import {  PageElement } from "../types/pageElement.types";




// ─── Factory ──────────────────────────────────────────────────────────────────

function generateId(): string {
  return `el_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Creates a new PageElement with sane defaults for every supported type.
 * The returned object is always a plain value — no shared references.
 */
export class PageElementFactory {
  static create(type: string): PageElement {
    const id = generateId();
    switch (type) {
      case 'heading':
        return {
          name: 'Heading', id, type: 'heading', tag: 'h1',
          content: 'Your Heading',
          className: 'text-5xl font-bold text-gray-900 mb-4',
        };

      case 'text':
        return {
          name: 'Text', id, type: 'text',
          content: 'Your paragraph text goes here. Click to edit and customize the styling.',
          className: 'text-base text-gray-700 mb-4',
        };

      case 'image':
        return {
          name: 'Image', id, type: 'image',
          src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
          alt: 'Portfolio image',
          className: 'w-full rounded-lg shadow-lg mb-4',
        };

      case 'button':
        return {
          name: 'Button', id, type: 'button',
          text: 'Click Me',
          href: '#',
          className: 'bg-blue-600 text-white text-base font-semibold py-3 px-8 rounded-lg inline-block',
        };

      case 'container':
        return {
          name: 'Container', id, type: 'container', children: [],
          className: 'flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md',
        };

      case 'grid':
        return {
          name: 'Grid', id, type: 'grid', children: [],
          className: 'grid grid-cols-3 gap-6 p-6',
        };

      case 'hero':
        return {
          name: 'Hero', id, type: 'hero', children: [],
          className: 'flex flex-col justify-center items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white py-24 px-8',
        };

      case 'list':
        return {
          name: 'List', id, type: 'list', listType: 'ul',
          items: ['First item', 'Second item', 'Third item'],
          className: 'text-gray-700 pl-5 mb-4',
        };

      default:
        return {
          name: 'Unknown', id, type: 'text',
          content: 'Unknown element',
          className: 'text-base text-gray-700 mb-4',
        };
    }
  }
}

