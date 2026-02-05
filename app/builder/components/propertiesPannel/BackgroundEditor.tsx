import React, { useState } from 'react';
import { SWATCH_PALETTE, GRADIENT_PRESETS, GradientPreset, OpacityValues } from '../../elements/css/tailwindruleregistry';
import { BuilderActions } from '../../actions/builder.actions';
import { EditorProps } from './PropertiesPanel.component';
import { after } from 'node:test';

function BackgroundEditor({ element, activeStyles }: EditorProps) {
  const [bgType, setBgType] = useState<'solid' | 'gradient'>('solid');

  // Get active values
  const activeBgColor = BuilderActions.getValue(activeStyles, 'bg-',false) || 'transparent';

  const activeOpacity = BuilderActions.getValue(activeStyles, 'opacity-',false) || '100';


  // Opacity buttons
  const opacityButtons = React.useMemo(() => {
    return OpacityValues.map(op => (
      <button
        key={op}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'opacity-', value: op })}
        disabled={activeOpacity === op}
        className={`py-1.5 px-2 rounded-md text-xs font-medium transition-all transform active:scale-95 ${
          activeOpacity === op
            ? 'bg-lime-600 text-white shadow-lg shadow-lime-500/30 ring-2 ring-lime-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {op}%
      </button>
    ));
  }, [ activeOpacity]);
 
  return (
    <div className="space-y-4">
      {/* Background Type Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setBgType('solid')}
          className={`flex-1 py-2.5 rounded-md text-xs font-medium uppercase tracking-wider transition-all transform active:scale-95 ${
            bgType === 'solid'
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400/50'
              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
          }`}
        >
          Solid
        </button>
        <button
          onClick={() => setBgType('gradient')}
          className={`flex-1 py-2.5 rounded-md text-xs font-medium uppercase tracking-wider transition-all transform active:scale-95 ${
            bgType === 'gradient'
              ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30 ring-2 ring-purple-400/50'
              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
          }`}
        >
          Gradient
        </button>
      </div>

      {bgType === 'solid' ? (
        <div className="space-y-2">
          <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
            <span className="w-1 h-3 bg-blue-500 rounded-full"></span>
            Background Color
          </label>
          <div className="grid grid-cols-6 gap-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800/50">
            {SWATCH_PALETTE.map(color => (
              <button
                key={color.value}
                onClick={() =>
                  BuilderActions.updateElementStyles(element.id, {
                    prefix: 'bg-',
                    value: color.value,
                  })
                }
                className={`h-8 rounded-md border-2 transition-all transform hover:scale-110 active:scale-95 ${
                  activeBgColor === color.value
                    ? 'border-blue-400 ring-2 ring-blue-400/50 scale-110'
                    : 'border-zinc-700/50 hover:border-zinc-600'
                } ${color.swatchClass} ${color.needsBorder ? 'border-dashed' : ''}`}
                title={color.name}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
            <span className="w-1 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
            Gradient Presets
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800/50">
            {GRADIENT_PRESETS.map((preset: GradientPreset) => (
              <button
                key={preset.name}
                onClick={() =>
                  BuilderActions.updateElementStyles(element.id, {
                    prefix: 'bg-gradient-',
                    value: preset.classes,
                  })
                }
                className={`w-full h-12 rounded-md bg-gradient-${preset.classes} border-2 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center 
             
                `}
              >
                <span className="text-white text-xs font-semibold bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-lg">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Opacity */}
      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-lime-500 rounded-full"></span>
          Opacity
        </label>
        <div className="grid grid-cols-6 gap-1.5">{opacityButtons}</div>
             
      <div className="flex gap-2">
        </div>
      </div>
    </div>
  );
}

export default BackgroundEditor;