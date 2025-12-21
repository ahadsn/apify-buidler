'use client'

import React from 'react';
import { useBuilderStore } from './store/builder.store';
import { BuilderActions } from './actions/builder.actions';
import { BuilderService } from './services/builder.services';
import Header from './components/Header.component';
import Sidebar from './components/Sidebar.component';
import Canvas from './components/Canvas.component';
import PropertiesPanel from './components/PropertiesPanel.component';

export default function PortfolioBuilder() {
    const {
        elements,
        selectedId,
        view,
        activeTab,
        canvasBackground,
        canvasMaxWidth,
        canvasPadding,
        zoom,
        draggedType,
    } = useBuilderStore();

    const selectedElement = selectedId
        ? BuilderService.findElement(selectedId, elements)
        : null;

    return (
        <div className="flex flex-col h-screen  from-gray-900 via-purple-900 to-gray-900">
            <Header />

            <div className="flex-1 flex overflow-hidden">
                <Sidebar />

                <Canvas />

                {activeTab === 'edit' && selectedElement && (
                    <PropertiesPanel element={selectedElement} />
                )}

                {activeTab === 'preview' && (
                    <CanvasSettings />
                )}
            </div>
        </div>
    );
}

// Canvas Settings Panel Component
function CanvasSettings() {
    const { canvasBackground, canvasGradient, canvasMaxWidth, canvasPadding } = useBuilderStore();
    const { GRADIENT_PRESETS } = require('./elements/builder.elements');

    return (
        <div className="w-80 bg-black/40 backdrop-blur-md border-l border-white/10 p-4 overflow-y-auto">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                Canvas Settings
            </h2>

            <div className="space-y-4">
                <div>
                    <label className="text-white/70 text-xs mb-2 block">Background Type</label>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                        <button
                            onClick={() => BuilderActions.updateCanvasSettings({ gradient: null, background: canvasBackground || '#ffffff' })}
                            className={`py-2 rounded text-xs transition ${!canvasGradient ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                        >
                            Solid Color
                        </button>
                        <button
                            onClick={() => BuilderActions.updateCanvasSettings({ gradient: 'from-blue-500 to-purple-600' })}
                            className={`py-2 rounded text-xs transition ${canvasGradient ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                        >
                            Gradient
                        </button>
                    </div>

                    {!canvasGradient ? (
                        <>
                            <label className="text-white/70 text-xs mb-2 block">Background Color</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="color"
                                    value={canvasBackground}
                                    onChange={(e) => BuilderActions.updateCanvasSettings({ background: e.target.value })}
                                    className="w-12 h-10 rounded border border-white/20 cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={canvasBackground}
                                    onChange={(e) => BuilderActions.updateCanvasSettings({ background: e.target.value })}
                                    className="flex-1 bg-white/10 text-white px-3 py-2 rounded border border-white/20 text-sm"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {['#ffffff', '#f3f4f6', '#e5e7eb', '#1f2937', '#111827', '#000000'].map(color => (
                                    <button
                                        key={color}
                                        onClick={() => BuilderActions.updateCanvasSettings({ background: color })}
                                        className="h-10 rounded border-2 border-white/20 hover:scale-110 transition"
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <label className="text-white/70 text-xs mb-2 block">Gradient Presets</label>
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {GRADIENT_PRESETS.map((preset: any) => (
                                    <button
                                        key={preset.name}
                                        onClick={() => BuilderActions.updateCanvasSettings({ gradient: preset.value })}
                                        className={`w-full h-10 rounded  ${preset.value} border-2 transition flex items-center justify-center ${canvasGradient === preset.value ? 'border-blue-400 scale-105' : 'border-white/20'
                                            }`}
                                    >
                                        <span className="text-white text-xs font-medium bg-black/30 px-2 py-1 rounded">
                                            {preset.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div>
                    <label className="text-white/70 text-xs mb-2 block">Max Width</label>
                    <div className="grid grid-cols-2 gap-2">
                        {['800px', '1000px', '1200px', '1400px', '1600px', '100%'].map(width => (
                            <button
                                key={width}
                                onClick={() => BuilderActions.updateCanvasSettings({ maxWidth: width })}
                                className={`py-2 rounded text-xs transition ${canvasMaxWidth === width
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                                    }`}
                            >
                                {width}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-white/70 text-xs mb-2 block">Padding</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['0px', '16px', '24px', '32px', '48px', '64px'].map(pad => (
                            <button
                                key={pad}
                                onClick={() => BuilderActions.updateCanvasSettings({ padding: pad })}
                                className={`py-2 rounded text-xs transition ${canvasPadding === pad
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                                    }`}
                            >
                                {pad}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}