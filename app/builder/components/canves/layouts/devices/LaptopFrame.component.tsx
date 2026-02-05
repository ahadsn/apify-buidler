import React from 'react'

function LaptopFrame() {
  return (
   <>
                <div className="absolute -inset-6 rounded-t-2xl bg-linear-to-br from-slate-700 via-slate-600 to-slate-700 shadow-2xl transition-shadow duration-300"
                  style={{
                    paddingBottom: '40px',
                    // boxShadow: isHovering
                    //   ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px rgba(59, 130, 246, 0.2)'
                    //   : '0 20px 40px -10px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <div className="absolute inset-0 rounded-t-2xl border-8 border-slate-900">
                    <div className="absolute inset-0 rounded-t-xl border border-slate-700" />
                  </div>

                  {/*  webcam indicator */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rounded-full z-10 shadow-inner">
                    <div className="absolute inset-0.5 bg-slate-950 rounded-full" />
                    <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-green-500 rounded-full animate-pulse" />
                  </div>

                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-bold text-slate-600 tracking-wider opacity-40">
                    MacBook Pro
                  </div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 bg-linear-to-b from-slate-800 to-slate-700 rounded-sm shadow-inner"
                  style={{ top: 'calc(100% - 6px)', width: 'calc(100% + 52px)', height: '4px' }}
                />

                <div className="absolute left-1/2 -translate-x-1/2 bg-linear-to-b from-slate-700 via-slate-600 to-slate-700 rounded-b-2xl shadow-2xl"
                  style={{ top: 'calc(100% - 2px)', width: 'calc(100% + 56px)', height: '32px' }}
                >
                  <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-3 bg-slate-800 rounded-lg border border-slate-700" />

                  <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-0.5 h-0.5 bg-slate-800 rounded-full" />
                    ))}
                  </div>
                </div>
              </>
  )
}

export default LaptopFrame
