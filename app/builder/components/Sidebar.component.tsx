import React from 'react';
import {
    Type, AlignLeft, Image, Link2, List, Square, Grid, Layout, Layers
} from 'lucide-react';
import { BuilderActions } from '../actions/builder.actions';

export default function Sidebar() {
    const components = [
        { type: 'heading', icon: Type, label: 'Heading', color: 'text-blue-400' },
        { type: 'text', icon: AlignLeft, label: 'Text', color: 'text-green-400' },
        { type: 'image', icon: Image, label: 'Image', color: 'text-purple-400' },
        { type: 'button', icon: Link2, label: 'Button', color: 'text-pink-400' },
        { type: 'list', icon: List, label: 'List', color: 'text-yellow-400' },
        { type: 'container', icon: Square, label: 'Container', color: 'text-orange-400' },
        { type: 'grid', icon: Grid, label: 'Grid', color: 'text-cyan-400' },
        { type: 'hero', icon: Layout, label: 'Hero', color: 'text-red-400' },
    ];

    return (
        <div className="w-64 bg-black/40 backdrop-blur-md border-r border-white/10 p-4 overflow-y-auto">
            <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Layers size={18} />
                Components
            </h2>
            <div className="space-y-2">
                {components.map((comp) => (
                    <div
                        key={comp.type}
                        draggable
                        onDragStart={() => BuilderActions.startDrag(comp.type)}
                        className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-3 rounded-lg cursor-move transition border border-white/5"
                    >
                        <comp.icon size={20} className={comp.color} />
                        <span className="text-white text-sm font-medium">{comp.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}