import React from 'react';
import { Download, Sparkles, Monitor, Smartphone, ZoomIn, ZoomOut } from 'lucide-react';
import { useBuilderStore } from '../store/builder.store';
import { BuilderActions } from '../actions/builder.actions';

export default function Header() {
    const { view, zoom } = useBuilderStore();

    return (
        <div className="bg-black/40 backdrop-blur-md border-b border-white/10 p-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sparkles className="text-purple-400" size={24} />
                    <h1 className="text-xl font-bold text-white">
                        Portfolio Builder <span className="text-purple-400">Pro</span>
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex gap-1 bg-white/10 rounded-lg p-1">
                        <button
                            onClick={() => BuilderActions.changeView('desktop')}
                            className={`p-2 rounded transition ${view === 'desktop'
                                ? 'bg-white/20 text-white'
                                : 'text-white/60 hover:text-white'
                                }`}
                        >
                            <Monitor size={18} />
                        </button>
                        <button
                            onClick={() => BuilderActions.changeView('mobile')}
                            className={`p-2 rounded transition ${view === 'mobile'
                                ? 'bg-white/20 text-white'
                                : 'text-white/60 hover:text-white'
                                }`}
                        >
                            <Smartphone size={18} />
                        </button>
                    </div>

                    <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1">
                        <button
                            onClick={() => BuilderActions.changeZoom(Math.max(50, zoom - 10))}
                            className="p-2 text-white/60 hover:text-white transition"
                        >
                            <ZoomOut size={18} />
                        </button>
                        <span className="text-white text-sm  text-center">{zoom}%</span>
                        <button
                            onClick={() => BuilderActions.changeZoom(Math.min(150, zoom + 10))}
                            className="p-2 text-white/60 hover:text-white transition"
                        >
                            <ZoomIn size={18} />
                        </button>
                    </div>

                    <button
                        onClick={() => BuilderActions.exportHTML()}
                        className="flex items-center gap-2  from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                    >
                        <Download size={18} />
                        Export
                    </button>
                </div>
            </div>
        </div>
    );
}