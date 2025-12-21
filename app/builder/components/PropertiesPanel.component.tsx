import React, { useState } from 'react';
import { Settings, ChevronDown, ChevronUp, Trash2, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import { Element, TAILWIND_VALUES, COLOR_PALETTE } from '../elements/builder.elements';
import { BuilderActions } from '../actions/builder.actions';

interface PropertiesPanelProps {
    element: Element;
}

export default function PropertiesPanel({ element }: PropertiesPanelProps) {
    const [expanded, setExpanded] = useState({
        content: true,
        typography: true,
        spacing: false,
        background: false,
        border: false,
        layout: false,
    });

    const toggle = (key: string) => setExpanded(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));

    return (
        <div className="w-96 bg-black/40 backdrop-blur-md border-l border-white/10 overflow-y-auto">
            <div className="sticky top-0 bg-black/60 backdrop-blur-md p-4 border-b border-white/10 flex items-center justify-between z-10">
                <h2 className="text-white font-semibold flex items-center gap-2">
                    <Settings size={18} />
                    {element.type}
                </h2>
                <button
                    onClick={() => BuilderActions.selectElement(null)}
                    className="text-white/60 hover:text-white"
                >
                    ✕
                </button>
            </div>

            <div className="p-4 space-y-3">
                <Section title="Content" expanded={expanded.content} onToggle={() => toggle('content')}>
                    <ContentEditor element={element} />
                </Section>

                <Section title="Typography" expanded={expanded.typography} onToggle={() => toggle('typography')}>
                    <TypographyEditor element={element} />
                </Section>

                <Section title="Spacing" expanded={expanded.spacing} onToggle={() => toggle('spacing')}>
                    <SpacingEditor element={element} />
                </Section>

                <Section title="Background & Colors" expanded={expanded.background} onToggle={() => toggle('background')}>
                    <BackgroundEditor element={element} />
                </Section>

                <Section title="Border & Shadow" expanded={expanded.border} onToggle={() => toggle('border')}>
                    <BorderEditor element={element} />
                </Section>

                {(element.type === 'container' || element.type === 'grid' || element.type === 'hero') && (
                    <Section title="Layout" expanded={expanded.layout} onToggle={() => toggle('layout')}>
                        <LayoutEditor element={element} />
                    </Section>
                )}
            </div>
        </div>
    );
}

// Section Component
function Section({ title, expanded, onToggle, children }: any) {
    return (
        <div className="bg-white/5 rounded-lg border border-white/10">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-3 text-white hover:bg-white/5"
            >
                <span className="font-medium text-sm">{title}</span>
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {expanded && <div className="p-3 space-y-3 border-t border-white/10">{children}</div>}
        </div>
    );
}

