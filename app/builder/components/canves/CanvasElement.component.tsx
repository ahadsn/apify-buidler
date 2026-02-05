import React, { useEffect, useMemo } from 'react';
import { Type, ImageIcon, MousePointer, List, Box, Grid3X3, Sparkles } from 'lucide-react';
import { PageElement } from '../../elements/base/pageElements';
import { BuilderActions } from '../../actions/builder.actions';
import { useBuilderStore } from '../../store/builder.store';
import { useDeviceType } from '../../hooks/useDeviceType';

interface CanvasElementProps {
    element: PageElement;
    isSelected: boolean;
}

export default function CanvasElement({ element, isSelected }: CanvasElementProps) {
    const deviceType = useDeviceType();
    const { draggedType } = useBuilderStore();

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        BuilderActions.selectElement(element.id);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (draggedType) {
            BuilderActions.handleDrop(draggedType, element.id);
        }
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (deviceType !== 'pc' && draggedType) {
            e.stopPropagation();
            BuilderActions.handleDrop(draggedType, element.id);
        }
    };

    const className= BuilderActions.getIsolatedClassName(element.id);
   
//     useEffect(() => {
//   if (!virtualCssFile) return;

//   let styleEl = document.getElementById('virtual-css') as HTMLStyleElement | null;

//   if (!styleEl) {
//     styleEl = document.createElement('style');
//     styleEl.id = 'virtual-css';
//     styleEl.setAttribute('data-source', 'builder');
//     document.head.appendChild(styleEl);
//   }

//   styleEl.textContent = virtualCssFile;
// }, [virtualCssFile]);
  

    const getElementInfo = () => {
        switch (element.type) {
            case 'heading':
                return {
                    icon: Type,
                    label: element.tag?.toUpperCase() || 'Heading',
                    color: 'bg-purple-500'
                };
            case 'text':
                return {
                    icon: Type,
                    label: 'Text',
                    color: 'bg-blue-500'
                };
            case 'image':
                return {
                    icon: ImageIcon,
                    label: 'Image',
                    color: 'bg-green-500'
                };
            case 'button':
                return {
                    icon: MousePointer,
                    label: 'Button',
                    color: 'bg-orange-500'
                };
            case 'list':
                return {
                    icon: List,
                    label: 'List',
                    color: 'bg-cyan-500'
                };
            case 'container':
                return {
                    icon: Box,
                    label: 'Container',
                    color: 'bg-indigo-500'
                };
            case 'grid':
                return {
                    icon: Grid3X3,
                    label: 'Grid',
                    color: 'bg-pink-500'
                };
            case 'hero':
                return {
                    icon: Sparkles,
                    label: 'Hero',
                    color: 'bg-amber-500'
                };
            default:
                return {
                    icon: Box,
                    label: 'Element',
                    color: 'bg-gray-500'
                };
        }
    };

    const { icon: Icon, label, color } = getElementInfo();

    const renderContent = () => {
        switch (element.type) {
            case 'heading':
                return React.createElement(
                    element.tag,
                    { className, id: element.id },
                    element.content
                );
            case 'text':
                return (
                    <p className={className} id={element.id}>

                        {element.content}
                    </p>
                );
            case 'image':
                return (
                    <img
                        id={element.id}
                        src={element.src}
                        alt={element.alt}
                        className={className}
                    />
                );
            case 'button':
                return (
                    <a
                        id={element.id}
                        href={element.href}
                        className={`${className} hover:opacity-80 transition cursor-pointer`}
                        onClick={(e) => e.preventDefault()}
                    >
                        {element.text}
                    </a>
                );
            case 'list':
                return React.createElement(
                    element.listType,
                    { className: `${className} list-disc`, id: element.id },
                    element.items.map((item: string, idx: number) => (
                        <li key={idx} className={deviceType == 'pc' ? "mb-2" : "mb-1"}>{item}</li>
                    ))
                );
            case 'container':
            case 'grid':
            case 'hero':
                return (
                    <div
                        id={element.id}
                        className={className}
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        onTouchEnd={handleTouchEnd}
                    >
                        {element.children.length === 0 ? (
                            <div className={`${deviceType == 'pc' ? 'min-h-30' : 'min-h-20'} flex items-center justify-center border-2 border-dashed border-blue-200 ${deviceType == 'pc' ? 'rounded-xl' : 'rounded-lg'} bg-blue-50/30 backdrop-blur-sm text-blue-400 ${deviceType == 'pc' ? 'text-sm' : 'text-xs'} font-medium hover:border-blue-300 hover:bg-blue-50/50 transition-all`}>
                                <div className="text-center">
                                    <Box className={`${deviceType == 'pc' ? 'w-8 h-8' : 'w-5 h-5'} mx-auto ${deviceType == 'pc' ? 'mb-2' : 'mb-1'} opacity-40`} />
                                    <div>{deviceType == 'pc' ? 'Drop components here' : 'Drop here'}</div>
                                </div>
                            </div>
                        ) : (
                            element.children.map((child) => (
                                <CanvasElement
                                    key={child.id}
                                    element={child}
                                    isSelected={false}
                                />
                            ))
                        )}
                    </div>
                );
        }
    };

    return (
        <div
            className={`relative group transition-all duration-10 ${isSelected
                    ? `ring-2 ring-blue-500 ${deviceType == 'pc' ? 'ring-offset-4' : 'ring-offset-2'} ring-offset-transparent shadow-lg shadow-blue-500/20`
                    : `hover:ring-2 hover:ring-blue-300/60 ${deviceType == 'pc' ? 'hover:ring-offset-2' : 'hover:ring-offset-1'} hover:ring-offset-transparent`
                }`}
            onClick={handleClick}
        >

            <div className={`absolute ${deviceType == 'pc' ? '-top-8' : '-top-6'} left-0 z-20 transition-all duration-10 ${isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                }`}>
                <div className={`${color} text-white ${deviceType == 'pc' ? 'px-3 py-1.5' : 'px-2 py-1'} rounded-lg ${deviceType == 'pc' ? 'text-xs' : 'text-[10px]'} font-semibold shadow-lg flex items-center ${deviceType == 'pc' ? 'gap-2' : 'gap-1'}`}>
                    <Icon className={deviceType == 'pc' ? "w-3.5 h-3.5" : "w-2.5 h-2.5"} />
                    <span>{label}</span>
                </div>
            </div>


            <div className={`absolute -top-2 -left-2 ${deviceType == 'pc' ? 'w-4 h-4' : 'w-3 h-3'} rounded-full ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-10 shadow-lg ${isSelected ? 'opacity-100 scale-110' : ''
                }`}></div>


            <div className={`absolute inset-0 ${deviceType == 'pc' ? 'rounded-lg' : 'rounded-md'} transition-all duration-10 pointer-events-none ${isSelected
                    ? 'bg-blue-500/5'
                    : 'group-hover:bg-blue-400/5'
                }`}></div>

            {renderContent()}
        </div>
    );
}