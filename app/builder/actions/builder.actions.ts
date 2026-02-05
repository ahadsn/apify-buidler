import React from 'react';
import {   STANDALONE_VALUES, } from '../elements/css/tailwindruleregistry';
import { BuilderService } from '../services/base/builder.services';
import { BuilderCssService,  } from '../services/css/builderCss.services';
import { useBuilderStore } from '../store/builder.store';
import { PageElement } from '../elements/types/pageElement.types';
import { TailwindClassConfig } from '../services/types/css.services.types';
import { PageElementFactory } from '../elements/base/pageElements';

export class BuilderActions {

    /** 
     * Add a new element to the canvas
     */
    static addElement(type: string, parentId?: string): void {
        const store = useBuilderStore.getState();
        const newElement = PageElementFactory.create(type);
        const updatedElements = BuilderService.addElement(store.elements, newElement, parentId);
        store.setElements(updatedElements);
        store.setClassName(newElement.id,newElement.className);
        store.setDraggedType(null);
    }

    /**
     * Update an existing element
     */
    



    static updateElement(id: string, updates: Partial<PageElement>): void {
        const store = useBuilderStore.getState();
        const updatedElements = BuilderService.updateElement(store.elements, id, updates);
        store.setElements(updatedElements);
    }

        /**
     * getIsolatedClassName
     */
        static getIsolatedClassName(id: string) {
        const store = useBuilderStore.getState();
        const className = store.getClassName(id);
        const VirtualclassName = BuilderCssService.getIsolatedClassName(className);
        return VirtualclassName    }
            /**
     * getClassName
     */
          static getClassName(id: string) {
        const store = useBuilderStore.getState();
        const className = store.getClassName(id);
        return className   }

    /**
   *getActiveStyle
   */
    static getActiveStyle(id: string): Record<string, TailwindClassConfig>{
        const store = useBuilderStore.getState();
        const className =store.getClassName(id);
        const obj = BuilderCssService.parseClassString(className);
        return obj;
    }
    /**
    *getValue
    */
    static getValue(stylesObj:Record<string,TailwindClassConfig>,prefix:string,standalone:boolean) {
         if (!stylesObj || !prefix) return null;
       
  if (standalone) {
    const valFound = STANDALONE_VALUES[prefix]?.find(val => stylesObj[val]);
    if (valFound) return stylesObj[valFound].value;
  }
   
        const store = useBuilderStore.getState();
        const res = stylesObj[BuilderCssService.buildLookupKey(prefix,store.activeStates,store.mediaTheme,BuilderService.getQuery(store.mediaQuery))]
        if ( prefix&&res) { return res.value }
        return null
    }
    /**
       *isActive
       */
    static isActive(id: string, prefix: string, value: string,) {
        let key = BuilderService.getKey(prefix, value)
        const { result, res } = this.getActiveStyle(id);
        if (result && prefix === res.prefix && res.value == value) {
            return true
        }
        return false
    }
    /**
     * Update element styles
     */
    static updateElementStyles(id: string, styleUpdates: { prefix: string, value: string, }): void {
        console.log('style Updated...............................................................');
        const store = useBuilderStore.getState();
        const className = store.getClassName(id);
        const query = BuilderService.getQuery(store.mediaQuery)
        const styles = { prefix: styleUpdates.prefix, states: store.activeStates, value: styleUpdates.value, queries: query, key: '', theme: store.mediaTheme }
        const updatedClass = BuilderCssService.applyClassToString(styles, className);
        store.setClassName(id,updatedClass);
         }

    /**
     * Delete an element
     */
    static deleteElement(id: string): void {
        const store = useBuilderStore.getState();
        const updatedElements = BuilderService.deleteElement(store.elements, id);
        store.setElements(updatedElements);
        store.removeClassName(id);
        if (store.selectedId === id) {
            store.setSelectedId(null);
        }
    }

    /**
     * Duplicate an element
     */
    static duplicateElement(id: string): void {
        const store = useBuilderStore.getState();
        const element = BuilderService.findElement(id, store.elements);

        if (!element) return;

        const duplicated = BuilderService.duplicateElement(element);
        store.setElements([...store.elements, duplicated]);
    }

    /**
     * Move element up or down
     */
    static moveElement(id: string, direction: 'up' | 'down'): void {
        const store = useBuilderStore.getState();
        const updatedElements = BuilderService.moveElement(store.elements, id, direction);
        store.setElements(updatedElements);
    }

