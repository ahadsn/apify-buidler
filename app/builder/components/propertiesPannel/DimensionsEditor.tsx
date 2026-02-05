import React, {useRef} from 'react';
import { BuilderActions } from '../../actions/builder.actions';
import ActiveSize from './ActiveSize';
import { EditorProps } from './PropertiesPanel.component';
import { fractions, keywords, spacingValues } from '../../elements/css/tailwindruleregistry';
export default function  DimensionsEditor({ element, activeStyles }: EditorProps) {
  // const customWidthRef = useRef<HTMLInputElement>(null);
  // const customHeightRef= useRef<HTMLInputElement>(null);
  // const customMinWidthRef = useRef<HTMLInputElement>(null);
  // const customMaxWidthRef = useRef<HTMLInputElement>(null);
  // const customMinHeightRef= useRef<HTMLInputElement>(null);
  // const customMaxHeightRef = useRef<HTMLInputElement>(null);
  const SizingOptions = [...fractions,...spacingValues]
  const activeWidth = BuilderActions.getValue(activeStyles, 'w-',false);
  const activeHeight = BuilderActions.getValue(activeStyles, 'h-',false);
  const activeMinWidth = BuilderActions.getValue(activeStyles, 'min-w-',false) || 'none';
  const activeMaxWidth = BuilderActions.getValue(activeStyles, 'max-w-',false) || 'none';
  const activeMinHeight = BuilderActions.getValue(activeStyles, 'min-h-',false) || 'none';
  const activeMaxHeight = BuilderActions.getValue(activeStyles, 'max-h-',false) || 'none';

  const widthButtons = React.useMemo(() => {
    return keywords.map(width => (
      <button
        key={width}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'w-', value: width })}
        disabled={activeWidth === width}
        className={`py-1.5 val-2 rounded-md text-xs font-medium transition-all transform active:scale-95 ${
          activeWidth === width
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {width}
      </button>
    ));
  }, [ activeWidth]);

  const valWidthButtons = React.useMemo(() => {
    return SizingOptions.map(val => (
      <button
        key={val}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'w-', value: `${val}` })}
        disabled={activeWidth === val}
        className={`py-1.5 val-2 rounded-md text-xs font-medium transition-all transform active:scale-95 ${
          activeWidth === val
            ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {val}
      </button>
    ));
  }, [ activeWidth]);

  const heightButtons = React.useMemo(() => {
    return keywords.map(height => (
      <button
        key={height}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'h-', value: height })}
        disabled={activeHeight === height}
        className={`py-1.5 val-2 rounded-md text-xs font-medium transition-all transform active:scale-95 ${
          activeHeight === height
            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 ring-2 ring-purple-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {height}
      </button>
    ));
  }, [ activeHeight]);

  const valHeightButtons = React.useMemo(() => {
    return SizingOptions.map(val => (
      <button
        key={val}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'h-', value: `${val}` })}
        disabled={activeHeight === val}
        className={`py-1.5 val-2 rounded-md text-xs font-medium transition-all transform active:scale-95 ${
          activeHeight === val
            ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/30 ring-2 ring-fuchsia-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {val}
      </button>
    ));
  }, [ activeHeight]);
  return (
    <div className="space-y-4">
      {/* Width Section  */}
      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-blue-500 rounded-full"></span>
          Width (Relative)
        </label>
        <div className="grid grid-cols-4 gap-1.5">{widthButtons}</div>
      </div>

      {/* Width Section - */}
      <div className="space-y-2 ">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider  flex items-center gap-2">
          <span className="w-1 h-3 bg-cyan-500 rounded-full"></span>
          Width 
        </label>
        <div className="grid grid-cols-5 p-1 gap-1.5 max-h-32 overflow-y-auto">{valWidthButtons}</div>
               <ActiveSize activeSize={activeWidth||"0"}/>
        {/* <div className="flex gap-2">
          <input
            type="number" 
             min="0"
            ref={customWidthRef}
           onKeyDown={(e)=>{    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  }}
            placeholder="Custom (e.g., 200)"
            className="flex-1 bg-zinc-800 text-white val-3 py-2 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 text-xs transition-all"
          />
          <button
            onClick={() => {
              if (customWidthRef.current?.value) {
                BuilderActions.updateElementStyles(element.id, { prefix: 'w-', value: `[${customWidthRef.current?.value}val]` });
  
              }
            }}
            className="val-4 py-2 bg-cyan-600 text-white rounded-md text-xs font-medium hover:bg-cyan-700 transition-all active:scale-95"
          >
            Apply
          </button>
        </div> */}
      </div>

      {/* Height Section  */}
      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-purple-500 rounded-full"></span>
          Height (Relative)
        </label>
        <div className="grid grid-cols-3 gap-1.5">{heightButtons}</div>
      </div>

      {/* Height Section -  */}
      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-fuchsia-500 rounded-full"></span>
          Height 
        </label>
        <div className="grid grid-cols-5 p-1 gap-1.5 max-h-32 overflow-y-auto">{valHeightButtons}</div>
               <ActiveSize activeSize={activeHeight||'0'}/>
        {/* <div className="flex gap-2">
          <input
           type="number" 
             min="0"
            ref={customHeightRef}
            onKeyDown={(e)=>{    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  }}
            placeholder="Custom (e.g., 300)"
            className="flex-1 bg-zinc-800 text-white val-3 py-2 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 text-xs transition-all"
          />
          <button
            onClick={() => {
              if (customHeightRef.current?.value) {
                BuilderActions.updateElementStyles(element.id, { prefix: 'h-', value: `[${customHeightRef.current?.value}val]`});
              }
            }}
            className="val-4 py-2 bg-fuchsia-600 text-white rounded-md text-xs font-medium hover:bg-fuchsia-700 transition-all active:scale-95"
          >
            Apply
          </button>
        </div> */}
      </div>

      {/* Min Width */}
      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-emerald-500 rounded-full"></span>
          Min Width
        </label>
           
        <select
          value={activeMinWidth}
          onChange={(e) =>
            BuilderActions.updateElementStyles(element.id, {
              prefix: 'min-w-',
              value: e.target.value === '' ? '0p' : `${e.target.value}`,
            })
          }
          className="w-full bg-zinc-800 text-white val-3 py-2 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-xs transition-all cursor-pointer"
        >
          <option value="0" className="bg-zinc-900">
            None
          </option>
          {[ "auto", "full", "screen", "min", "max", "fit"].map(val => (
            <option key={val} value={val} className="bg-zinc-900">
              {val}
            </option>
          ))}
        </select>
               <ActiveSize activeSize={activeMinWidth}/>
        {/* <div className="flex gap-2">
          <input
             type="number" 
             min="0"
            ref={customMinWidthRef}
            onKeyDown={(e)=>{    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  }}    
            placeholder="Custom min-w (e.g., 200)"
            className="flex-1 bg-zinc-800 text-white val-3 py-2 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-xs transition-all"
          />
          <button
            onClick={() => {
              if (customMinWidthRef.current?.value) {
                BuilderActions.updateElementStyles(element.id, { prefix: 'min-w-', value: `[${customMinWidthRef.current?.value}val]` });
                
              }
            }}
            className="val-4 py-2 bg-emerald-600 text-white rounded-md text-xs font-medium hover:bg-emerald-700 transition-all active:scale-95"
          >
            Apply
          </button>
        </div> */}
      </div>

      {/* Max Width */}
      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-teal-500 rounded-full"></span>
          Max Width
        </label>
        <select
          value={activeMaxWidth}
          onChange={(e) =>
            BuilderActions.updateElementStyles(element.id, {
              prefix: 'max-w-',
              value: e.target.value === 'none' ? '' : e.target.value,
            })
          }
          className="w-full bg-zinc-800 text-white val-3 py-2 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-xs transition-all cursor-pointer"
        >
          <option value="0" className="bg-zinc-900">
            None
          </option>
          {["auto", "full", "screen", "min", "max", "fit"].map(val => (
            <option key={val} value={val} className="bg-zinc-900">
              {val}
            </option>
          ))}
        </select>
               <ActiveSize activeSize={activeMaxWidth}/>
        {/* <div className="flex gap-2">
          <input
             type="number" 
             min="0"
            ref={customMaxWidthRef}
            onKeyDown={(e)=>{    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  }}
            placeholder="Custom max-w (e.g., 1200)"
            className="flex-1 bg-zinc-800 text-white val-3 py-2 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-xs transition-all"
          />
          <button
            onClick={() => {
              if (customMaxWidthRef) {
                BuilderActions.updateElementStyles(element.id, { prefix: 'max-w-', value: `[${customMaxWidthRef.current?.value}val]` });

              }
            }}
            className="val-4 py-2 bg-teal-600 text-white rounded-md text-xs font-medium hover:bg-teal-700 transition-all active:scale-95"
          >
            Apply
          </button>
        </div> */}
      </div>

      {/* Min Height */}
      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-amber-500 rounded-full"></span>
          Min Height
        </label>
        <select
          value={activeMinHeight}
          onChange={(e) =>
            BuilderActions.updateElementStyles(element.id, {
              prefix: 'min-h-',
              value: e.target.value === 'none' ? '' : e.target.value,
            })
          }
          className="w-full bg-zinc-800 text-white val-3 py-2 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-xs transition-all cursor-pointer"
        >
          <option value="0" className="bg-zinc-900">
            None
          </option>
          {["auto", "full", "screen", "min", "max", "fit"].map(val => (
            <option key={val} value={val} className="bg-zinc-900">
              {val}
            </option>
          ))}
        </select>
               <ActiveSize activeSize={activeMinHeight}/>
        {/* <div className="flex gap-2">
          <input
 type="number" 
             min="0"
            ref={customMinHeightRef}
         onKeyDown={(e)=>{    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  }}
            placeholder="Custom min-h (e.g., 100)"
            className="flex-1 bg-zinc-800 text-white val-3 py-2 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-xs transition-all"
          />
          <button
            onClick={() => {
              if (customMinHeightRef.current?.value) {
                BuilderActions.updateElementStyles(element.id, { prefix: 'min-h-', value: `[${customMinHeightRef.current?.value}val]` });
            
              }
            }}
            className="val-4 py-2 bg-amber-600 text-white rounded-md text-xs font-medium hover:bg-amber-700 transition-all active:scale-95"
          >
            Apply
          </button>
        </div> */}
      </div>

      {/* Max Height */}
      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-orange-500 rounded-full"></span>
          Max Height
        </label>
        <select
          value={activeMaxHeight}
          onChange={(e) =>
            BuilderActions.updateElementStyles(element.id, {
              prefix: 'max-h-',
              value: e.target.value === 'none' ? '' : e.target.value,
            })
          }
          className="w-full bg-zinc-800 text-white val-3 py-2 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-xs transition-all cursor-pointer"
        >
          <option value="0" className="bg-zinc-900">
            None
          </option>
          {["auto", "full", "screen", "min", "max", "fit"].map(val => (
            <option key={val} value={val} className="bg-zinc-900">
              {val}
            </option>
          ))}
        </select>
               <ActiveSize activeSize={activeMaxHeight}/>
        {/* <div className="flex gap-2">
          <input
             type="number" 
             min="0"
            ref={customMaxHeightRef}
            onKeyDown={(e)=>{    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  }}
            placeholder="Custom max-h (e.g., 600)"
            className="flex-1 bg-zinc-800 text-white val-3 py-2 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-xs transition-all"
          />
          <button
            onClick={() => {
              if (customMaxHeightRef) {
                BuilderActions.updateElementStyles(element.id, { prefix: 'max-h-', value: `[${customMaxHeightRef.current?.value}val]` })
              }
            }}
            className="val-4 py-2 bg-orange-600 text-white rounded-md text-xs font-medium hover:bg-orange-700 transition-all active:scale-95"
          >
            Apply
          </button>
        </div> */}
      </div>
    </div>
  );
};
