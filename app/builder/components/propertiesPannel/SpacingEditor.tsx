import React from 'react';

import { BuilderActions } from '../../actions/builder.actions';
import ActiveSize from './ActiveSize';
// import { useRef } from "react";
import { EditorProps } from './PropertiesPanel.component';

function SpacingEditor( { element, activeStyles }: EditorProps) {
  // const customPRef= useRef<HTMLInputElement>(null);
  // const customMRef= useRef<HTMLInputElement>(null);
  

  // Get active values
  const activeP = BuilderActions.getValue(activeStyles, 'p-',false) || 'none';
  const activeM = BuilderActions.getValue(activeStyles, 'm-',false) || 'none';
  const spacingOptions = ['0', '1', '2', '4', '6', '8', '12', '16', '20', '24'];

  const unifiedPaddingButtons = React.useMemo(() => {
    return spacingOptions.map(value => (
      <button
        key={value}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'p-', value: value })}
        disabled={activeP === value}
        className={`py-1.5 px-2 rounded-md text-xs font-medium transition-all transform active:scale-95 ${
          activeP === value
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {value}
      </button>
    ));
  }, [spacingOptions, activeP]);


  const unifiedMarginButtons = React.useMemo(() => {
    return spacingOptions.map(value => (
      <button
        key={value}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'm-', value: value })}
        disabled={activeM === value}
        className={`py-1.5 px-2 rounded-md text-xs font-medium transition-all transform active:scale-95 ${
          activeM === value
            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {value}
      </button>
    ));
  }, [spacingOptions, activeM]);

  return (
    <div className="space-y-4">

      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-blue-500 rounded-full"></span>
          Padding (All Sides)
        </label>
        <div className="grid grid-cols-5 gap-1.5">{unifiedPaddingButtons}</div>
               <ActiveSize activeSize={activeP}/>
        {/* <div className="flex gap-2">
          <input
             type="number" 
             min="0"
           ref={customPRef}
              onKeyDown={(e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  }}
            
            placeholder="Custom value"
            className="flex-1 bg-zinc-800 text-white px-3 py-2 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-xs transition-all"
          />
          <button
            onClick={() => {
              if (customPRef.current?.value) {
                BuilderActions.updateElementStyles(element.id, { prefix: 'p-', value: `[${String(customPRef.current?.value)}px]` });
            
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-xs font-medium hover:bg-blue-700 transition-all active:scale-95"
          >
            Apply
          </button>
        </div> */}
      </div>

     
      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-purple-500 rounded-full"></span>
          Padding (Individual)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Top', key: 'pt' },
            { label: 'Right', key: 'pr' },
            { label: 'Bottom', key: 'pb' },
            { label: 'Left', key: 'pl' },
          ].map(({ label, key }) => (
            <select
              key={key}
              value={BuilderActions.getValue(activeStyles, `${key}-`,false) || '0'}
              onChange={(e) => BuilderActions.updateElementStyles(element.id, { prefix: `${key}-`, value: e.target.value })}
              className="w-full bg-zinc-800 text-white px-3 py-2 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-xs transition-all cursor-pointer"
            >
              <option value="0" className="bg-zinc-900">{label}: None</option>
              {Object.entries(spacingOptions).map(([k, v]) => (
                <option key={k} value={k} className="bg-zinc-900">
                  {label}: {k}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>

     
      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-emerald-500 rounded-full"></span>
          Margin (All Sides)
        </label>
        <div className="grid grid-cols-5 gap-1.5">{unifiedMarginButtons}</div>
               <ActiveSize activeSize={activeM}/>
        {/* <div className="flex gap-2">
          <input
            type="number" 
             min="0"
             ref={customMRef}
    onKeyDown={(e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  }}
            placeholder="Custom value"
            className="flex-1 bg-zinc-800 text-white px-3 py-2 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-xs transition-all"
          />
          <button
            onClick={() => {
              if (customMRef.current?.value) {
                BuilderActions.updateElementStyles(element.id, { prefix: 'm-', value: `[${String(customMRef.current?.value)}px]` });
                
              }
            }}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md text-xs font-medium hover:bg-emerald-700 transition-all active:scale-95"
          >
            Apply
          </button>
        </div> */}
      </div>

      {/* Individual Margin */}
      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-cyan-500 rounded-full"></span>
          Margin (Individual)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Top', key: 'mt' },
            { label: 'Right', key: 'mr' },
            { label: 'Bottom', key: 'mb' },
            { label: 'Left', key: 'ml' },
          ].map(({ label, key }) => (
            <select
              key={key}
              value={BuilderActions.getValue(activeStyles, `${key}-`,false) || '0'}
              onChange={(e) => BuilderActions.updateElementStyles(element.id, { prefix: `${key}-`, value: e.target.value })}
              className="w-full bg-zinc-800 text-white px-3 py-2 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-xs transition-all cursor-pointer"
            >
              <option value="0" className="bg-zinc-900">{label}: None</option>
              {Object.entries(spacingOptions).map(([k, v]) => (
                <option key={k} value={k} className="bg-zinc-900">
                  {label}: {k}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SpacingEditor;