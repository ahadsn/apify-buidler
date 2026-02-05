import React from 'react'

function UniversalBrowser() {
  return (
              <div className="w-full bg-linear-to-b from-gray-50 to-white border-b border-gray-200">
                  <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-linear-to-br from-red-400 to-red-600 border border-red-700 shadow-sm hover:opacity-80 transition-opacity cursor-pointer" />
                      <div className="w-3 h-3 rounded-full bg-linear-to-br from-yellow-400 to-yellow-600 border border-yellow-700 shadow-sm hover:opacity-80 transition-opacity cursor-pointer" />
                      <div className="w-3 h-3 rounded-full bg-linear-to-br from-green-400 to-green-600 border border-green-700 shadow-sm hover:opacity-80 transition-opacity cursor-pointer" />
                    </div>

                    <div className="flex-1 flex items-center gap-1 ml-2">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-t-lg border-t border-x border-gray-200 shadow-sm max-w-xs hover:shadow transition-shadow">
                        <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
                        </svg>
                        <span className="text-xs text-gray-700 font-medium truncate">New Design</span>
                        <svg className="w-3 h-3 text-gray-400 hover:text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <div className="w-6 h-6 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded cursor-pointer transition-colors">
                        <span className="text-lg font-light">+</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-2">
                    <div className="flex items-center gap-1">
                      <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex-1 flex items-center gap-2 bg-white rounded-full px-4 py-1.5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span className="flex-1 text-sm text-gray-700 truncate font-medium">yourdesign.com</span>
                      <svg className="w-4 h-4 text-yellow-500 hover:text-yellow-600 cursor-pointer transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>

                    <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
  )
}

export default UniversalBrowser
