import { create } from 'zustand';
import { Element, ElementStyles } from '../elements/builder.elements';

export interface BuilderState {
    elements: Element[];
    selectedId: string | null;
    view: 'desktop' | 'mobile';
    activeTab: 'preview' | 'edit';
    canvasBackground: string;
    canvasGradient: string | null;
    canvasMaxWidth: string;
    canvasPadding: string;
    draggedType: string | null;
    zoom: number;
}

export interface BuilderActions {
    setElements: (elements: Element[]) => void;
    setSelectedId: (id: string | null) => void;
    setView: (view: 'desktop' | 'mobile') => void;
    setActiveTab: (tab: 'preview' | 'edit') => void;
    setCanvasBackground: (bg: string) => void;
    setCanvasGradient: (gradient: string | null) => void;
    setCanvasMaxWidth: (width: string) => void;
    setCanvasPadding: (padding: string) => void;
    setDraggedType: (type: string | null) => void;
    setZoom: (zoom: number) => void;
    updateState: (updates: Partial<BuilderState>) => void;
}

export type BuilderStore = BuilderState & BuilderActions;

export const useBuilderStore = create<BuilderStore>((set) => ({
    // Initial State
    elements: [],
    selectedId: null,
    view: 'desktop',
    activeTab: 'preview',
    canvasBackground: '#ffffff',
    canvasGradient: null,
    canvasMaxWidth: '1200px',
    canvasPadding: '24px',
    draggedType: null,
    zoom: 100,

    // Actions
    setElements: (elements) => set({ elements }),
    setSelectedId: (id) => set({ selectedId: id }),
    setView: (view) => set({ view }),
    setActiveTab: (tab) => set({ activeTab: tab }),
    setCanvasBackground: (bg) => set({ canvasBackground: bg, canvasGradient: null }),
    setCanvasGradient: (gradient) => set({ canvasGradient: gradient, canvasBackground: gradient ? '' : '#ffffff' }),
    setCanvasMaxWidth: (width) => set({ canvasMaxWidth: width }),
    setCanvasPadding: (padding) => set({ canvasPadding: padding }),
    setDraggedType: (type) => set({ draggedType: type }),
    setZoom: (zoom) => set({ zoom }),
    updateState: (updates) => set((state) => ({ ...state, ...updates })),
}));