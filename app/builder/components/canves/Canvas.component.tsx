import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Layout, Smartphone, Tablet, Monitor, Laptop } from 'lucide-react';
import { useBuilderStore } from '../../store/builder.store';
import { BuilderActions } from '../../actions/builder.actions';
import { useDeviceType } from '../../hooks/useDeviceType';
import CanvasElement from './CanvasElement.component';
import UniversalBrowser from './layouts/browsers/UniversalBrowser.component';
import MobileBrowser from './layouts/browsers/MobileBrowser.component';
import TabletBrowser from './layouts/browsers/TabletBrowser.component';
import LaptopFrame from './layouts/devices/LaptopFrame.component';


/* ---------------- DEVICE PRESETS ---------------- */

const DEVICE_PRESETS: Record<string, { width: number; height: number }> = {
  mobile: { width: 360, height: 720 },
  smallPhone: { width: 320, height: 640 },
  tablet: { width: 820, height: 1180 },
  laptop: { width: 1440, height: 900 },
  desktop: { width: 1920, height: 1080 },
};

/* ---------------- COMPONENT ---------------- */

export default function Canvas() {
  const deviceType = useDeviceType();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const {
    elements,
    selectedId,
    view,
    canvasBackground,
    canvasGradient,
    canvasPadding,
    zoom,
    draggedType,
    viewTheme,
  } = useBuilderStore();

  const device = DEVICE_PRESETS[view] || DEVICE_PRESETS.desktop;

  /* ---------------- SCALE CALCULATION ---------------- */

  const scale = useMemo(() => {
    if (!canvasRef.current) return 1;

    const rect = canvasRef.current.getBoundingClientRect();
    const padding = deviceType === 'pc' ? 64 : 16;

    const availableWidth = rect.width - padding;
    const availableHeight = rect.height - padding;

    const baseScale = Math.min(
      availableWidth / device.width,
      availableHeight / device.height,
      1
    );

    return deviceType === 'pc'
      ? baseScale * (zoom / 100)
      : baseScale;
  }, [view, zoom, deviceType]);

  /* ---------------- DROP HANDLERS ---------------- */

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedType) BuilderActions.handleDrop(draggedType);
  };
const handleTouchEndCallback = useCallback(
  (e:React.TouchEvent) => BuilderActions.handleTouchEnd(e, canvasRef, deviceType),
  [canvasRef, deviceType]
);

const handleClickCallback = useCallback(
  () => BuilderActions.selectElement(null),
  []
);

