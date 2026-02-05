import React, { useMemo, useRef }  from 'react';
import { BuilderActions } from '../../actions/builder.actions';
import { SWATCH_PALETTE, tailwindPickerOptions } from '../../elements/css/tailwindruleregistry';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import ActiveSize from './ActiveSize';
import { EditorProps } from './PropertiesPanel.component';


function TypographyEditor({ element, activeStyles }: EditorProps) {
  const customFontSizeRef=useRef<HTMLInputElement>(null)

  
  const activeFontSize = BuilderActions.getValue(activeStyles, 'text-',false) || 'base';
  const activeFontWeight = BuilderActions.getValue(activeStyles, 'font-',false) || 'normal';
  const activeLineHeight = BuilderActions.getValue(activeStyles, 'leading-',false) || 'normal';
  const activeLetterSpacing = BuilderActions.getValue(activeStyles, 'tracking-',false) || 'normal';
  const activeTextColor = BuilderActions.getValue(activeStyles, 'text-',false) || 'black';
  const activeTextAlign = BuilderActions.getValue(activeStyles, 'text-',false) || 'left';




const fontSizeOptions = useMemo(() => tailwindPickerOptions('text-').map(o => o.label), []);
const fontWeightOptions = useMemo(() => tailwindPickerOptions('font-').map(o => o.label), []);
const lineHeightOptions = useMemo(() => tailwindPickerOptions('leading-').map(o => o.label), []);
const letterSpacingOptions = useMemo(() => tailwindPickerOptions('tracking-').map(o => o.label), []);


  // Font Size buttons
  const fontSizeButtons = React.useMemo(() => {
    return fontSizeOptions.map(size => (
      <button
        key={size}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'text-', value: size })}
        disabled={activeFontSize === size}
        className={`py-1.5 px-2 rounded-md text-xs font-medium transition-all transform active:scale-95 ${
          activeFontSize === size
            ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/30 ring-2 ring-rose-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {size}
      </button>
    ));
  }, [fontSizeOptions, activeFontSize]);

  // Font Weight buttons
  const fontWeightButtons = React.useMemo(() => {
    return fontWeightOptions.map(weight => (
      <button
        key={weight}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'font-', value: weight })}
        disabled={activeFontWeight === weight}
        className={`py-1.5 px-2 rounded-md text-xs font-medium capitalize transition-all transform active:scale-95 ${
          activeFontWeight === weight
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {weight}
      </button>
    ));
  }, [fontWeightOptions, activeFontWeight]);

  // Line Height buttons
  const lineHeightButtons = React.useMemo(() => {
    return lineHeightOptions.map(lh => (
      <button
        key={lh}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'leading-', value: lh })}
        disabled={activeLineHeight === lh}
        className={`py-1.5 px-2 rounded-md text-xs font-medium capitalize transition-all transform active:scale-95 ${
          activeLineHeight === lh
            ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/30 ring-2 ring-teal-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {lh}
      </button>
    ));
  }, [lineHeightOptions, activeLineHeight]);

  // Letter Spacing buttons
  const letterSpacingButtons = React.useMemo(() => {
    return letterSpacingOptions.map(ls => (
      <button
        key={ls}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'tracking-', value: ls })}
        disabled={activeLetterSpacing === ls}
        className={`py-1.5 px-2 rounded-md text-xs font-medium capitalize transition-all transform active:scale-95 ${
          activeLetterSpacing === ls
            ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/30 ring-2 ring-orange-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        {ls}
      </button>
    ));
  }, [letterSpacingOptions, activeLetterSpacing]);

  // Text Align buttons
  const textAlignOptions = [
    { value: 'left', Icon: AlignLeft },
    { value: 'center', Icon: AlignCenter },
    { value: 'right', Icon: AlignRight },
    { value: 'justify', Icon: AlignJustify },
  ];

  const textAlignButtons = React.useMemo(() => {
    return textAlignOptions.map(({ value, Icon }) => (
      <button
        key={value}
        onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'text-', value })}
        disabled={activeTextAlign === value}
        className={`py-2 rounded-md transition-all transform active:scale-95 ${
          activeTextAlign === value
            ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/30 ring-2 ring-sky-400/50'
            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
        }`}
      >
        <Icon size={16} className="mx-auto" />
      </button>
    ));
  }, [textAlignOptions, activeTextAlign]);

  return (
    <div className="space-y-4">
      {/* Font Size */}
      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-rose-500 rounded-full"></span>
          Font Size
        </label>
        <div className="grid grid-cols-4 gap-1.5 max-h-32 overflow-y-auto">{fontSizeButtons}</div>
       <ActiveSize activeSize={activeFontSize}/>
        {/* <div className="flex gap-2">
          <input
            type="number" 
             min="0"
            ref={customFontSizeRef}
            onKeyDown={(e)=>{    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  }}
            placeholder="Custom in px (e.g., 5px)"
            className="flex-1 bg-zinc-800 text-white px-3 py-2 rounded-md border border-zinc-700 hover:border-zinc-600 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 text-xs transition-all"
          />
          <button
            onClick={() => {
              if (customFontSizeRef.current?.value) {
                BuilderActions.updateElementStyles(element.id, { prefix: 'text-', value: `[${customFontSizeRef.current?.value
                }px]` });
            
              }
            }}
            className="px-4 py-2 bg-rose-600 text-white rounded-md text-xs font-medium hover:bg-rose-700 transition-all active:scale-95"
          >
            Apply
          </button>
        </div> */}
      </div>

      {/* Font Weight */}
      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-indigo-500 rounded-full"></span>
          Font Weight
        </label>
        <div className="grid grid-cols-3 gap-1.5">{fontWeightButtons}</div>
      </div>

      {/* Line Height */}
      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-teal-500 rounded-full"></span>
          Line Height
        </label>
        <div className="grid grid-cols-3 gap-1.5">{lineHeightButtons}</div>
      </div>

      {/* Letter Spacing */}
      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-orange-500 rounded-full"></span>
          Letter Spacing
        </label>
        <div className="grid grid-cols-3 gap-1.5">{letterSpacingButtons}</div>
      </div>

      {/* Text Color */}
      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-fuchsia-500 rounded-full"></span>
          Text Color
        </label>
        <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto">
          {SWATCH_PALETTE.map(color => (
            <button
              key={color.value}
              onClick={() => BuilderActions.updateElementStyles(element.id, { prefix: 'text-', value: color.value })}
              className={`h-8 rounded-md border-2 transition-all transform hover:scale-110 active:scale-95 ${
                activeTextColor === color.value
                  ? 'border-fuchsia-400 ring-2 ring-fuchsia-400/50 scale-110'
                  : 'border-zinc-700/50 hover:border-zinc-600'
              } ${color.swatchClass} ${color.needsBorder ? 'border-dashed' : ''}`}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Text Align */}
      <div className="space-y-2">
        <label className="text-zinc-400 text-xs font-medium uppercase tracking-wider flex items-center gap-2">
          <span className="w-1 h-3 bg-sky-500 rounded-full"></span>
          Text Align
        </label>
        <div className="grid grid-cols-4 gap-1.5">{textAlignButtons}</div>
      </div>
    </div>
  );
}

export default TypographyEditor;