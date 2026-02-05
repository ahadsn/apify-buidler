import React, { useState } from 'react';
import {
    Type, AlignLeft, Image, Link2, List, Square, Grid, Layout, Layers
} from 'lucide-react';
import { BuilderActions } from '../actions/builder.actions';
import { useDeviceType } from '../hooks/useDeviceType';

export default function Sidebar() {
    const deviceType = useDeviceType()
    const [isDragging, setIsDragging] = useState(false);
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const [draggedComponent, setDraggedComponent] = useState<any>(null);
   
    const components = [
        { type: 'heading', icon: Type, label: 'Heading', color: 'text-blue-400', bgColor: 'hover:bg-blue-500/10', borderColor: 'hover:border-blue-500/30' },
        { type: 'text', icon: AlignLeft, label: 'Text', color: 'text-green-400', bgColor: 'hover:bg-green-500/10', borderColor: 'hover:border-green-500/30' },
        { type: 'image', icon: Image, label: 'Image', color: 'text-purple-400', bgColor: 'hover:bg-purple-500/10', borderColor: 'hover:border-purple-500/30' },
        { type: 'button', icon: Link2, label: 'Button', color: 'text-pink-400', bgColor: 'hover:bg-pink-500/10', borderColor: 'hover:border-pink-500/30' },
        { type: 'list', icon: List, label: 'List', color: 'text-yellow-400', bgColor: 'hover:bg-yellow-500/10', borderColor: 'hover:border-yellow-500/30' },
        { type: 'container', icon: Square, label: 'Container', color: 'text-orange-400', bgColor: 'hover:bg-orange-500/10', borderColor: 'hover:border-orange-500/30' },
        { type: 'grid', icon: Grid, label: 'Grid', color: 'text-cyan-400', bgColor: 'hover:bg-cyan-500/10', borderColor: 'hover:border-cyan-500/30' },
        { type: 'hero', icon: Layout, label: 'Hero', color: 'text-red-400', bgColor: 'hover:bg-red-500/10', borderColor: 'hover:border-red-500/30' },
    ];

    const handleTouchStart = (e: React.TouchEvent, comp: any) => {
        if (deviceType !== 'pc') {
            const touch = e.touches[0];
            setIsDragging(true);
            setDraggedComponent(comp);
            setDragPosition({ x: touch.clientX, y: touch.clientY });
            BuilderActions.startDrag(comp.type);
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (isDragging && deviceType !== 'pc') {
            const touch = e.touches[0];
            setDragPosition({ x: touch.clientX, y: touch.clientY });
        }
    };

    const handleTouchEnd = () => {
        if (deviceType !== 'pc') {
            setIsDragging(false);
            setDraggedComponent(null);
           
        }
    };

    return (
        <>
            <div className={`${deviceType=='pc'?'w-64':'w-10'} h-full bg-black border-r border-zinc-800 overflow-y-auto`}>
                {deviceType=='pc'&&<div className="sticky top-0 bg-black z-10 p-4 border-b border-zinc-800">
                    <h2 className="text-white font-semibold flex items-center gap-2">
                        <div className="p-1.5 bg-zinc-900 rounded-lg">
                            <Layers size={16} className="text-purple-400" />
                        </div>
                        Components
                    </h2>
                    <p className="text-zinc-500 text-xs mt-1">Drag to add to canvas</p>
                </div>}
                
                <div 
                    className={`${deviceType=='pc'?'p-3':'p-0.5'} ${deviceType=='pc'?'space-y-2':'space-y-1'}`}
                    onTouchMove={handleTouchMove}
                >
                    {components.map((comp) => (
                        <div
                            key={comp.type}
                            draggable={deviceType=='pc'}
                            onDragStart={() => BuilderActions.startDrag(comp.type)}
                            onTouchStart={(e) => handleTouchStart(e, comp)}
                            onTouchEnd={handleTouchEnd}
                            className={`group flex items-center ${deviceType=='pc'?'gap-3':'gap-0'} bg-zinc-900 ${comp.bgColor} ${deviceType=='pc'?'p-3':'p-1.5'} ${deviceType=='pc'?'rounded-lg':'rounded-md'} cursor-move transition-all border border-zinc-800 ${comp.borderColor} hover:scale-105 active:scale-95 hover:shadow-lg touch-none`}
                        >
                            <div className={`${deviceType=='pc'?'p-3':'p-1'} bg-black ${deviceType=='pc'?'rounded-md':'rounded-sm'} border border-zinc-800 group-hover:border-zinc-700 transition-colors`}>
                                <comp.icon size={deviceType=='pc'?15:14} className={`${comp.color} group-hover:scale-110 transition-transform`} />
                            </div>
                            {deviceType==='pc'&& <span className="text-white text-sm font-medium group-hover:text-white/90">{comp.label}</span>}
                            {deviceType==='pc'&&<div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="flex gap-0.5">
                                    <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
                                    <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
                                    <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
                                </div>
                            </div>}
                        </div>
                    ))}
                </div>

                {deviceType=='pc'&& <div className="p-4 border-t border-zinc-800 bg-black">
                    <div className="text-center text-zinc-600 text-xs">
                        <p>💡 Tip: Drag & drop</p>
                        <p className="mt-1">components onto canvas</p>
                    </div>
                </div>}
            </div>

            {/* Floating drag preview for mobile */}
            {isDragging && draggedComponent && deviceType !== 'pc' && (
                <div
                    className="fixed pointer-events-none z-50 opacity-80"
                    style={{
                        left: dragPosition.x - 20,
                        top: dragPosition.y - 20,
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <div className="bg-zinc-900 p-2 rounded-lg border-2 border-blue-500 shadow-2xl">
                        <draggedComponent.icon size={24} className={draggedComponent.color} />
                    </div>
                </div>
            )}
        </>
    );
}
