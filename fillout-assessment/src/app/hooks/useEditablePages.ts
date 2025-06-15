import { type Page } from "@/app/stores/pagesStore";
import { arrayMove } from "@dnd-kit/sortable";
import { FileText } from "lucide-react";
import {
    usePages,
    useShowContextMenu,
    useContextMenuPageId,
    useSetPages,
    useSetShowContextMenu,
    useSetContextMenuPageId,
} from "@/app/selectors/pagesSelectors";

export { type Page } from "@/app/stores/pagesStore";

const createNewPage = (pageNumber: number): Page => {
    return {
        id: `page${pageNumber + 1}`,
        title: `Page ${pageNumber + 1}`,
        icon: FileText,
        isActive: true,
        isNew: true,
    };
};

export function useEditablePages() {
    const pages = usePages();
    const showContextMenu = useShowContextMenu();
    const contextMenuPageId = useContextMenuPageId();

    const draggingPage = pages.find((page) => page.isDragging) || null;
    const newPageIsActive = pages.some((page) => page.isNew);
    const setPages = useSetPages();
    const setShowContextMenu = useSetShowContextMenu();
    const setContextMenuPageId = useSetContextMenuPageId();
    const setPageAsActive = (pageId: string) => {
        const updatedPages = pages.map((page) => ({
            ...page,
            isActive: page.id === pageId,
        }));
        setPages(updatedPages);
    };
    const setPageAsDragging = (pageId: string | null) => {
        const updatedPages = pages.map((page) => ({
            ...page,
            isDragging: page.id === pageId,
        }));
        setPages(updatedPages);
    };

    const addNewPageAtIndex = (index: number) => {
        const newPage = createNewPage(pages.length);
        const updatedPages = pages.map((page) => ({
            ...page,
            isNew: false,
            isActive: false,
        }));
        setPages([
            ...updatedPages.slice(0, index),
            newPage,
            ...updatedPages.slice(index),
        ]);
    };

    const addNewPageToEnd = () => addNewPageAtIndex(pages.length);
    const removePage = (id: string) =>
        setPages(pages.filter((page) => page.id !== id));
    const updatePage = (id: string, updatedPage: Partial<Page>) => {
        setPages(
            pages.map((page) =>
                page.id === id ? { ...page, ...updatedPage } : page
            )
        );
    };
    const movePage = (id: string, targetId: string) => {
        const activePageIndex = pages.findIndex((page) => page.id === id);
        const targetPageIndex = pages.findIndex((page) => page.id === targetId);

        if (activePageIndex === -1 || targetPageIndex === -1) return;

        const updatedPages = arrayMove(
            pages,
            activePageIndex,
            targetPageIndex
        ).map((page) => ({
            ...page,
            isDragging: false,
        }));
        setPages(updatedPages);
    };
    const toggleContextMenu = (pageId: string) => {
        setContextMenuPageId(pageId);
        setShowContextMenu(contextMenuPageId !== pageId || !showContextMenu);
    };
    const closeContextMenu = () => {
        setShowContextMenu(false);
    };

    return {
        pages,
        showContextMenu,
        contextMenuPageId,
        newPageIsActive,
        draggingPage,
        usePages,
        setPageAsActive,
        setPageAsDragging,
        addNewPageAtIndex,
        addNewPageToEnd,
        removePage,
        updatePage,
        movePage,
        setContextMenuPageId,
        toggleContextMenu,
        closeContextMenu,
    };
}
