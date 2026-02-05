import React, { useRef, useState } from 'react';
import { BuilderActions } from '../../actions/builder.actions';
import { useDeviceType } from '../../hooks/useDeviceType';
import ActiveSize from './ActiveSize';
import { EditorProps } from './PropertiesPanel.component';
import { positions, zIndexes } from '../../elements/css/tailwindruleregistry';

function AdvancedEditor({ element, activeStyles }: EditorProps) {
  const deviceType = useDeviceType();
  // const customZIndexRef = useRef<HTMLInputElement>(null);

  // Get active values
  
  const activePosition = BuilderActions.getValue(activeStyles, 'position',true) 
  const checkPosition = BuilderActions.getValue(activeStyles, 'position-',false) 
 
  const activeOverflow = BuilderActions.getValue(activeStyles, 'overflow-',false) || 'visible';
  const activeTransition = BuilderActions.getValue(activeStyles, 'transition-',false) || 'none';
  const activeZIndex = BuilderActions.getValue(activeStyles, 'z-',false) || '0';
  const overflowOptions = ['visible', 'hidden', 'scroll', 'auto'];
  const transitionOptions = ['none', 'all', 'colors', 'opacity', 'shadow', 'transform'];

  // Position buttons
  const positionButtons = React.useMemo(() => {
    return positions.map(pos => (
      <button
        key={pos.name}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: '', value: pos.name })}
        disabled={activePosition === pos.name||(checkPosition=='none'&&pos.name=='position-none')}
        className={`${deviceType=='pc'?'py-1.5 px-2':'py-1 px-1.5'} ${deviceType=='pc'?'rounded-md':'rounded'} ${deviceType=='pc'?'text-xs':'text-[10px]'} font-medium capitalize transition-all transform active:scale-95 ${
          activePosition === pos.name||(checkPosition=='none'&&pos.name=='position-none')
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-1 ring-blue-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {pos.name}
      </button>
    ));
  }, [ activePosition, deviceType]);

  // Overflow buttons
  const overflowButtons = React.useMemo(() => {
    return overflowOptions.map(ov => (
      <button
        key={ov}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'overflow-', value: ov })}
        disabled={activeOverflow === ov}
        className={`${deviceType=='pc'?'py-1.5 px-2':'py-1 px-1.5'} ${deviceType=='pc'?'rounded-md':'rounded'} ${deviceType=='pc'?'text-xs':'text-[10px]'} font-medium capitalize transition-all transform active:scale-95 ${
          activeOverflow === ov
            ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30 ring-1 ring-amber-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {ov}
      </button>
    ));
  }, [overflowOptions, activeOverflow, deviceType]);

  // Transition buttons
  const transitionButtons = React.useMemo(() => {
    return transitionOptions.map(trans => (
      <button
        key={trans}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'transition-', value: trans })}
        disabled={activeTransition === trans}
        className={`${deviceType=='pc'?'py-1.5 px-2':'py-1 px-1'} ${deviceType=='pc'?'rounded-md':'rounded'} ${deviceType=='pc'?'text-xs':'text-[9px]'} font-medium capitalize transition-all transform active:scale-95 ${
          activeTransition === trans
            ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30 ring-1 ring-violet-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {trans}
      </button>
    ));
  }, [transitionOptions, activeTransition, deviceType]);

  // Z-Index buttons
  const zIndexButtons = React.useMemo(() => {
    return zIndexes.map(z => (
      <button
        key={z}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'z-', value: z })}
        disabled={activeZIndex === z}
        className={`${deviceType=='pc'?'py-1.5 px-2':'py-1 px-1.5'} ${deviceType=='pc'?'rounded-md':'rounded'} ${deviceType=='pc'?'text-xs':'text-[10px]'} font-medium transition-all transform active:scale-95 ${
          activeZIndex === z
            ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30 ring-1 ring-cyan-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {z}
      </button>
    ));
  }, [ activeZIndex, deviceType]);

  return (
    <div className={deviceType=='pc'?'space-y-4':'space-y-2'}>
      {/* Position */}
      <div className={deviceType=='pc'?'space-y-2':'space-y-1'}>
        <label className={`text-zinc-400 ${deviceType=='pc'?'text-xs':'text-[10px]'} font-medium uppercase tracking-wider flex items-center ${deviceType=='pc'?'gap-2':'gap-1'}`}>
          <span className={`${deviceType=='pc'?'w-1 h-3':'w-0.5 h-2'} bg-blue-500 rounded-full`}></span>
          Position
        </label>
        <div className={`grid ${deviceType=='pc'?'grid-cols-3':'grid-cols-2'} ${deviceType=='pc'?'gap-1.5':'gap-1'}`}>{positionButtons}</div>
      </div>

      {/* Overflow */}
      <div className={deviceType=='pc'?'space-y-2':'space-y-1'}>
        <label className={`text-zinc-400 ${deviceType=='pc'?'text-xs':'text-[10px]'} font-medium uppercase tracking-wider flex items-center ${deviceType=='pc'?'gap-2':'gap-1'}`}>
          <span className={`${deviceType=='pc'?'w-1 h-3':'w-0.5 h-2'} bg-amber-500 rounded-full`}></span>
          Overflow
        </label>
        <div className={`grid grid-cols-${deviceType=='pc'?'4':'2'} ${deviceType=='pc'?'gap-1.5':'gap-1'}`}>{overflowButtons}</div>
      </div>

      {/* Transition */}
      <div className={deviceType=='pc'?'space-y-2':'space-y-1'}>
        <label className={`text-zinc-400 ${deviceType=='pc'?'text-xs':'text-[10px]'} font-medium uppercase tracking-wider flex items-center ${deviceType=='pc'?'gap-2':'gap-1'}`}>
          <span className={`${deviceType=='pc'?'w-1 h-3':'w-0.5 h-2'} bg-violet-500 rounded-full`}></span>
          Transition
        </label>
        <div className={`grid ${deviceType=='pc'?'grid-cols-3':'grid-cols-2'} ${deviceType=='pc'?'gap-1.5':'gap-1'}`}>{transitionButtons}</div>
      </div>

      {/* Z-Index */}
      <div className={deviceType=='pc'?'space-y-2':'space-y-1'}>
        <label className={`text-zinc-400 ${deviceType=='pc'?'text-xs':'text-[10px]'} font-medium uppercase tracking-wider flex items-center ${deviceType=='pc'?'gap-2':'gap-1'}`}>
          <span className={`${deviceType=='pc'?'w-1 h-3':'w-0.5 h-2'} bg-cyan-500 rounded-full`}></span>
          Z-Index
        </label>
        <div className={`grid ${deviceType=='pc'?'grid-cols-5':'grid-cols-3'} ${deviceType=='pc'?'gap-1.5':'gap-1'}`}>{zIndexButtons}</div>
        <ActiveSize activeSize={activeZIndex}/>
        <div className={`flex ${deviceType=='pc'?'gap-2':'gap-1'}`}>
          {/* <input
             type="number" 
             min="0"
            ref={customZIndexRef}
           onKeyDown={(e)=> {   if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  }}
            placeholder="Custom (e.g., 100)"
            className={`flex-1 bg-zinc-800 text-white ${deviceType=='pc'?'px-3 py-2':'px-2 py-1.5'} ${deviceType=='pc'?'rounded-md':'rounded'} border border-zinc-700 hover:border-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 ${deviceType=='pc'?'text-xs':'text-[10px]'} transition-all`}
          /> */}
          {/* <button
            onClick={() => {
              if (customZIndexRef.current?.value) {
                BuilderActions.updateElementStyles(element.id, { prefix: 'z-', value: `[${customZIndexRef.current?.value}px]` });
              }
            }}
            className={`${deviceType=='pc'?'px-4 py-2':'px-3 py-1.5'} bg-cyan-600 text-white ${deviceType=='pc'?'rounded-md':'rounded'} ${deviceType=='pc'?'text-xs':'text-[10px]'} font-medium hover:bg-cyan-700 transition-all active:scale-95`}
          >
            Apply
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default AdvancedEditor;