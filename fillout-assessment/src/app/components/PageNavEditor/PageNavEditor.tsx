"use client";

import { useCallback, useMemo } from "react";
import { Plus } from "lucide-react";
import { useEditablePages } from "@/app/hooks/useEditablePages";
import SortableNodesContainer, { type DragStartEvent, type DragEndEvent } from "@/app/components/SortableNodes/SortableNodesContainer";
// import PageNodeSortableContainer from "./PageNodeSortableContainer";
import styles from "./PageNavEditor.module.css";
import PageNodeContextMenu from "./PageNodeContextMenu";
import PageNode from "./PageNode";

export type Page = {
    id: string;
    title: string;
    icon?: React.ReactNode;
    isActive: boolean;
}

export default function PageNavEditor() {
    const { pages, draggingPage, addNewPageToEnd, setPageAsDragging, movePage } = useEditablePages();

    const handleDragStart = useCallback((event: DragStartEvent) => {
        setPageAsDragging(event.active.id as string);
    }, [setPageAsDragging]);
    
    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            movePage(active.id as string, over?.id as string);
        } else {
            setPageAsDragging(null);
        }
    }, [movePage, setPageAsDragging]);

    const overlayNode = useMemo(() => {
        if (!draggingPage) return null;
        return <PageNode 
            id={draggingPage.id} 
            page={draggingPage} 
            index={-1}
            isOverlay />;
    }, [draggingPage])

    return (
        <div className={styles.pageNavEditor}>
            <div className={styles.pageNodesContainer}>
                <SortableNodesContainer items={pages}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    overlayNode={overlayNode}>
                    {pages.map((page, index) => (
                        <PageNode
                            id={page.id}
                            key={page.id}
                            page={page}
                            index={index}
                            isLastNode={index === pages.length - 1} />
                    ))}    
                </SortableNodesContainer> 
            </div>
            <button className={styles.addPageButton}
                onClick={addNewPageToEnd}>
                <Plus size={14} strokeWidth={3} />
                <label>Add Page</label>
            </button>
            <PageNodeContextMenu />
        </div>
    );
}



