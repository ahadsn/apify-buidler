import React from 'react';
import { BuilderActions } from '../../actions/builder.actions';
import { EditorProps } from './PropertiesPanel.component';
import { useDeviceType } from '../../hooks/useDeviceType';
import { displays, GridColValues, justifyMap } from '../../elements/css/tailwindruleregistry';




function LayoutEditor({ element, activeStyles }: EditorProps) {
 
  const activeDisplay = BuilderActions.getValue(activeStyles, 'display',true)||'display-deafult';
  const activeGridCols = BuilderActions.getValue(activeStyles, 'grid-cols-',false);
  const activeFlexDirection = BuilderActions.getValue(activeStyles, 'flex-',false);
  const activeGap = BuilderActions.getValue(activeStyles, 'gap-',false);
  const activeJustifyContent = BuilderActions.getValue(activeStyles, 'justify-',false);
  const activeAlignItems = BuilderActions.getValue(activeStyles, 'items-',false);
   const deviceType = useDeviceType();

  
  const gridColumnsButtons = React.useMemo(() => {
    return GridColValues.map(cols => (
      <button
        key={cols}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'grid-cols-', value: cols })}
        disabled={activeGridCols === cols}
        className={`py-1.5 px-2 rounded-md text-xs font-medium transition-all transform active:scale-95 ${
          activeGridCols === cols
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {cols}
      </button>
    ));
  }, [activeGridCols]);

    // Overflow buttons
    const displayButtons = () => (
       displays.map(ov => (
        <button
          key={ov.name}
          onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: '', value: ov.name, })}
          disabled={activeDisplay === ov.name}
          className={`${deviceType=='pc'?'py-1.5 px-2':'py-1 px-1.5'} ${deviceType=='pc'?'rounded-md':'rounded'} ${deviceType=='pc'?'text-xs':'text-[8px]'} font-medium capitalize transition-all transform active:scale-95 ${
            activeDisplay === ov.name
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/30 ring-1 ring-amber-400/50'
              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
          }`}
        >
          {ov.name=='display-default'?'default':ov.name}
        </button>
      ))
  ) 

  const gapButtons = React.useMemo(() => {
    return ['0', '1', '2', '4', '6', '8', '12', '16'].map(gap => (
      <button
        key={gap}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'gap-', value: gap })}
        disabled={activeGap === gap}
        className={`py-1.5 px-2 rounded-md text-xs font-medium transition-all transform active:scale-95 ${
          activeGap === gap
            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {gap}
      </button>
    ));
  }, [activeGap]);

  const flexDirectionButtons = React.useMemo(() => {
    return [
      { value: 'row', label: 'Row →' },
      { value: 'col', label: 'Column ↓' },
    ].map(({ value, label }) => (
      <button
        key={value}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'flex-', value: value })}
        disabled={activeFlexDirection === value}
        className={`py-1.5 px-2 rounded-md text-xs font-medium transition-all transform active:scale-95 ${
          activeFlexDirection === value
            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 ring-2 ring-purple-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {label}
      </button>
    ));
  }, [activeFlexDirection]);

  const justifyContentButtons = React.useMemo(() => {
    return Object.keys(justifyMap).map((justify) => (
      <button
        key={justify}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'justify-', value: justify })}
        disabled={activeJustifyContent === justify}
        className={`py-1.5 px-2 rounded-md text-xs font-medium capitalize transition-all transform active:scale-95 ${
          activeJustifyContent === justify
            ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {justify}
      </button>
    ));
  }, [activeJustifyContent]);

  const alignItemsButtons = React.useMemo(() => {
    return ['start', 'center', 'end', 'stretch'].map(align => (
      <button
        key={align}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'items-', value: align })}
        disabled={activeAlignItems === align}
        className={`py-1.5 px-2 rounded-md text-xs font-medium capitalize transition-all transform active:scale-95 ${
          activeAlignItems === align
            ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/30 ring-2 ring-pink-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {align}
      </button>
    ));
  }, [activeAlignItems]);

  return(
    <div className="">
         <div className={deviceType=='pc'?'space-y-2 pb-3':'space-y-1 pb-2'}>
        <label className={`text-zinc-400 ${deviceType=='pc'?'text-xs':'text-[10px]'} font-medium uppercase tracking-wider flex items-center ${deviceType=='pc'?'gap-2':'gap-1'}`}>
          <span className={`${deviceType=='pc'?'w-1 h-3':'w-0.5 h-2'} bg-blue-500 rounded-full`}></span>
          Position
        </label>
        <div className={`grid ${deviceType=='pc'?'grid-cols-3':'grid-cols-2'} ${deviceType=='pc'?'gap-1.5':'gap-1'}`}>{displayButtons()}</div>
      </div>

{ activeDisplay=='grid' ?
      <div className="space-y-4">
     <div className="space-y-2">
          <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
            <span className="w-1 h-3 bg-blue-500 rounded-full"></span>
            Grid Columns
          </label>
          <div className="grid grid-cols-4 gap-1.5">{gridColumnsButtons}</div>
        </div>
        <div className="space-y-2">
          <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
            <span className="w-1 h-3 bg-emerald-500 rounded-full"></span>
            Gap
          </label>
          <div className="grid grid-cols-6 gap-1.5">{gapButtons}</div>
        </div>
      </div>
  : activeDisplay=='flex' ?
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-purple-500 rounded-full"></span>
          Flex Direction
        </label>
        <div className="grid grid-cols-2 gap-1.5">{flexDirectionButtons}</div>
      </div>

      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-cyan-500 rounded-full"></span>
          Justify Content
        </label>
        <div className="grid grid-cols-3 gap-1.5">{justifyContentButtons}</div>
      </div>

      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-pink-500 rounded-full"></span>
          Align Items
        </label>
        <div className="grid grid-cols-4 gap-1.5">{alignItemsButtons}</div>
      </div>

      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-emerald-500 rounded-full"></span>
          Gap
        </label>
        <div className="grid grid-cols-6 gap-1.5">{gapButtons}</div>
      </div>
    </div>:<div></div>}
  </div>
  )
  
};

export default React.memo(LayoutEditor);