// Content Editor
function ContentEditor({ element }: { element: Element }) {
    switch (element.type) {
        case 'heading':
            return (
                <>
                    <div>
                        <label className="text-white/70 text-xs mb-1 block">Heading Level</label>
                        <div className="grid grid-cols-6 gap-1">
                            {['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => BuilderActions.updateElement(element.id, { tag: tag as any })}
                                    className={`py-2 rounded text-xs font-medium transition ${element.tag === tag
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                                        }`}
                                >
                                    {tag.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="text-white/70 text-xs mb-1 block">Text</label>
                        <textarea
                            value={element.content}
                            onChange={(e) => BuilderActions.updateElement(element.id, { content: e.target.value })}
                            className="w-full bg-white/10 text-white px-3 py-2 rounded border border-white/20 text-sm"
                            rows={2}
                        />
                    </div>
                </>
            );

        case 'text':
            return (
                <div>
                    <label className="text-white/70 text-xs mb-1 block">Text</label>
                    <textarea
                        value={element.content}
                        onChange={(e) => BuilderActions.updateElement(element.id, { content: e.target.value })}
                        className="w-full bg-white/10 text-white px-3 py-2 rounded border border-white/20 text-sm"
                        rows={4}
                    />
                </div>
            );

        case 'image':
            return (
                <>
                    <div>
                        <label className="text-white/70 text-xs mb-1 block">Image URL</label>
                        <input
                            type="text"
                            value={element.src}
                            onChange={(e) => BuilderActions.updateElement(element.id, { src: e.target.value })}
                            className="w-full bg-white/10 text-white px-3 py-2 rounded border border-white/20 text-sm"
                        />
                    </div>
                    <div>
                        <label className="text-white/70 text-xs mb-1 block">Alt Text</label>
                        <input
                            type="text"
                            value={element.alt}
                            onChange={(e) => BuilderActions.updateElement(element.id, { alt: e.target.value })}
                            className="w-full bg-white/10 text-white px-3 py-2 rounded border border-white/20 text-sm"
                        />
                    </div>
                </>
            );

        case 'button':
            return (
                <>
                    <div>
                        <label className="text-white/70 text-xs mb-1 block">Button Text</label>
                        <input
                            type="text"
                            value={element.text}
                            onChange={(e) => BuilderActions.updateElement(element.id, { text: e.target.value })}
                            className="w-full bg-white/10 text-white px-3 py-2 rounded border border-white/20 text-sm"
                        />
                    </div>
                    <div>
                        <label className="text-white/70 text-xs mb-1 block">Link</label>
                        <input
                            type="text"
                            value={element.href}
                            onChange={(e) => BuilderActions.updateElement(element.id, { href: e.target.value })}
                            className="w-full bg-white/10 text-white px-3 py-2 rounded border border-white/20 text-sm"
                        />
                    </div>
                </>
            );

        case 'list':
            return (
                <>
                    <div className="flex gap-2">
                        <button
                            onClick={() => BuilderActions.updateElement(element.id, { listType: 'ul' })}
                            className={`flex-1 py-2 rounded text-xs transition ${element.listType === 'ul'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/10 text-white/70'
                                }`}
                        >
                            Bullets
                        </button>
                        <button
                            onClick={() => BuilderActions.updateElement(element.id, { listType: 'ol' })}
                            className={`flex-1 py-2 rounded text-xs transition ${element.listType === 'ol'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/10 text-white/70'
                                }`}
                        >
                            Numbers
                        </button>
                    </div>
                    {element.items.map((item: string, idx: number) => (
                        <div key={idx} className="flex gap-2">
                            <input
                                type="text"
                                value={item}
                                onChange={(e) => {
                                    const newItems = [...element.items];
                                    newItems[idx] = e.target.value;
                                    BuilderActions.updateElement(element.id, { items: newItems });
                                }}
                                className="flex-1 bg-white/10 text-white px-2 py-1 rounded border border-white/20 text-sm"
                            />
                            <button
                                onClick={() => {
                                    const newItems = element.items.filter((_: any, i: number) => i !== idx);
                                    BuilderActions.updateElement(element.id, { items: newItems });
                                }}
                                className="text-red-400 hover:text-red-300 p-1"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={() => BuilderActions.updateElement(element.id, {
                            items: [...element.items, 'New item']
                        })}
                        className="w-full bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded text-sm"
                    >
                        + Add Item
                    </button>
                </>
            );

        default:
            return null;
    }
}

// Typography Editor
function TypographyEditor({ element }: { element: Element }) {
    if (!['heading', 'text', 'button', 'list'].includes(element.type)) return null;

    return (
        <>
            <div>
                <label className="text-white/70 text-xs mb-2 block">Font Size</label>
                <div className="grid grid-cols-4 gap-1">
                    {Object.keys(TAILWIND_VALUES.fontSize).map(size => (
                        <button
                            key={size}
                            onClick={() => BuilderActions.updateElementStyles(element.id, { fontSize: size })}
                            className={`py-2 rounded text-xs transition ${element.styles.fontSize === size
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="text-white/70 text-xs mb-2 block">Font Weight</label>
                <div className="grid grid-cols-3 gap-1">
                    {Object.keys(TAILWIND_VALUES.fontWeight).map(weight => (
                        <button
                            key={weight}
                            onClick={() => BuilderActions.updateElementStyles(element.id, { fontWeight: weight })}
                            className={`py-2 rounded text-xs capitalize transition ${element.styles.fontWeight === weight
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                        >
                            {weight}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="text-white/70 text-xs mb-2 block">Text Color</label>
                <div className="grid grid-cols-5 gap-2">
                    {COLOR_PALETTE.slice(0, 15).map(color => (
                        <button
                            key={color.value}
                            onClick={() => BuilderActions.updateElementStyles(element.id, { textColor: color.value })}
                            className={`h-8 rounded border-2 transition ${element.styles.textColor === color.value
                                ? 'border-blue-400 scale-110'
                                : 'border-white/20'
                                } ${color.class}`}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>

            <div>
                <label className="text-white/70 text-xs mb-2 block">Text Align</label>
                <div className="grid grid-cols-4 gap-1">
                    {[
                        { value: 'left', Icon: AlignLeft },
                        { value: 'center', Icon: AlignCenter },
                        { value: 'right', Icon: AlignRight },
                        { value: 'justify', Icon: AlignJustify },
                    ].map(({ value, Icon }) => (
                        <button
                            key={value}
                            onClick={() => BuilderActions.updateElementStyles(element.id, { textAlign: value })}
                            className={`py-2 rounded transition ${element.styles.textAlign === value
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                        >
                            <Icon size={16} className="mx-auto" />
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

// Spacing Editor
function SpacingEditor({ element }: { element: Element }) {
    return (
        <>
            <div>
                <label className="text-white/70 text-xs mb-2 block">Padding</label>
                <div className="grid grid-cols-2 gap-2">
                    {[
                        { label: 'Top', key: 'pt' },
                        { label: 'Right', key: 'pr' },
                        { label: 'Bottom', key: 'pb' },
                        { label: 'Left', key: 'pl' },
                    ].map(({ label, key }) => (
                        <div key={key}>
                            <label className="text-white/60 text-xs mb-1 block">{label}</label>
                            <select
                                value={element.styles[key as keyof typeof element.styles] || '0'}
                                onChange={(e) => BuilderActions.updateElementStyles(element.id, { [key]: e.target.value })}
                                className="w-full bg-white/10 text-white px-2 py-1 rounded border border-white/20 text-xs"
                            >
                                {Object.entries(TAILWIND_VALUES.spacing).map(([k, v]) => (
                                    <option key={k} value={k}>{k} ({v})</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <label className="text-white/70 text-xs mb-2 block">Margin</label>
                <div className="grid grid-cols-2 gap-2">
                    {[
                        { label: 'Top', key: 'mt' },
                        { label: 'Right', key: 'mr' },
                        { label: 'Bottom', key: 'mb' },
                        { label: 'Left', key: 'ml' },
                    ].map(({ label, key }) => (
                        <div key={key}>
                            <label className="text-white/60 text-xs mb-1 block">{label}</label>
                            <select
                                value={element.styles[key as keyof typeof element.styles] || '0'}
                                onChange={(e) => BuilderActions.updateElementStyles(element.id, { [key]: e.target.value })}
                                className="w-full bg-white/10 text-white px-2 py-1 rounded border border-white/20 text-xs"
                            >
                                {Object.entries(TAILWIND_VALUES.spacing).map(([k, v]) => (
                                    <option key={k} value={k}>{k} ({v})</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

// Background Editor
function BackgroundEditor({ element }: { element: Element }) {
    return (
        <>
            <div>
                <label className="text-white/70 text-xs mb-2 block">Background Color</label>
                <div className="grid grid-cols-5 gap-2">
                    {COLOR_PALETTE.map(color => (
                        <button
                            key={color.value}
                            onClick={() => BuilderActions.updateElementStyles(element.id, {
                                bgColor: color.value,
                                bgGradient: undefined
                            })}
                            className={`h-8 rounded border-2 transition ${element.styles.bgColor === color.value
                                ? 'border-blue-400 scale-110'
                                : 'border-white/20'
                                } ${color.class}`}
                            title={color.name}
                        />
                    ))}
                </div>
            </div>

            <div>
                <label className="text-white/70 text-xs mb-2 block">Gradient</label>
                <div className="space-y-2">
                    {[
                        'from-purple-500 to-pink-500',
                        'from-blue-500 to-cyan-500',
                        'from-green-500 to-teal-500',
                        'from-orange-500 to-red-500',
                        'from-indigo-500 to-purple-500',
                        'from-pink-500 to-rose-500',
                    ].map(gradient => (
                        <button
                            key={gradient}
                            onClick={() => BuilderActions.updateElementStyles(element.id, {
                                bgGradient: gradient,
                                bgColor: undefined
                            })}
                            className={`w-full h-8 rounded  ${gradient} border-2 transition ${element.styles.bgGradient === gradient
                                ? 'border-blue-400 scale-105'
                                : 'border-white/20'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

// Border Editor
function BorderEditor({ element }: { element: Element }) {
    return (
        <>
            <div>
                <label className="text-white/70 text-xs mb-2 block">Border Radius</label>
                <div className="grid grid-cols-4 gap-1">
                    {Object.keys(TAILWIND_VALUES.borderRadius).map(radius => (
                        <button
                            key={radius}
                            onClick={() => BuilderActions.updateElementStyles(element.id, { borderRadius: radius })}
                            className={`py-2 rounded text-xs transition ${element.styles.borderRadius === radius
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                        >
                            {radius === 'DEFAULT' ? 'md' : radius}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="text-white/70 text-xs mb-2 block">Shadow</label>
                <div className="grid grid-cols-4 gap-1">
                    {Object.keys(TAILWIND_VALUES.shadow).map(shadow => (
                        <button
                            key={shadow}
                            onClick={() => BuilderActions.updateElementStyles(element.id, { shadow: shadow })}
                            className={`py-2 rounded text-xs transition ${element.styles.shadow === shadow
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                        >
                            {shadow === 'DEFAULT' ? 'md' : shadow}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="text-white/70 text-xs mb-2 block">Width</label>
                <div className="grid grid-cols-4 gap-1">
                    {['auto', 'full', '1/2', '1/3', '2/3', '1/4', '3/4'].map(width => (
                        <button
                            key={width}
                            onClick={() => BuilderActions.updateElementStyles(element.id, { width: width })}
                            className={`py-2 rounded text-xs transition ${element.styles.width === width
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                        >
                            {width}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

// Layout Editor
function LayoutEditor({ element }: { element: Element }) {
    if (element.type === 'grid') {
        return (
            <>
                <div>
                    <label className="text-white/70 text-xs mb-2 block">Grid Columns</label>
                    <div className="grid grid-cols-4 gap-1">
                        {['1', '2', '3', '4', '5', '6'].map(cols => (
                            <button
                                key={cols}
                                onClick={() => BuilderActions.updateElementStyles(element.id, { gridCols: cols })}
                                className={`py-2 rounded text-xs transition ${element.styles.gridCols === cols
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                                    }`}
                            >
                                {cols} col
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="text-white/70 text-xs mb-2 block">Gap</label>
                    <div className="grid grid-cols-6 gap-1">
                        {['0', '1', '2', '4', '6', '8'].map(gap => (
                            <button
                                key={gap}
                                onClick={() => BuilderActions.updateElementStyles(element.id, { gap })}
                                className={`py-2 rounded text-xs transition ${element.styles.gap === gap
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                                    }`}
                            >
                                {gap}
                            </button>
                        ))}
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div>
                <label className="text-white/70 text-xs mb-2 block">Direction</label>
                <div className="grid grid-cols-2 gap-1">
                    {[
                        { value: 'row', label: 'Row' },
                        { value: 'col', label: 'Column' },
                    ].map(({ value, label }) => (
                        <button
                            key={value}
                            onClick={() => BuilderActions.updateElementStyles(element.id, { flexDirection: value })}
                            className={`py-2 rounded text-xs transition ${element.styles.flexDirection === value
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="text-white/70 text-xs mb-2 block">Justify</label>
                <div className="grid grid-cols-3 gap-1">
                    {['start', 'center', 'end', 'between', 'around', 'evenly'].map(justify => (
                        <button
                            key={justify}
                            onClick={() => BuilderActions.updateElementStyles(element.id, { justifyContent: justify })}
                            className={`py-2 rounded text-xs capitalize transition ${element.styles.justifyContent === justify
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                        >
                            {justify}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="text-white/70 text-xs mb-2 block">Align</label>
                <div className="grid grid-cols-3 gap-1">
                    {['start', 'center', 'end', 'stretch'].map(align => (
                        <button
                            key={align}
                            onClick={() => BuilderActions.updateElementStyles(element.id, { alignItems: align })}
                            className={`py-2 rounded text-xs capitalize transition ${element.styles.alignItems === align
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                        >
                            {align}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="text-white/70 text-xs mb-2 block">Gap</label>
                <div className="grid grid-cols-6 gap-1">
                    {['0', '1', '2', '4', '6', '8'].map(gap => (
                        <button
                            key={gap}
                            onClick={() => BuilderActions.updateElementStyles(element.id, { gap })}
                            className={`py-2 rounded text-xs transition ${element.styles.gap === gap
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                        >
                            {gap}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}