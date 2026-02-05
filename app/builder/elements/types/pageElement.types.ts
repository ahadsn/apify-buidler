export interface BaseElement {
  name: string;
  id: string;
  type: string;
  className: string;
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
  children: PageElement[];
}
export type justifyMapType=Record<string, string>

export interface ListElement extends BaseElement {
  type: 'list';
  listType: 'ul' | 'ol';
  items: string[];
}

export type PageElement =
  | HeadingElement
  | TextElement
  | ImageElement
  | ButtonElement
  | ContainerElement
  | ListElement;

export interface PickerOption {
  /** Human-readable label shown in the UI. */
  label: string;
  /** The full Tailwind class string that gets applied. */
  value: string;
}