import React, { useState } from 'react';
import { BuilderActions } from '../../actions/builder.actions';
import { BorderRadiusValues, ShadowValues, SWATCH_PALETTE} from '../../elements/css/tailwindruleregistry';
import ActiveSize from './ActiveSize';
import { EditorProps } from './PropertiesPanel.component';

function BorderEditor({ element, activeStyles }: EditorProps) {
  // const [customWidth, setCustomWidth] = useState('');
  // const [customRadius, setCustomRadius] = useState('');

  // Get active values
  const activeBorderWidth = BuilderActions.getValue(activeStyles, 'border-',false) || 'none';
  const activeBorderColor = BuilderActions.getValue(activeStyles, 'border-',false) || 'none';
  const activeRounded = BuilderActions.getValue(activeStyles, 'rounded-',false) || 'none';
  const activeShadow = BuilderActions.getValue(activeStyles, 'shadow-',false) || 'none';

  const borderWidthOptions = ['0', '2', '4', '8'];



  // Border Width buttons
  const borderWidthButtons = React.useMemo(() => {
    return borderWidthOptions.map(width => (
      <button
        key={width}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'border-', value: width })}
        disabled={activeBorderWidth === width}
        className={`py-1.5 px-2 rounded-md text-xs w-full font-medium transition-all transform active:scale-95 ${
          activeBorderWidth === width
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {width}
      </button>
    ));
  }, [borderWidthOptions, activeBorderWidth]);

  // Border Radius buttons
  const borderRadiusButtons = React.useMemo(() => {
    return BorderRadiusValues.map(radius => (
      <button
        key={radius}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'rounded-', value:  radius })}
        disabled={activeRounded === radius }
        className={`py-1.5 px-2 rounded-md text-xs font-medium transition-all transform active:scale-95 ${
          activeRounded === radius 
            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 ring-2 ring-purple-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {radius}
      </button>
    ));
  }, [ activeRounded]);

  // Shadow buttons
  const shadowButtons = React.useMemo(() => {
    return ShadowValues.map(shadow => (
      <button
        key={shadow}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'shadow-', value: shadow })}
        disabled={activeShadow === shadow }
        className={`py-1.5 px-2 rounded-md text-xs font-medium transition-all transform active:scale-95 ${
          activeShadow === shadow
            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {shadow}
      </button>
    ));
  }, [ activeShadow]);

  return (
    <div className="space-y-4">
      {/* Border Width */}
      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-blue-500 rounded-full"></span>
          Border Width
        </label>
        <div className="grid grid-cols-4 gap-1.5">{borderWidthButtons}</div>
               <ActiveSize activeSize={activeBorderWidth}/>
        {/* <div className="flex gap-2">
          <input
             type="number" 
             min="0"
            value={customWidth}
            onChange={(e) => setCustomWidth(e.target.value)}
            placeholder="Custom (e.g., 3)"
            className="flex-1 bg-zinc-800 text-white px-3 py-2 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-xs transition-all"
          />
          <button
            onClick={() => {
              if (customWidth) {
                BuilderActions.updateElementStyles(element.id, { prefix: 'border-', value: `[${customWidth}px]`});
                setCustomWidth('');
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-xs font-medium hover:bg-blue-700 transition-all active:scale-95"
          >
            Apply
          </button>
        </div> */}
      </div>

      {/* Border Color */}
      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-pink-500 rounded-full"></span>
          Border Color
        </label>
        <div className="grid grid-cols-6 gap-2">
          {SWATCH_PALETTE.slice(0, 18).map(color => (
            <button
              key={color.value}
              onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'border-', value: color.value })}
              className={`h-8 rounded-md border-2 transition-all transform hover:scale-110 active:scale-95 ${
                activeBorderColor === color.value
                  ? 'border-pink-400 ring-2 ring-pink-400/50 scale-110'
                  : 'border-zinc-700/50 hover:border-zinc-600'
              } ${color.swatchClass}`}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Border Radius */}
      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-purple-500 rounded-full"></span>
          Border Radius
        </label>
        <div className="grid grid-cols-4 gap-1.5">{borderRadiusButtons}</div>
    
      </div>

      {/* Shadow */}
      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-emerald-500 rounded-full"></span>
          Shadow
        </label>
        <div className="grid grid-cols-4 gap-1.5">{shadowButtons}</div>
      </div>
    </div>
  );
}

export default BorderEditor;