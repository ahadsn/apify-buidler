import React from 'react';
import {
  Download,
  Proportions,
  Sparkles,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useBuilderStore } from '../store/builder.store';
import { BuilderActions } from '../actions/builder.actions';
import { useDeviceType } from '../hooks/useDeviceType';



export default function Header() {
  const deviceType = useDeviceType()
  const { view, zoom } = useBuilderStore();

  return (
    <div className={`bg-linear-to-r from-black via-zinc-950 to-black border-b border-zinc-800/50 ${deviceType=='pc'?'px-4 py-2.5':'px-1.5 py-0.5'} sticky top-0 z-50 backdrop-blur-sm`}>
      <div className="flex items-center justify-between max-w-full">
        {/* Logo */}
        <div className={`flex items-center ${deviceType=='pc'?'gap-2':'gap-1'} group cursor-pointer`}>
          <div className="relative">
            <Sparkles className="text-purple-500 group-hover:text-purple-400 transition-colors drop-shadow-lg" size={deviceType=='pc'?22:12} />
            {deviceType=='pc'&&<div className="absolute inset-0 blur-md bg-purple-500/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>}
          </div>
          <h1 className={`${deviceType=='pc'?'text-lg':'text-[10px]'} font-bold bg-linear-to-r from-white via-zinc-100 to-white bg-clip-text text-transparent hidden sm:block`}>
            Portfolio <span className="bg-linear-to-r from-purple-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-fuchsia-400 transition-all">Builder</span>
          </h1>
        </div>

        <div className={`flex items-center ${deviceType=='pc'?'gap-2':'gap-2'}`}>
        {/* full-screen */}
          <div className={`bg-linear-to-br from-zinc-900 to-zinc-800 border border-zinc-700/50 hover:border-zinc-600 ${deviceType=='pc'?'rounded-md':'rounded-sm'} ${deviceType=='pc'?'p-0.5':'p-0'} transition-all shadow-inner`}>
            <button
              onClick={() => BuilderActions.toggleFullScreen()}
              className={`${deviceType=='pc'?'py-2 px-4':'py-0.5 px-2'} text-zinc-400 hover:text-white hover:bg-linear-to-br hover:from-zinc-800 hover:to-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed ${deviceType=='pc'?'rounded-md':'rounded-sm'} transition-all transform active:scale-95`}
              title="Toggle Full-Screen"
            >
              <Proportions size={deviceType=='pc'?16:12} />
            </button>
          </div>
          {/* Zoom Controls */}
          <div className={`flex items-center ${deviceType=='pc'?'gap-1':'gap-0'} bg-linear-to-br from-zinc-900 via-zinc-900 to-zinc-800 ${deviceType=='pc'?'rounded-lg':'rounded-sm'} ${deviceType=='pc'?'p-0.5':'p-0.5'} border border-zinc-700/50 hover:border-zinc-600 transition-all shadow-inner`}>
            <button
              onClick={() => BuilderActions.changeZoom(Math.max(50, zoom - 10))}
              disabled={zoom <= 50}
              className={`${deviceType=='pc'?'py-2 px-4':'py-1 px-1'} text-zinc-400 hover:text-white hover:bg-linear-to-br hover:from-zinc-800 hover:to-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed ${deviceType=='pc'?'rounded-md':'rounded-sm'} transition-all transform active:scale-95`}
              title="Zoom Out"
            >
              <ZoomOut size={deviceType=='pc'?16:12} />
            </button>

            <div className={`${deviceType=='pc'?'px-2 min-w-12.5':'px-0.5 min-w-7.5'} flex justify-center items-center text-center`}>
              <span className={`bg-linear-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent ${deviceType=='pc'?'text-xs':'text-[9px]'} font-mono font-bold drop-shadow-sm`}>{zoom}%</span>
            </div>

            <button
              onClick={() => BuilderActions.changeZoom(Math.min(150, zoom + 10))}
              disabled={zoom >= 150}
              className={`${deviceType=='pc'?'py-2 px-2':'py-1 px-1'} text-zinc-400 hover:text-white hover:bg-linear-to-br hover:from-zinc-800 hover:to-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed ${deviceType=='pc'?'rounded-md':'rounded-sm'} transition-all transform active:scale-95`}
              title="Zoom In"
            >
              <ZoomIn size={deviceType=='pc'?16:12} />
            </button>
          </div>

          {/* Export Button */}
          <button
            onClick={() => BuilderActions.exportHTML()}
            className={`flex items-center ${deviceType=='pc'?'gap-2':'gap-0.5'} text-white ${deviceType=='pc'?'py-2 px-4':'py-1 px-2'} ${deviceType=='pc'?'rounded-lg':'rounded-sm'} font-medium bg-linear-to-br from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:via-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/40 hover:shadow-emerald-500/60 transition-all transform hover:scale-105 active:scale-95 ring-1 ring-emerald-500/50`}
          >
            <Download size={deviceType=='pc'?16:10} />
            <span className={`hidden sm:inline ${deviceType=='pc'?'':'text-[9px]'}`}>Export</span>
          </button>
        </div>
      </div>
    </div>
  );
}