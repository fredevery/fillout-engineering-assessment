import { create } from "zustand";
import { combine } from "zustand/middleware";
import { Info, FileText } from "lucide-react";

export type Page = {
    id: string;
    title: string;
    icon: typeof Info | typeof FileText;
    isActive: boolean;
    isNew?: boolean;
    isDragging?: boolean;
};

type PagesStoreState = {
    pages: Page[];
    showContextMenu: boolean;
    contextMenuPageId: string;
};

type PagesStore = PagesStoreState & {
    setPages: (
        pages: Page[],
        callback?: (state: PagesStoreState) => void
    ) => void;
    setShowContextMenu: (show: boolean) => void;
    setContextMenuPageId: (pageId: string) => void;
};

export const usePagesStore = create<PagesStore>()(
    combine(
        {
            pages: [
                { id: "page1", title: "Page 1", icon: Info, isActive: true },
                {
                    id: "page2",
                    title: "Page 2",
                    icon: FileText,
                    isActive: false,
                },
                {
                    id: "page3",
                    title: "Page 3",
                    icon: FileText,
                    isActive: false,
                },
            ] as Page[],
            showContextMenu: false,
            contextMenuPageId: "",
        },
        (set, get) => ({
            setPages: (
                pages: Page[],
                callback?: (state: PagesStoreState) => void
            ) => {
                set({ pages });
                if (callback) callback(get());
            },
            setShowContextMenu: (show: boolean) =>
                set({ showContextMenu: show }),
            setContextMenuPageId: (pageId: string) =>
                set({ contextMenuPageId: pageId }),
        })
    )
);
