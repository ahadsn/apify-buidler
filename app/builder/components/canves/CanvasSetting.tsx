import React from 'react';
import { Palette, Maximize2, Box } from 'lucide-react';
import { useBuilderStore } from '../../store/builder.store';
import { BuilderActions } from '../../actions/builder.actions';
import { GRADIENT_PRESETS } from '../../elements/css/tailwindruleregistry';
import { useDeviceType } from '../../hooks/useDeviceType';

function CanvasSettings() {
    const deviceType = useDeviceType();
    const { canvasBackground, canvasGradient, canvasMaxWidth, canvasPadding } = useBuilderStore();
    
    return (
        <div className={`${deviceType=='pc'?'w-80':'w-52'} h-full bg-black border-l border-zinc-800 overflow-y-auto scrollbar-emerald`}>
            {/* Header */}
            <div className={`sticky top-0 bg-black z-10 ${deviceType=='pc'?'p-4':'p-1.5'} border-b border-zinc-800`}>
                <h2 className={`text-white font-semibold flex items-center ${deviceType=='pc'?'gap-2':'gap-1'} ${deviceType=='pc'?'text-lg':'text-[10px]'}`}>
                    <div className={`${deviceType=='pc'?'p-1.5':'p-0.5'} bg-zinc-900 ${deviceType=='pc'?'rounded-lg':'rounded'}`}>
                        <Palette size={deviceType=='pc'?16:10} className="text-blue-400" />
                    </div>
                    Canvas Settings
                </h2>
               {deviceType=='pc'&& <p className="text-zinc-500 text-xs mt-1">Customize your canvas</p>}
            </div>

            <div className={`${deviceType=='pc'?'p-4 space-y-6':'p-1.5 space-y-2'}`}>
                {/* Background Type */}
                <div className={`${deviceType=='pc'?'space-y-2':'space-y-0.5'}`}>
                    <label className={`text-zinc-400 ${deviceType=='pc'?'text-xs':'text-[9px]'} font-medium uppercase tracking-wider flex items-center ${deviceType=='pc'?'gap-2':'gap-0.5'}`}>
                        <span className={`${deviceType=='pc'?'w-1 h-3':'w-0.5 h-1.5'} bg-blue-500 rounded-full`}></span>
                        {deviceType=='pc'?'Background Type':'BG'}
                    </label>
                    <div className={`grid grid-cols-2 ${deviceType=='pc'?'gap-2':'gap-1'}`}>
                        <button
                            onClick={() => BuilderActions.updateCanvasSettings({ gradient: null, background: canvasBackground || '#ffffff' })}
                            className={`${deviceType=='pc'?'py-2.5 px-3':'py-1 px-1.5'} rounded-md ${deviceType=='pc'?'text-xs':'text-[9px]'} font-medium transition-all transform active:scale-95 ${
                                !canvasGradient 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-1 ring-blue-400/50' 
                                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                            }`}
                        >
                            Solid
                        </button>
                        <button
                            onClick={() => BuilderActions.updateCanvasSettings({ gradient: 'from-blue-500 to-purple-600' })}
                            className={`${deviceType=='pc'?'py-2.5 px-3':'py-1 px-1.5'} rounded-md ${deviceType=='pc'?'text-xs':'text-[9px]'} font-medium transition-all transform active:scale-95 ${
                                canvasGradient 
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-1 ring-blue-400/50' 
                                    : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                            }`}
                        >
                            Grad
                        </button>
                    </div>
                </div>

                {/* Solid Color Section */}
                {!canvasGradient ? (
                    <div className={`${deviceType=='pc'?'space-y-3':'space-y-1.5'}`}>
                        <label className={`text-zinc-400 ${deviceType=='pc'?'text-xs':'text-[9px]'} font-medium uppercase tracking-wider flex items-center ${deviceType=='pc'?'gap-2':'gap-0.5'}`}>
                            <span className={`${deviceType=='pc'?'w-1 h-3':'w-0.5 h-1.5'} bg-purple-500 rounded-full`}></span>
                            {deviceType=='pc'?'Color Picker':'Color'}
                        </label>
                        
                        {/* Color Input */}
                        <div className={`flex ${deviceType=='pc'?'gap-2':'gap-1'}`}>
                            <div className="relative group">
                                <input
                                    type="color"
                                    value={canvasBackground}
                                    onChange={(e) => BuilderActions.updateCanvasSettings({ background: e.target.value })}
                                    className={`${deviceType=='pc'?'w-14 h-14':'w-8 h-8'} rounded-md border-2 border-zinc-800 cursor-pointer hover:border-zinc-700 transition-colors`}
                                />
                                <div className="absolute inset-0 rounded-md bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            </div>
                            <input
                                type="text"
                                value={canvasBackground}
                                onChange={(e) => BuilderActions.updateCanvasSettings({ background: e.target.value })}
                                className={`flex-1 bg-zinc-900 text-white ${deviceType=='pc'?'px-3 py-2':'px-1.5 py-1'} rounded-md border border-zinc-800 hover:border-zinc-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 ${deviceType=='pc'?'text-sm':'text-[9px]'} font-mono transition-all`}
                                placeholder="#000000"
                            />
                        </div>

                        {/* Color Presets */}
                        <div className={`grid ${deviceType=='pc'?'grid-cols-6':'grid-cols-4'} ${deviceType=='pc'?'gap-2':'gap-1'}`}>
                            {['#ffffff', '#f3f4f6', '#e5e7eb', '#1f2937', '#111827', '#000000'].map((color, i) => (
                                deviceType=='pc' || i < 4 ? (
                                <button
                                    key={color}
                                    onClick={() => BuilderActions.updateCanvasSettings({ background: color })}
                                    className={`${deviceType=='pc'?'h-12':'h-7'} rounded-md border-2 transition-all transform hover:scale-110 active:scale-95 ${
                                        canvasBackground === color 
                                            ? 'border-blue-500 shadow-lg shadow-blue-500/30 ring-1 ring-blue-400/30' 
                                            : 'border-zinc-800 hover:border-zinc-700'
                                    }`}
                                    style={{ backgroundColor: color }}
                                    title={color}
                                />
                                ) : null
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={`${deviceType=='pc'?'space-y-3':'space-y-1.5'}`}>
                        <label className={`text-zinc-400 ${deviceType=='pc'?'text-xs':'text-[9px]'} font-medium uppercase tracking-wider flex items-center ${deviceType=='pc'?'gap-2':'gap-0.5'}`}>
                            <span className={`${deviceType=='pc'?'w-1 h-3':'w-0.5 h-1.5'} bg-purple-500 rounded-full`}></span>
                            {deviceType=='pc'?'Gradient Presets':'Gradients'}
                        </label>
                        <div className={`${deviceType=='pc'?'space-y-2':'space-y-1'} ${deviceType=='pc'?'max-h-80':'max-h-56'} overflow-y-auto pr-0.5 custom-scrollbar`}>
                            {GRADIENT_PRESETS.map((preset) => (
                                <button
                                    key={preset.name}
                                    onClick={() => BuilderActions.updateCanvasSettings({ gradient: preset.value })}
                                    className={`w-full ${deviceType=='pc'?'h-14':'h-8'} rounded-md bg-linear-to-r ${preset.value} border-2 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center group ${
                                        canvasGradient === preset.value 
                                            ? 'border-blue-500 shadow-lg ring-1 ring-blue-400/30' 
                                            : 'border-zinc-800 hover:border-zinc-700'
                                    }`}
                                >
                                    <span className={`text-white ${deviceType=='pc'?'text-xs':'text-[8px]'} font-semibold bg-black/50 backdrop-blur-sm ${deviceType=='pc'?'px-3 py-1.5':'px-1.5 py-0.5'} rounded group-hover:bg-black/60 transition-colors`}>
                                        {preset.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Max Width */}
                <div className={`${deviceType=='pc'?'space-y-2':'space-y-0.5'}`}>
                    <label className={`text-zinc-400 ${deviceType=='pc'?'text-xs':'text-[9px]'} font-medium uppercase tracking-wider flex items-center ${deviceType=='pc'?'gap-2':'gap-0.5'}`}>
                        <span className={`${deviceType=='pc'?'w-1 h-3':'w-0.5 h-1.5'} bg-emerald-500 rounded-full`}></span>
                        {deviceType=='pc'?'Max Width':'Width'}
                    </label>
                    <div className={`grid ${deviceType=='pc'?'grid-cols-3':'grid-cols-2'} ${deviceType=='pc'?'gap-2':'gap-1'}`}>
                        {(deviceType=='pc' ? ['800px', '1000px', '1200px', '1400px', '1600px', '100%'] : ['800px', '1200px', '1600px', '100%']).map(width => (
                            <button
                                key={width}
                                onClick={() => BuilderActions.updateCanvasSettings({ maxWidth: width })}
                                className={`${deviceType=='pc'?'py-2.5 px-2':'py-1 px-1'} rounded-md ${deviceType=='pc'?'text-xs':'text-[9px]'} font-medium transition-all transform active:scale-95 ${
                                    canvasMaxWidth === width
                                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400/50'
                                        : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                                }`}
                            >
                                {width}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Padding */}
                <div className={`${deviceType=='pc'?'space-y-2':'space-y-0.5'}`}>
                    <label className={`text-zinc-400 ${deviceType=='pc'?'text-xs':'text-[9px]'} font-medium uppercase tracking-wider flex items-center ${deviceType=='pc'?'gap-2':'gap-0.5'}`}>
                        <span className={`${deviceType=='pc'?'w-1 h-3':'w-0.5 h-1.5'} bg-orange-500 rounded-full`}></span>
                        {deviceType=='pc'?'Padding':'Pad'}
                    </label>
                    <div className={`grid ${deviceType=='pc'?'grid-cols-3':'grid-cols-2'} ${deviceType=='pc'?'gap-2':'gap-1'}`}>
                        {(deviceType=='pc' ? ['0px', '16px', '24px', '32px', '48px', '64px'] : ['0px', '16px', '32px', '64px']).map(pad => (
                            <button
                                key={pad}
                                onClick={() => BuilderActions.updateCanvasSettings({ padding: pad })}
                                className={`${deviceType=='pc'?'py-2.5 px-2':'py-1 px-1'} rounded-md ${deviceType=='pc'?'text-xs':'text-[9px]'} font-medium transition-all transform active:scale-95 ${
                                    canvasPadding === pad
                                        ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/30 ring-1 ring-orange-400/50'
                                        : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
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

export default CanvasSettings;