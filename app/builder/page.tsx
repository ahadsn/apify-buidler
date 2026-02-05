'use client'
import { useBuilderStore } from './store/builder.store';
import { BuilderService } from './services/base/builder.services';
import Header from './components/Header.component';
import Sidebar from './components/Sidebar.component';
import Canvas from './components/canves/Canvas.component';
import PropertiesPanel from './components/propertiesPannel/PropertiesPanel.component';
import ElementTree from './components/ElementTree.component';
import CanvesHeader from './components/canves/CanvasHeader';
import CanvasSettings from './components/canves/CanvasSetting';
import { useDeviceType } from './hooks/useDeviceType';
import { BuilderCssService } from './services/css/builderCss.services';
import { useEffect, useMemo } from 'react';




export default function PortfolioBuilder() {
  const deviceType =useDeviceType();
  const css=useMemo(()=> BuilderCssService.compileCssFile(true,true,true,true,true,true,),[])
useEffect(() => {
  if (!css) return;
   
  let style = document.getElementById('builder-css') as HTMLStyleElement | null;

  if (!style) {
    style = document.createElement('style');
    style.id = 'builder-css';
    document.head.appendChild(style);
  }

  style.textContent = css;
}, [css]);


// const virtualCssFile = BuilderActions.getVirtualCssFile();

// useEffect(() => {
//   if (!virtualCssFile) return;

//   let styleEl = document.getElementById('virtual-css') as HTMLStyleElement | null;

//   if (!styleEl) {
//     styleEl = document.createElement('style');
//     styleEl.id = 'virtual-css';
//     styleEl.setAttribute('data-source', 'builder');
//     document.head.appendChild(styleEl);
//   }

//   styleEl.textContent = virtualCssFile;
// }, [virtualCssFile]);

    const {
        elements,
        selectedId,
        activeTab,
        classes
    } = useBuilderStore();
    
    const selectedElement = selectedId
        ? BuilderService.findElement(selectedId, elements)
        : null;

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-zinc-900 to-gray-900">
          
            <Header />

            <div className="flex-1 flex h-full overflow-hidden">
           
                <div className={` ${deviceType=='pc'?'w-64':'w-10'} h-full border-r border-zinc-800/50 shadow-xl`}>
                    <Sidebar />
                </div>

                
                <div className="flex-1 h-full flex flex-col overflow-hidden">
                    <CanvesHeader />
                    <div className="flex-1 overflow-hidden">
                        {activeTab === 'structure' ? (
                            <ElementTree />
                        ) : (
                            <Canvas />
                        )}
                    </div>
                </div>

            
                {(activeTab === 'edit' && selectedElement) || activeTab === 'preview' ? (
                    <div className="w-fit h-full border-l border-zinc-800/50 shadow-xl animate-slideInRight">
                        {activeTab === 'edit' && selectedElement && (
                            <PropertiesPanel element={selectedElement} classes={classes} />
                        )}

                        {activeTab === 'preview' && (
                            <CanvasSettings />
                        )}
                    </div>
                ) : null}
            </div>

         
            
        </div>
    );
}