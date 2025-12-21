import { Element, ElementFactory, ElementStyles } from '../elements/builder.elements';
import { BuilderService } from '../services/builder.services';
import { useBuilderStore } from '../store/builder.store';

export class BuilderActions {
    /**
     * Add a new element to the canvas
     */
    static addElement(type: string, parentId?: string): void {
        const store = useBuilderStore.getState();
        const newElement = ElementFactory.create(type);
        const updatedElements = BuilderService.addElement(store.elements, newElement, parentId);

        store.setElements(updatedElements);
        store.setDraggedType(null);
    }

    /**
     * Update an existing element
     */
    static updateElement(id: string, updates: Partial<Element>): void {
        const store = useBuilderStore.getState();
        const updatedElements = BuilderService.updateElement(store.elements, id, updates);
        store.setElements(updatedElements);
    }

    /**
     * Update element styles
     */
    static updateElementStyles(id: string, styleUpdates: Partial<ElementStyles>): void {
        const store = useBuilderStore.getState();
        const element = BuilderService.findElement(id, store.elements);

        if (element) {
            this.updateElement(id, {
                styles: { ...element.styles, ...styleUpdates }
            });
        }
    }

    /**
     * Delete an element
     */
    static deleteElement(id: string): void {
        const store = useBuilderStore.getState();
        const updatedElements = BuilderService.deleteElement(store.elements, id);

        store.setElements(updatedElements);

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
     * Handle element drop
     */
    static handleDrop(type: string, parentId?: string): void {
        this.addElement(type, parentId);
    }

    /**
     * Change view mode
     */
    static changeView(view: 'desktop' | 'mobile'): void {
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
    static changeTab(tab: 'preview' | 'edit'): void {
        useBuilderStore.getState().setActiveTab(tab);
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