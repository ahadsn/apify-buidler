import React from 'react';
import { Eye, Edit3, Layout } from 'lucide-react';
import { useBuilderStore } from '../store/builder.store';
import { BuilderActions } from '../actions/builder.actions';
import CanvasElement from './CanvasElement.component';

export default function Canvas() {
    const {
        elements,
        selectedId,
        view,
        activeTab,
        canvasBackground,
        canvasGradient,
        canvasMaxWidth,
        canvasPadding,
        zoom,
        draggedType,
    } = useBuilderStore();

    const handleDrop = (e: React.DragEvent, parentId?: string) => {
        e.preventDefault();
        e.stopPropagation();
        if (draggedType) {
            BuilderActions.handleDrop(draggedType, parentId);
        }
    };

    const canvasStyle = canvasGradient
        ? { background: `linear-gradient(to right, ${canvasGradient.replace('from-', 'var(--tw-gradient-from) ').replace(' to-', ', var(--tw-gradient-to) ')})` }
        : { backgroundColor: canvasBackground };

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex gap-2 bg-black/30 p-2 border-b border-white/10">
                <button
                    onClick={() => BuilderActions.changeTab('preview')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'preview'
                        ? 'bg-white/20 text-white'
                        : 'text-white/60 hover:text-white'
                        }`}
                >
                    <Eye size={16} />
                    Preview
                </button>
                <button
                    onClick={() => BuilderActions.changeTab('edit')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'edit'
                        ? 'bg-white/20 text-white'
                        : 'text-white/60 hover:text-white'
                        }`}
                >
                    <Edit3 size={16} />
                    Edit
                </button>
            </div>

            <div
                className={`flex-1 overflow-auto p-6 ${canvasGradient ? ' ' + canvasGradient : ''}`}
                style={!canvasGradient ? { backgroundColor: canvasBackground } : {}}
                onDrop={(e) => handleDrop(e)}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => BuilderActions.selectElement(null)}
            >
                <div
                    className="mx-auto transition-all origin-top"
                    style={{
                        maxWidth: view === 'mobile' ? '375px' : canvasMaxWidth,
                        padding: canvasPadding,
                        transform: `scale(${zoom / 100})`,
                    }}
                >
                    {elements.length === 0 ? (
                        <div className="flex items-center justify-center min-h-[500px] border-2 border-dashed border-gray-300 rounded-xl bg-white/50">
                            <div className="text-center text-gray-500">
                                <Layout size={48} className="mx-auto mb-4 opacity-50" />
                                <p className="text-lg font-medium mb-2">Start Building</p>
                                <p className="text-sm">Drag components here</p>
                            </div>
                        </div>
                    ) : (
                        elements.map((el) => (
                            <CanvasElement
                                key={el.id}
                                element={el}
                                isSelected={selectedId === el.id}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}