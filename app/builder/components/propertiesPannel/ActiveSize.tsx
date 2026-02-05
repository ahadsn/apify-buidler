import React from 'react'
import { useDeviceType } from '../../hooks/useDeviceType'

function ActiveSize({activeSize}:{activeSize:string}) {
  const deviceType = useDeviceType();
  
  return (
    <div>
      {activeSize.endsWith('px') && (
        <div className={`relative ${deviceType=='pc'?'mt-3 mb-2 p-3':'mt-2 mb-1.5 p-2'} bg-gradient-to-br from-rose-500/10 to-rose-600/5 border border-rose-500/20 ${deviceType=='pc'?'rounded-lg':'rounded-md'} backdrop-blur-sm`}>
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${deviceType=='pc'?'gap-2':'gap-1'}`}>
              <div className={`${deviceType=='pc'?'w-2 h-2':'w-1.5 h-1.5'} bg-rose-500 rounded-full animate-pulse`}></div>
              <span className={`text-zinc-400 ${deviceType=='pc'?'text-xs':'text-[10px]'} font-medium uppercase tracking-wider`}>
                {deviceType=='pc'?'Active Size':'Size'}
              </span>
            </div>
            <div className={`flex items-center ${deviceType=='pc'?'gap-2':'gap-1'}`}>
              <span className={`text-rose-400 ${deviceType=='pc'?'text-lg':'text-sm'} font-bold tracking-tight`}>
                {activeSize}
              </span>
              <div className={`${deviceType=='pc'?'px-2 py-0.5':'px-1.5 py-0'} bg-rose-500/20 rounded-md`}>
                <span className={`text-rose-300 ${deviceType=='pc'?'text-[10px]':'text-[8px]'} font-medium uppercase tracking-wide`}>
                  Current
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ActiveSize