useEffect(() => {
  const handleTouch = (e: TouchEvent) => {
    BuilderActions.handleGlobalTouchEnd(e, canvasRef, deviceType, useBuilderStore.getState().draggedType);
  };
  document.addEventListener('touchend', handleTouch);
  return () => document.removeEventListener('touchend', handleTouch);
}, [deviceType]); // draggedType removed


  /* ---------------- RENDER ---------------- */

  return (
    <div className="flex-1 w-full h-full flex flex-col overflow-hidden relative">
      {/* Enhanced animated linear background */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-blue-50/30 to-purple-50/20" />
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-linear(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-linear(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`
        }}
      />

      <div
        ref={canvasRef}
        className={`flex-1 relative overflow-hidden ${deviceType === 'pc' ? 'p-8' : 'p-2'
          }`}
        style={{
          backgroundImage: `
            linear-linear(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
            linear-linear(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: deviceType === 'pc' ? '24px 24px' : '16px 16px',
        }}
    
  onDrop={handleDrop}
  onDragOver={(e) => e.preventDefault()}
  onTouchEnd={handleTouchEndCallback}
  onClick={handleClickCallback}
  onMouseEnter={() => setIsHovering(true)}
  onMouseLeave={() => setIsHovering(false)}
>
      
     
    

        {/* DEVICE FRAME */}
        <div className="w-full h-full flex justify-center items-center">
          <div
            className="relative transition-transform duration-100 ease-out"
            style={{
              width: device.width,
              height: device.height,
              transform: `scale(${scale}) ${isHovering && deviceType === 'pc' ? 'translateY(-4px)' : ''}`,
              transformOrigin: 'center center',
            }}
          >
            {/* Enhanced resolution label with linear */}
            <div
              className="absolute left-1/2 -translate-x-1/2 text-xs font-bold bg-linear-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full shadow-lg border-2 border-white/20 z-50 backdrop-blur-md transition-all duration-100"
              style={{
                top: '-48px',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)',
              }}
            >
              <span className="flex items-center gap-2">
                {view === 'mobile' || view === 'smallPhone' ? <Smartphone size={14} /> :
                  view === 'tablet' ? <Tablet size={14} /> :
                    view === 'laptop' ? <Laptop size={14} /> :
                      <Monitor size={14} />}
                <span>{device.width} × {device.height}</span>
              </span>
            </div>

            {/* PHONE FRAME - Enhanced iPhone Style */}
            {(view === 'mobile' || view === 'smallPhone') && (
              <>
                <div className="absolute -inset-3 rounded-[3.5rem] bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl transition-shadow duration-100"
                  style={{
                    boxShadow: isHovering
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px rgba(59, 130, 246, 0.2)'
                      : '0 20px 40px -10px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <div className="absolute inset-0 rounded-[3.5rem] bg-linear-to-br from-white/10 to-transparent" />
                  <div className="absolute inset-0 rounded-[3.5rem] bg-linear-to-tl from-blue-500/5 to-transparent" />

                  {/* Side buttons with glow */}
                  <div className="absolute left-0 top-24 w-0.5 h-8 bg-slate-950 rounded-r-sm -translate-x-0.5 shadow-inner" />
                  <div className="absolute left-0 top-36 w-0.5 h-12 bg-slate-950 rounded-r-sm -translate-x-0.5 shadow-inner" />
                  <div className="absolute left-0 top-52 w-0.5 h-12 bg-slate-950 rounded-r-sm -translate-x-0.5 shadow-inner" />
                  <div className="absolute right-0 top-32 w-0.5 h-16 bg-slate-950 rounded-l-sm translate-x-0.5 shadow-inner" />

                  {/* Enhanced Dynamic Island with glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-8 bg-black rounded-b-4xl z-10 shadow-lg overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-b from-slate-950 to-black rounded-b-4xl" />
                    <div className="absolute inset-0 bg-linear-to-b from-blue-500/10 to-transparent rounded-b-4xl" />
                  </div>

                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-1 bg-slate-950/80 rounded-full z-20" />

                  {/* Enhanced camera with realistic lens */}
                  <div className="absolute top-2 left-1/2 translate-x-5 w-2.5 h-2.5 bg-slate-900 rounded-full border border-slate-700 z-20 shadow-inner">
                    <div className="absolute inset-0.5 bg-linear-radial from-blue-900/50 to-slate-950 rounded-full" />
                    <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-blue-400/20 rounded-full" />
                  </div>
                </div>
              </>
            )}

            {/* TABLET FRAME - Enhanced iPad Style */}
            {view === 'tablet' && (
              <>
                <div className="absolute -inset-4 rounded-[2.5rem] bg-linear-to-br from-slate-700 via-slate-600 to-slate-700 shadow-2xl transition-shadow duration-100"
                  style={{
                    boxShadow: isHovering
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px rgba(168, 85, 247, 0.2)'
                      : '0 20px 40px -10px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <div className="absolute inset-0 rounded-[2.5rem] bg-linear-to-br from-white/5 to-transparent" />
                  <div className="absolute inset-0 rounded-[2.5rem] shadow-inner" style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)' }} />

                  <div className="absolute top-5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 rounded-full shadow-inner">
                    <div className="absolute inset-0.5 bg-linear-radial from-slate-800 to-slate-950 rounded-full" />
                  </div>

                  {/* Enhanced home button */}
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-14 h-14 bg-slate-900 rounded-full border-2 border-slate-500 shadow-lg transition-transform hover:scale-105">
                    <div className="absolute inset-0 rounded-full bg-linear-to-br from-slate-800 to-slate-950" />
                    <div className="absolute inset-0 rounded-full shadow-inner" style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)' }} />
                  </div>

                  <div className="absolute right-0 top-32 w-1 h-12 bg-slate-800 rounded-l-sm translate-x-1 shadow-md" />
                  <div className="absolute right-0 top-48 w-1 h-12 bg-slate-800 rounded-l-sm translate-x-1 shadow-md" />
                </div>
              </>
            )}

            {/* LAPTOP FRAME - Enhanced MacBook Style */}
            {view === 'laptop' && (
              <LaptopFrame/>
            )}

            {/* DESKTOP FRAME - Enhanced iMac Style */}
            {view === 'desktop' && (
              <>
                <div className="absolute -inset-5 rounded-2xl bg-linear-to-br from-slate-800 via-slate-700 to-slate-800 shadow-2xl transition-shadow duration-100"
                  style={{
                    boxShadow: isHovering
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px rgba(168, 85, 247, 0.2)'
                      : '0 20px 40px -10px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/5 to-transparent" />

                  <div className="absolute inset-0 rounded-2xl border-8 border-slate-950">
                    <div className="absolute inset-0 rounded-xl border border-slate-800" />
                  </div>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 rounded-full opacity-20" />
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 bg-linear-to-b from-slate-700 to-slate-600 rounded-t-2xl shadow-lg"
                  style={{ top: 'calc(100% + 5px)', width: '120px', height: '8px' }}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent rounded-t-2xl" />
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 bg-linear-to-b from-slate-700 via-slate-600 to-slate-700 rounded-2xl shadow-2xl"
                  style={{ top: 'calc(100% + 28px)', width: '200px', height: '12px' }}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent rounded-2xl" />
                  <div className="absolute inset-0 rounded-2xl shadow-inner" style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)' }} />
                </div>
              </>
            )}

            {/* CANVAS CONTENT with enhanced styling */}
            <div
              className="relative w-full h-full bg-white overflow-hidden z-20 transition-all duration-100"
              style={{
                borderRadius:
                  view === 'mobile' || view === 'smallPhone' ? '2.75rem' :
                    view === 'tablet' ? '1.75rem' :
                      view === 'laptop' ? '0.75rem 0.75rem 0 0' :
                        '0.75rem',
                boxShadow: isHovering
                  ? 'inset 0 0 0 1px rgba(0,0,0,0.1), inset 0 2px 8px rgba(59, 130, 246, 0.05)'
                  : 'inset 0 0 0 1px rgba(0,0,0,0.1)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* universal Browser */}
              {(view === 'laptop' || view === 'desktop') && (
                 <UniversalBrowser/>
              )}

              {/*  Mobile BROWSER */}
              {(view === 'mobile' || view === 'smallPhone') && (
                <MobileBrowser/>
              )}

              {/* TABLET BROWSER  */}
              {view === 'tablet' && (
                <TabletBrowser/>
              )}

              {/* PAGE CONTENT AREA */}
              <div
                className={`w-full overflow-auto  `}
                style={{
                  height: (view === 'laptop' || view === 'desktop') ? 'calc(100% - 88px)' :
                    view === 'tablet' ? 'calc(100% - 78px)' :
                      (view === 'mobile' || view === 'smallPhone') ? 'calc(100% - 68px)' : '100%',
                  padding: deviceType === 'pc' ? canvasPadding : '8px',
                  background: canvasGradient || canvasBackground,
                }}
              >
                {/*  Empty State */}
                {elements.length === 0 ? (
                  <div className={`    ${viewTheme === 'dark' ? 'dark' : ''}
    w-full h-full flex items-center justify-center
    border-2 border-dashed
    border-gray-300 dark:border-gray-600
    rounded-2xl
    bg-linear-to-br
    from-blue-50/30 via-white to-purple-50/30
    dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800
    backdrop-blur-sm
    transition-all
    hover:border-blue-400 dark:hover:border-blue-500
    hover:bg-blue-50/50 dark:hover:bg-neutral-800/60
    group
`}>
                    <div className="text-center">
                      <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 opacity-20 blur-2xl rounded-full animate-pulse" />
                        <Layout size={48} className="relative text-gray-400 group-hover:text-blue-500 transition-colors duration-100" />
                      </div>
                      <p className="text-base font-bold text-gray-700 mb-2 group-hover:text-blue-600 transition-colors">
                        Start Building Your Page
                      </p>
                      <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
                        Drag components from the sidebar to begin ✨
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className={`${deviceType === 'pc' ? 'space-y-6' : 'space-y-3'} ${viewTheme == 'dark' ? 'dark' : ''}`}>
                    {elements.map((el) => (
                      <CanvasElement
                        key={el.id}
                        element={el}
                        isSelected={selectedId === el.id}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}