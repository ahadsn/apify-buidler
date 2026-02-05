import React from 'react'
import { BuilderActions } from '../../actions/builder.actions'
import { Edit3, Eye, Laptop2, Monitor, MoonStar, Smartphone, SmartphoneIcon, StretchHorizontalIcon, SunDimIcon, Tablet } from 'lucide-react'
import { useBuilderStore } from '../../store/builder.store'
import { useDeviceType } from '../../hooks/useDeviceType'

function CanvasHeader() {
    const deviceType = useDeviceType()
    
    const VIEW_OPTIONS = [
      { key: 'desktop', icon: Monitor, size: deviceType=='pc'?18:16 },
      { key: 'laptop', icon: Laptop2, size: deviceType=='pc'?18:16 },
      { key: 'tablet', icon: Tablet, size: deviceType=='pc'?18:16 },
      { key: 'mobile', icon: Smartphone, size: deviceType=='pc'?18:16 },
      { key: 'smallPhone', icon: SmartphoneIcon, size: deviceType=='pc'?15:14 },
    ] as const;
    
    const Theme_OPTIONS = [
      { key: 'dark', icon: MoonStar, size: deviceType=='pc'?18:16 },
      { key: '', icon: SunDimIcon, size: deviceType=='pc'?18:16 },
    ] as const;
    
    const { activeTab, view, viewTheme } = useBuilderStore();
    
    return (
        <div className={`bg-linear-to-r from-black via-zinc-950 to-black border-b border-zinc-800/50 ${deviceType=='pc'?'p-2':'p-1.5'} flex justify-between backdrop-blur-sm`}>
            <div className={`flex ${deviceType=='pc'?'gap-1.5':'gap-1'}`}>
                <button
                    onClick={() => BuilderActions.changeTab('preview')}
                    className={`flex items-center ${deviceType=='pc'?'gap-2':'gap-1.5'} ${deviceType=='pc'?'px-3 py-2':'px-2 py-1'} ${deviceType=='pc'?'rounded-lg':'rounded-md'} ${deviceType=='pc'?'text-xs':'text-[10px]'} font-medium transition-all transform active:scale-95 ${
                        activeTab === 'preview'
                            ? 'bg-linear-to-br from-blue-500 via-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/40 ring-1 ring-blue-400/60 hover:shadow-blue-500/60'
                            : 'bg-linear-to-br from-zinc-900 to-zinc-800 text-zinc-400 hover:from-zinc-800 hover:to-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
                    }`}
                >
                    <Eye size={deviceType=='pc'?14:12} />
                    Preview
                </button>
                
                <button
                    onClick={() => BuilderActions.changeTab('edit')}
                    className={`flex items-center ${deviceType=='pc'?'gap-2':'gap-1.5'} ${deviceType=='pc'?'px-3 py-2':'px-2 py-1'} ${deviceType=='pc'?'rounded-lg':'rounded-md'} ${deviceType=='pc'?'text-xs':'text-[10px]'} font-medium transition-all transform active:scale-95 ${
                        activeTab === 'edit'
                            ? 'bg-linear-to-br from-purple-500 via-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/40 ring-1 ring-purple-400/60 hover:shadow-purple-500/60'
                            : 'bg-linear-to-br from-zinc-900 to-zinc-800 text-zinc-400 hover:from-zinc-800 hover:to-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
                    }`}
                >
                    <Edit3 size={deviceType=='pc'?14:12} />
                    Edit
                </button>
                
                <button
                    onClick={() => BuilderActions.changeTab('structure')}
                    className={`flex items-center ${deviceType=='pc'?'gap-2':'gap-1.5'} ${deviceType=='pc'?'px-3 py-2':'px-2 py-1'} ${deviceType=='pc'?'rounded-lg':'rounded-md'} ${deviceType=='pc'?'text-xs':'text-[10px]'} font-medium transition-all transform active:scale-95 ${
                        activeTab === 'structure'
                            ? 'bg-linear-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/40 ring-1 ring-emerald-400/60 hover:shadow-emerald-500/60'
                            : 'bg-linear-to-br from-zinc-900 to-zinc-800 text-zinc-400 hover:from-zinc-800 hover:to-zinc-700 hover:text-white border border-zinc-700/50 hover:border-zinc-600'
                    }`}
                >
                    <StretchHorizontalIcon size={deviceType=='pc'?14:12} />
                    Structure
                </button>
            </div>
            
            <div className={`flex ${deviceType=='pc'?'gap-1':'gap-0.5'}`}>
                <div className="flex gap-2">
                    <div className={`flex ${deviceType=='pc'?'gap-0.5':'gap-0.5'} bg-linear-to-br from-white/5 via-white/10 to-white/5 ${deviceType=='pc'?'rounded-lg':'rounded-md'} ${deviceType=='pc'?'p-0.5':'p-0.5'} border border-white/15 hover:border-white/30 transition-all duration-300 shadow-inner`}>
                        {VIEW_OPTIONS.map(({ key, icon: Icon, size }) => (
                            <button
                                key={key}
                                onClick={() => BuilderActions.changeView(key)}
                                className={`${deviceType=='pc'?'p-1.5':'p-1'} ${deviceType=='pc'?'rounded-md':'rounded-sm'} transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                                    view === key
                                        ? 'bg-linear-to-br from-blue-400 via-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/60 ring-1 ring-blue-400/50'
                                        : 'text-white/40 hover:text-white hover:bg-linear-to-br hover:from-white/10 hover:to-white/5'
                                }`}
                                title={key}
                            >
                                <Icon size={size} className={view === key ? 'drop-shadow-lg' : ''} />
                            </button>
                        ))}
                    </div>
                </div>

                <div className={`flex ${deviceType=='pc'?'gap-0.5':'gap-0.5'} bg-linear-to-br from-white/5 via-white/10 to-white/5 ${deviceType=='pc'?'rounded-lg':'rounded-md'} ${deviceType=='pc'?'p-0.5':'p-0.5'} border border-white/15 hover:border-white/30 transition-all duration-300 shadow-inner`}>
                    {Theme_OPTIONS.map(({ key, icon: Icon, size }) => (
                        <button
                            key={key}
                            onClick={() => BuilderActions.changeViewTheme(key)}
                            className={`${deviceType=='pc'?'p-1.5':'p-1'} ${deviceType=='pc'?'rounded-md':'rounded-sm'} transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                                viewTheme === key
                                    ? key === 'dark' 
                                        ? 'bg-linear-to-br from-indigo-500 via-indigo-600 to-purple-700 text-white shadow-lg shadow-indigo-500/60 ring-1 ring-indigo-400/50' 
                                        : 'bg-linear-to-br from-amber-300 via-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/60 ring-1 ring-amber-400/50'
                                    : 'text-white/40 hover:text-white hover:bg-linear-to-br hover:from-white/10 hover:to-white/5'
                            }`}
                            title={key}
                        >
                            <Icon size={size} className={viewTheme === key ? 'drop-shadow-lg' : ''} />
                        </button>
                    ))}
                </div> 
            </div>
        </div>
    )
}

export default CanvasHeader