    /**
     * Select an element for editing
     */
    static selectElement(id: string | null): void {
        const store = useBuilderStore.getState();
        store.setSelectedId(id);

        if (id) {
            store.setActiveTab('edit');
        }
    }

    /**
     * Export to HTML
     */
    static exportHTML(): void {
        const store = useBuilderStore.getState();
        BuilderService.exportHTML(
            store.elements,
            store.canvasBackground,
            store.canvasMaxWidth,
            store.canvasPadding
        );
    }
    /**
 * Change media query
 */
    static changeMediaQuery(mediaQuery: 'desktop' | 'mobile' | 'tablet' | 'laptop' | 'smallPhone'): void {
        useBuilderStore.getState().setMediaQuery([mediaQuery]);
    }
    /**
        * Change media theem
        */
    static changeMediaTheme(mediaTheme: 'dark' | ''): void {
        useBuilderStore.getState().setMediaTheme([mediaTheme]);
    }

    //  * Change media theem

    static changeViewTheme(viewTheme: 'dark' | ''): void {
        useBuilderStore.getState().setViewTheme(viewTheme);
    }

    //  * Change media theem

    static changeActiveState(activeStates: 'hover' | ''): void {
        useBuilderStore.getState().setActiveStates([activeStates]);
    }

    /**
     * Handle element drop
     */
    static handleDrop(type: string, parentId?: string): void {
        this.addElement(type, parentId);
    }

    /**
        * Hanlde touch end for droping elements
        */
    static handleTouchEnd(
        e: React.TouchEvent,
        canvasRef: React.RefObject<HTMLDivElement | null>,
        deviceType: string
    ): void {
        if (deviceType === 'pc') return;

        const store = useBuilderStore.getState();
        const canvas = canvasRef.current;

        if (!store.draggedType || !canvas) return;

        const touch = e.changedTouches[0];
        const rect = canvas.getBoundingClientRect();

        const isInside =
            touch.clientX >= rect.left &&
            touch.clientX <= rect.right &&
            touch.clientY >= rect.top &&
            touch.clientY <= rect.bottom;

        if (isInside) {
            this.handleDrop(store.draggedType);
        }

        this.endDrag();
    }

  /**
        * Hanlde global touch end for droping elements
        */
        static handleGlobalTouchEnd (  e:TouchEvent,

        canvasRef: React.RefObject<HTMLDivElement | null>,
        deviceType: string,
        draggedType:string|null,
    )  {

          if (deviceType !== 'pc' && draggedType && canvasRef.current) {
            const touch = e.changedTouches[0];
            const rect = canvasRef.current.getBoundingClientRect();
    
            if (
              touch.clientX >= rect.left &&
              touch.clientX <= rect.right &&
              touch.clientY >= rect.top &&
              touch.clientY <= rect.bottom
            ) {
              this.handleDrop(draggedType);
            }
            this.endDrag();
          }
        };
    



    /**
     * Change view mode
     */
    static changeView(view: 'desktop' | 'mobile' | 'tablet' | 'laptop' | 'smallPhone'): void {
        useBuilderStore.getState().setView(view);
    }

    /**
     * Change zoom level
     */
    static changeZoom(zoom: number): void {
        useBuilderStore.getState().setZoom(zoom);
    }

    /**
     * Change active tab
     */
    static changeTab(tab: 'preview' | 'edit' | 'structure'): void {
        useBuilderStore.getState().setActiveTab(tab);
    }

    /**
     * Toggle_Full_Screen
     */
    static toggleFullScreen(): void {

        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();

        };


    }

    /**
     * Update canvas settings
     */
    static updateCanvasSettings(settings: {
        background?: string;
        gradient?: string | null;
        maxWidth?: string;
        padding?: string;
    }): void {
        const store = useBuilderStore.getState();

        if (settings.background !== undefined) {
            store.setCanvasBackground(settings.background);
        }
        if (settings.gradient !== undefined) {
            store.setCanvasGradient(settings.gradient);
        }
        if (settings.maxWidth !== undefined) {
            store.setCanvasMaxWidth(settings.maxWidth);
        }
        if (settings.padding !== undefined) {
            store.setCanvasPadding(settings.padding);
        }
    }

    /**
     * Start dragging an element type
     */
    static startDrag(type: string): void {
        useBuilderStore.getState().setDraggedType(type);
    }

    /**
     * End dragging
     */
    static endDrag(): void {
        useBuilderStore.getState().setDraggedType(null);

    }
}