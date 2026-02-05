import React from 'react'

function MobileBrowser() {
  return (
    <div className="w-full bg-linear-to-b from-white to-gray-50 border-b border-gray-200">
                  <div className="flex items-center justify-between px-4 py-1.5 text-xs font-semibold">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                      </svg>
                      <div className="flex items-center gap-0.5">
                        <div className="w-0.5 h-2 bg-black rounded" />
                        <div className="w-0.5 h-2.5 bg-black rounded" />
                        <div className="w-0.5 h-3 bg-black rounded" />
                        <div className="w-0.5 h-3.5 bg-green-500 rounded" />
                      </div>
                      <span className="text-[10px] font-bold">100%</span>
                    </div>
                  </div>

                  <div className="px-2 py-2">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 border border-gray-200 hover:bg-gray-50 transition-colors">
                      <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="flex-1 text-xs text-gray-700 truncate font-medium">yourdesign.com</span>
                      <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                  </div>
                </div>
  )
}

export default MobileBrowser