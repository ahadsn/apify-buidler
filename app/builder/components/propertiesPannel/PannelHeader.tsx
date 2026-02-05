import { Activity, Ban, Laptop2, Monitor, MoonStar, Mouse, Settings, Settings2, Smartphone, SmartphoneIcon, SquareDashedMousePointer, SquareDashedTopSolid, SquaresSubtractIcon, SunDimIcon, Tablet, Trash2 } from 'lucide-react';
import { BuilderActions } from '../../actions/builder.actions';
import { act, useEffect, useRef, useState } from 'react';
import { useBuilderStore } from '../../store/builder.store';
import { useDeviceType } from '../../hooks/useDeviceType';
import { EditorProps } from './PropertiesPanel.component';

function PannelHeader({ element}: EditorProps) {
    const deviceType = useDeviceType();
    const [active,setActive]=useState('default');
    const VIEW_OPTIONS = [
        { key: 'desktop', icon: Monitor, size: deviceType=='pc'?18:14 },
        { key: 'laptop', icon: Laptop2, size: deviceType=='pc'?18:14 },
        { key: 'tablet', icon: Tablet, size: deviceType=='pc'?18:14 },
        { key: 'mobile', icon: Smartphone, size: deviceType=='pc'?18:14 },
        { key: 'smallPhone', icon: SmartphoneIcon, size: deviceType=='pc'?15:12 },
    ] as const;
    const SETTINGS_OPTIONS = [
        { key: 'default', icon: Ban, size: deviceType=='pc'?18:14 },
        { key: 'settings', icon: Settings2, size: deviceType=='pc'?18:14 },
        { key: 'actions', icon: SquaresSubtractIcon, size: deviceType=='pc'?18:14 },
    ] as const;
    
    const Theme_OPTIONS = [
        { key: 'dark', icon: MoonStar, size: deviceType=='pc'?18:14 },
        { key: '', icon: SunDimIcon, size: deviceType=='pc'?18:14 },
    ] as const;
   const Actions_OPTIONS = [
        { key: 'hover', icon: SquareDashedMousePointer, size: deviceType=='pc'?18:14 },
        { key: '', icon: SquareDashedTopSolid, size: deviceType=='pc'?18:14 },
    ] as const;

    const elementNameRef = useRef<HTMLInputElement>(null);
    const { mediaQuery, mediaTheme,activeStates } = useBuilderStore();
    
    useEffect(() => {
        if (elementNameRef.current) {
            elementNameRef.current.value = element.name;
        }
    }, [element.name]);
    
    return (
        <div className={`sticky top-0 bg-black/80 transition-all duration-300 backdrop-blur-md ${deviceType=='pc'?'p-4':'p-3'} border-b border-white/10 z-10`}>
            <div className={`flex items-center justify-between ${deviceType=='pc'?'mb-3':'mb-2.5'}`}>
                <div className={`flex items-center ${deviceType=='pc'?'gap-2':'gap-1.5'} flex-1 min-w-0 group`}>
                    <div className={`${deviceType=='pc'?'p-1.5':'p-1'} ${deviceType=='pc'?'rounded-lg':'rounded-md'} bg-gradient-to-br from-purple-500/20 to-blue-500/20 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300`}>
                        <Settings size={deviceType=='pc'?16:13} className="text-purple-400 group-hover:rotate-90 transition-transform duration-500" />
                    </div>
                    <input 
                        type="text" 
                        min="0"
                        ref={elementNameRef}
                        onBlur={(e)=>{
                            e.preventDefault();
                            BuilderActions.updateElement(element.id, { name: e.target.value })
                        }} 
                        className={`bg-transparent text-white font-medium ${deviceType=='pc'?'text-sm':'text-xs'} border-none outline-none focus:outline-none flex-1 min-w-0 placeholder-white/40 hover:text-purple-300 focus:text-purple-300 transition-colors duration-200`}
                        placeholder={deviceType=='pc'?"Element name":"Name"}
                    />
                </div>


          <div className={`flex ${deviceType=='pc'?'gap-0.5':'gap-1'} bg-white/5 ${deviceType=='pc'?'rounded-lg':'rounded-md'} ${deviceType=='pc'?'p-0.5':'p-1'} border border-white/10 hover:border-white/20 transition-all duration-300`}>
                        {SETTINGS_OPTIONS.map(({ key, icon: Icon, size }) => (
                            <button
                                key={key}
                                onClick={() => setActive(key)}
                                className={`${deviceType=='pc'?'p-1.5':'p-1.5'} ${deviceType=='pc'?'rounded-md':'rounded'} transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                                   active=== key
                                        ? key === 'default' 
                                            ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-lg shadow-indigo-500/50' 
                                            : 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/50'
                                        : 'text-white/50 hover:text-white hover:bg-white/10'
                                }`}
                                title={key}
                            >
                                <Icon size={size} className={active === key ? 'animate-pulse' : ''} />
                            </button>
                        ))}
                    </div>


                <button
                    onClick={() => BuilderActions.selectElement(null)}
                    className={`${deviceType=='pc'?'py-1 px-2':'py-0.5 px-1 '} ${deviceType=='pc'?'rounded-md':'rounded'} ml-5 transition-all duration-300 transform hover:scale-110 active:scale-95  bg-gradient-to-r from-pink-600 to-red-700 text-white shadow-2xl shadow-red-500/50      
                                      
                                `}
                >
                    ✕
                </button>
            </div>






          {active=='settings'&&<div className={`flex ${deviceType=='pc'?'gap-5 flex-row':'gap-2 flex-col'}`}>
                <div className={`flex ${deviceType=='pc'?'gap-0.5':'gap-1'} bg-white/5 ${deviceType=='pc'?'rounded-lg':'rounded-md'} ${deviceType=='pc'?'p-0.5':'p-1'} border border-white/10 hover:border-white/20 transition-all duration-300`}>
                    {VIEW_OPTIONS.map(({ key, icon: Icon, size }) => (
                        <button
                            key={key}
                            onClick={() => BuilderActions.changeMediaQuery(key)}
                            className={`${deviceType=='pc'?'p-1.5':'p-1.5'} ${deviceType=='pc'?'rounded-md':'rounded'} transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                                mediaQuery.includes(key)
                                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                                    : 'text-white/50 hover:text-white hover:bg-white/10'
                            }`}
                            title={key}
                        >
                            <Icon size={size} className={mediaQuery.includes(key) ? 'animate-pulse' : ''} />
                        </button>
                    ))}
                </div>

                <div className={`flex ${deviceType=='pc'?'gap-1':'gap-2 items-center justify-between'}`}>
                    <div className={`flex ${deviceType=='pc'?'gap-0.5':'gap-1'} bg-white/5 ${deviceType=='pc'?'rounded-lg':'rounded-md'} ${deviceType=='pc'?'p-0.5':'p-1'} border border-white/10 hover:border-white/20 transition-all duration-300`}>
                        {Theme_OPTIONS.map(({ key, icon: Icon, size }) => (
                            <button
                                key={key}
                                onClick={() => BuilderActions.changeMediaTheme(key)}
                                className={`${deviceType=='pc'?'p-1.5':'p-1.5'} ${deviceType=='pc'?'rounded-md':'rounded'} transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                                    mediaTheme.includes(key)
                                        ? key === 'dark' 
                                            ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-lg shadow-indigo-500/50' 
                                            : 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/50'
                                        : 'text-white/50 hover:text-white hover:bg-white/10'
                                }`}
                                title={key}
                            >
                                <Icon size={size} className={mediaTheme.includes(key) ? 'animate-pulse' : ''} />
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => {
                            if (confirm('Delete this element?')) {
                                BuilderActions.deleteElement(element.id);
                            }
                        }}
                        className={`flex items-center ${deviceType=='pc'?'gap-1.5':'gap-1'} bg-gradient-to-r from-red-600/90 to-rose-600/90 hover:from-red-500 hover:to-rose-500 text-white ${deviceType=='pc'?'px-3 py-1.5':'px-2.5 py-1.5'} ${deviceType=='pc'?'rounded-lg':'rounded-md'} ${deviceType=='pc'?'text-xs':'text-[11px]'} font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 border border-red-400/20`}
                        title="Delete element"
                    >
                        <Trash2 size={deviceType=='pc'?14:12} className="group-hover:animate-bounce" />
                        {deviceType=='pc'?'Delete':'Del'}
                    </button>
                </div>
            </div>}
          { active==='actions'&& <div className="">
                  <div className={`flex ${deviceType=='pc'?'gap-0.5':'gap-1'} bg-white/5 ${deviceType=='pc'?'rounded-lg':'rounded-md'} ${deviceType=='pc'?'p-0.5':'p-1'} border border-white/10 hover:border-white/20 transition-all duration-300`}>
                        {Actions_OPTIONS.map(({ key, icon: Icon, size }) => (
                            <button
                                key={key}
                                onClick={() => BuilderActions.changeActiveState(key)}
                                className={`${deviceType=='pc'?'p-1.5':'p-1.5'} ${deviceType=='pc'?'rounded-md':'rounded'} transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                                    activeStates.includes(key)
                                        ?key[0] =='hover' 
                                            ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-lg shadow-indigo-500/50' 
                                            : 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/50'
                                        : 'text-white/50 hover:text-white hover:bg-white/10'
                                }`}
                                title={key}
                            >
                                <Icon size={size} className={ activeStates.includes(key) ? 'animate-pulse' : ''} />
                            </button>
                        ))}
                    </div>
            </div>}
        </div>
    )
}

export default PannelHeader