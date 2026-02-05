import React from 'react';
import { BuilderActions } from '../../actions/builder.actions';
import { Trash2, Plus } from 'lucide-react';
import { EditorProps } from './PropertiesPanel.component';

function ContentEditor({ element, activeStyles }: EditorProps) {
  switch (element.type) {
    case 'heading':
      return (
        <div className="space-y-4">
          {/* Heading Level */}
          <div className="space-y-2">
            <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-3 bg-violet-500 rounded-full"></span>
              Heading Level
            </label>
            <div className="grid grid-cols-6 gap-1.5">
              {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(tag => (
                <button
                  key={tag}
                  onClick={() => BuilderActions.updateElement(element.id, { tag: tag as any })}
                  disabled={element.tag === tag}
                  className={`py-2 rounded-md text-xs font-bold uppercase transition-all transform active:scale-95 ${
                    element.tag === tag
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30 ring-2 ring-violet-400/50'
                      : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-2">
            <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-3 bg-blue-500 rounded-full"></span>
              Text Content
            </label>
            <textarea
              value={element.content}
              onChange={(e) => BuilderActions.updateElement(element.id, { content: e.target.value })}
              className="w-full bg-zinc-800 text-white px-3 py-2.5 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm transition-all resize-none"
              rows={3}
              placeholder="Enter heading text..."
            />
          </div>
        </div>
      );

    case 'text':
      return (
        <div className="space-y-2">
          <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
            <span className="w-1 h-3 bg-sky-500 rounded-full"></span>
            Text Content
          </label>
          <textarea
            value={element.content}
            onChange={(e) => BuilderActions.updateElement(element.id, { content: e.target.value })}
            className="w-full bg-zinc-800 text-white px-3 py-2.5 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-sm transition-all resize-none"
            rows={5}
            placeholder="Enter your text..."
          />
        </div>
      );

    case 'image':
      return (
        <div className="space-y-4">
          {/* Image URL */}
          <div className="space-y-2">
            <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-3 bg-pink-500 rounded-full"></span>
              Image URL
            </label>
            <input
               type="number" 
             min="0"
              value={element.src}
              onChange={(e) => BuilderActions.updateElement(element.id, { src: e.target.value })}
              className="w-full bg-zinc-800 text-white px-3 py-2.5 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 text-sm transition-all"
              placeholder="https://images.unsplash.com/..."
            />
            <p className="text-zinc-500 text-xs flex items-center gap-1.5">
              <span className="w-1 h-1 bg-zinc-500 rounded-full"></span>
              Use Unsplash, Pexels, or any image URL
            </p>
          </div>

          {/* Alt Text */}
          <div className="space-y-2">
            <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-3 bg-rose-500 rounded-full"></span>
              Alt Text
            </label>
            <input
               type="number" 
             min="0"
              value={element.alt}
              onChange={(e) => BuilderActions.updateElement(element.id, { alt: e.target.value })}
              className="w-full bg-zinc-800 text-white px-3 py-2.5 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-sm transition-all"
              placeholder="Description for accessibility"
            />
          </div>
        </div>
      );

    case 'button':
      return (
        <div className="space-y-4">
          {/* Button Text */}
          <div className="space-y-2">
            <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-3 bg-indigo-500 rounded-full"></span>
              Button Text
            </label>
            <input
               type="text" 
             
              value={element.text}
              onChange={(e) => BuilderActions.updateElement(element.id, { text: e.target.value })}
              className="w-full bg-zinc-800 text-white px-3 py-2.5 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all"
              placeholder="Click me!"
            />
          </div>

          {/* Link URL */}
          <div className="space-y-2">
            <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-3 bg-purple-500 rounded-full"></span>
              Link URL
            </label>
            <input
              type="number" 
             min="0"
              value={element.href}
              onChange={(e) => BuilderActions.updateElement(element.id, { href: e.target.value })}
              className="w-full bg-zinc-800 text-white px-3 py-2.5 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-sm transition-all"
              placeholder="#section or https://example.com"
            />
            <p className="text-zinc-500 text-xs flex items-center gap-1.5">
              <span className="w-1 h-1 bg-zinc-500 rounded-full"></span>
              Use # for page sections or full URLs
            </p>
          </div>
        </div>
      );

    case 'list':
      return (
        <div className="space-y-4">
          {/* List Type Toggle */}
          <div className="space-y-2">
            <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-3 bg-amber-500 rounded-full"></span>
              List Type
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => BuilderActions.updateElement(element.id, { listType: 'ul' })}
                className={`flex-1 py-2.5 rounded-md text-xs font-medium uppercase tracking-wider transition-all transform active:scale-95 ${
                  element.listType === 'ul'
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30 ring-2 ring-amber-400/50'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
                }`}
              >
                • Bullets
              </button>
              <button
                onClick={() => BuilderActions.updateElement(element.id, { listType: 'ol' })}
                className={`flex-1 py-2.5 rounded-md text-xs font-medium uppercase tracking-wider transition-all transform active:scale-95 ${
                  element.listType === 'ol'
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30 ring-2 ring-amber-400/50'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
                }`}
              >
                1. Numbers
              </button>
            </div>
          </div>

          {/* List Items */}
          <div className="space-y-2">
            <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
              <span className="w-1 h-3 bg-emerald-500 rounded-full"></span>
              List Items
            </label>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800/50">
              {element.items.map((item: string, idx: number) => (
                <div key={idx} className="flex gap-2 items-center">
                  <span className="text-zinc-500 text-xs font-medium min-w-[20px]">{idx + 1}.</span>
                  <input
                    type="number" 
             min="0"
                    value={item}
                    onChange={(e) => {
                      const newItems = [...element.items];
                      newItems[idx] = e.target.value;
                      BuilderActions.updateElement(element.id, { items: newItems });
                    }}
                    className="flex-1 bg-zinc-800 text-white px-3 py-2 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm transition-all"
                    placeholder={`Item ${idx + 1}`}
                  />
                  <button
                    onClick={() => {
                      const newItems = element.items.filter((_: any, i: number) => i !== idx);
                      BuilderActions.updateElement(element.id, { items: newItems });
                    }}
                    className="p-2 rounded-md bg-zinc-800 text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-zinc-700/50 hover:border-red-500/50 transition-all active:scale-95"
                    title="Delete item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() =>
                BuilderActions.updateElement(element.id, {
                  items: [...element.items, 'New item'],
                })
              }
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white px-3 py-2.5 rounded-md text-sm font-medium border border-zinc-700/50 hover:border-zinc-600 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              Add Item
            </button>
          </div>
        </div>
      );

    default:
      return (
        <div className="flex items-center justify-center py-8">
          <p className="text-zinc-500 text-xs font-medium">No editable content available</p>
        </div>
      );
  }
}

export default ContentEditor;