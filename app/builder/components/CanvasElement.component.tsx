import React from 'react';
import { Element } from '../elements/builder.elements';
import { BuilderService } from '../services/builder.services';
import { BuilderActions } from '../actions/builder.actions';
import { useBuilderStore } from '../store/builder.store';

interface CanvasElementProps {
    element: Element;
    isSelected: boolean;
}

export default function CanvasElement({ element, isSelected }: CanvasElementProps) {
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

    const className = BuilderService.stylesToTailwind(element.styles);

    const renderContent = () => {
        switch (element.type) {
            case 'heading':
                return React.createElement(element.tag, { className }, element.content);

            case 'text':
                return <p className={className}>{element.content}</p>;

            case 'image':
                return <img src={element.src} alt={element.alt} className={className} />;

            case 'button':
                return (
                    <a
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
                    { className: `${className} list-disc` },
                    element.items.map((item: string, idx: number) => (
                        <li key={idx} className="mb-2">{item}</li>
                    ))
                );

            case 'container':
            case 'grid':
            case 'hero':
                return (
                    <div
                        className={className}
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        {element.children.length === 0 ? (
                            <div className="min-h-[100px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-gray-400 text-sm">
                                Drop components here
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
            className={`relative group ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : 'hover:ring-1 hover:ring-blue-300'
                }`}
            onClick={handleClick}
        >
            {renderContent()}
        </div>
    );
}