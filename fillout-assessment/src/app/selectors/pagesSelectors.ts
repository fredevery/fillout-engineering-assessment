import { usePagesStore } from "../stores/pagesStore";

export const usePages = () => usePagesStore((state) => state.pages);
export const useShowContextMenu = () =>
    usePagesStore((state) => state.showContextMenu);
export const useContextMenuPageId = () =>
    usePagesStore((state) => state.contextMenuPageId);

export const useSetPages = () => usePagesStore((state) => state.setPages);
export const useSetShowContextMenu = () =>
    usePagesStore((state) => state.setShowContextMenu);
export const useSetContextMenuPageId = () =>
    usePagesStore((state) => state.setContextMenuPageId);

// export const useNewPageIsActive = () =>
//     usePagesStore((state) => state.newPageIsActive());

// export const useSetPageAsActive = () =>
//     usePagesStore((state) => state.setPageAsActive);
// export const useAddNewPageAtIndex = () =>
//     usePagesStore((state) => state.addNewPageAtIndex);
// export const useAddNewPageToEnd = () =>
//     usePagesStore((state) => state.addNewPageToEnd);
// export const useUpdatePage = () => usePagesStore((state) => state.updatePage);
// export const useRemovePage = () => usePagesStore((state) => state.removePage);
// export const useMovePage = () => usePagesStore((state) => state.movePage);
// export const useToggleContextMenu = () =>
//     usePagesStore((state) => state.toggleContextMenu);
// export const useCloseContextMenu = () =>
//     usePagesStore((state) => state.closeContextMenu);
