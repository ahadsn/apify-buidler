import { create } from 'zustand';
import { PageElement,  } from '../elements/types/pageElement.types';


export type ViewType = 'desktop' | 'mobile' | 'tablet' | 'laptop' | 'smallPhone';
export type ThemeType = 'dark' | '';
export type TabType = 'preview' | 'edit' | 'structure';
export type activeStatesType=''|'hover';
export type classesType =Record<string, string>;

export interface BuilderState {
    elements: PageElement[];
    classes:classesType;
    selectedId: string | null;
    view: ViewType;
    viewTheme: ThemeType;
    mediaTheme: ThemeType[];
    mediaQuery: ViewType[];
    activeTab: TabType;
    activeStates: activeStatesType[];
    canvasBackground: string;
    canvasGradient: string | null;
    canvasMaxWidth: string;
    canvasPadding: string;
    draggedType: string | null;
    zoom: number;
}


export interface BuilderActions {
    setElements: (elements: PageElement[]) => void;
    setSelectedId: (id: string | null) => void;
    setView: (view: 'desktop' |'mobile'|'tablet'|'laptop'|'smallPhone') => void;
    setMediaQuery: (mediaQuery: ViewType[]) => void;
    setViewTheme:(viewTheme:'dark'|''  )=>void,
    setMediaTheme:(mediaTheme:ThemeType[])=>void,
    setActiveStates:(activeStates:activeStatesType[])=>void;
    setActiveTab: (tab: 'preview' | 'edit' | 'structure') => void;
    setClassName: (elementId: string, className: string) => void;
removeClassName: (elementId: string) => void;
getClassName: (elementId: string) => string;

    setCanvasBackground: (bg: string) => void;
    setCanvasGradient: (gradient: string | null) => void;
    setCanvasMaxWidth: (width: string) => void;
    setCanvasPadding: (padding: string) => void;
    setDraggedType: (type: string | null) => void;
    setZoom: (zoom: number) => void;
    updateState: (updates: Partial<BuilderState>) => void;
}

export type BuilderStore = BuilderState & BuilderActions;
export const useBuilderStore = create<BuilderStore>((set, get) => ({
  // Initial State
  elements: [],
  classes: {},
  selectedId: null,
  view: 'desktop',
  viewTheme: '',
  mediaTheme: [''],
  mediaQuery: ['smallPhone'],
  activeStates: [''],
  activeTab: 'preview',
  canvasBackground: '#ffffff',
  canvasGradient: null,
  canvasMaxWidth: '100%',
  canvasPadding: '0px',
  draggedType: null,
  zoom: 100,

  // Actions
  setElements: (elements) => set({ elements }),
  setSelectedId: (id) => set({ selectedId: id }),
  setView: (view) => set({ view }),
  setViewTheme: (viewTheme) => set({ viewTheme }),
  setMediaTheme: (mediaTheme) => set({ mediaTheme }),
  setMediaQuery: (mediaQuery) => set({ mediaQuery }),
  setActiveStates: (activeStates) => set({ activeStates }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setCanvasBackground: (bg) =>
    set({ canvasBackground: bg, canvasGradient: null }),
  setCanvasGradient: (gradient) =>
    set({
      canvasGradient: gradient,
      canvasBackground: gradient ? '' : '#ffffff',
    }),
  setCanvasMaxWidth: (width) => set({ canvasMaxWidth: width }),
  setCanvasPadding: (padding) => set({ canvasPadding: padding }),
  setDraggedType: (type) => set({ draggedType: type }),
  setZoom: (zoom) => set({ zoom }),
  updateState: (updates) => set((state) => ({ ...state, ...updates })),

  setClassName: (elementId, className) =>
    set((state) => ({
      classes: {
        ...state.classes,
        [elementId]: className.trim(),
      },
    })),

  removeClassName: (elementId) =>
    set((state) => {
      const classes = { ...state.classes };
      delete classes[elementId];
      return { classes };
    }),

  getClassName: (elementId) =>
    get().classes[elementId] ?? '',
}));
