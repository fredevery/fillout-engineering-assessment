import React, { useEffect, useRef, useCallback, useMemo, useId } from "react";
import { type Page, useEditablePages } from "@/app/hooks/useEditablePages";
import { Plus, EllipsisVertical } from "lucide-react";
import { sanitize } from "@/app/utils/userInputs";
import { motion } from "motion/react"

import styles from "./PageNode.module.css";

type PageNodeProps = Readonly<{
    id: string;
    page: Page;
    index: number;
    isLastNode?: boolean;
    isDragging?: boolean;
    isOverlay?: boolean;
    dragHandleRef?: (node: HTMLElement | null) => void;
}>

export default React.memo(function PageNode({
    id,
    page,
    index,
    isLastNode,
    // isDragging = false,
    isOverlay = false,
    dragHandleRef,
}: PageNodeProps) {
    const { setPageAsActive, updatePage, removePage, toggleContextMenu, contextMenuPageId } = useEditablePages();
    const pageNameRef = useRef<HTMLLabelElement>(null);
    const uuid = useId();
    const nodeId = useMemo(() => `page-node-${uuid}`, [uuid]);

    
    const wrapperStyles = useMemo(() => ({
        anchorName: contextMenuPageId === id ? '--active-page-node' : undefined,
    } as React.CSSProperties), [contextMenuPageId, id]);

    const classNames = useMemo(() => ({
        wrapper: [
            styles.pageNodeWrapper,
            page.isDragging && !isOverlay ? styles.isDragging : "",
            isLastNode ? styles.isLastNode : "",
            page.isNew ? "--hide-new" : ""
        ],
        dragHandle: [
            styles.pageNode,
            isOverlay ? styles.isOverlay : "",
            page.isActive ? styles.isActive : "",
        ]
    }), [page, isOverlay, isLastNode]);

    useEffect(() => {
        if (!pageNameRef.current)  return;
        
        pageNameRef.current.textContent = page.title;
        if (page.isNew) {
            pageNameRef.current?.focus();
            window.getSelection()?.selectAllChildren(pageNameRef.current);
            pageNameRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center",
            });
        }
    }, [page]);

    const handleBlur = useCallback(() => {
        if (pageNameRef.current && page.isNew) {
            const newTitle = sanitize(pageNameRef.current.textContent?.trim() || "");

            if (newTitle === "") {
                return removePage(page.id);
            }

            updatePage(page.id, {
                title: newTitle,
                isNew: false,
            })
        }
    }, [page, pageNameRef, updatePage, removePage]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLLabelElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleBlur();
        }
    }, [handleBlur]);

    const handleContextMenuClick = useCallback((event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        toggleContextMenu(page.id);
    }, [page.id, toggleContextMenu]);

    const handleDragHandleClick = useCallback(() => setPageAsActive(page.id), [page.id, setPageAsActive]);

    return (
        <motion.div id={nodeId} 
            initial={page.isNew ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            className={classNames.wrapper.join(" ")}
            style={wrapperStyles}
            ref={dragHandleRef}>
            <div
                className={classNames.dragHandle.join(" ")}
                onContextMenu={handleContextMenuClick}
                onClick={handleDragHandleClick}>
                <page.icon size={18} />
                <>
                    {page.isNew ? (
                        <label ref={pageNameRef}
                            contentEditable={page.isNew}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown} />
                    ) : (
                        <label>{page.title}</label>
                    )}
                </>
                <button className={styles.contextButton} onClick={handleContextMenuClick}>
                    <EllipsisVertical size={16} strokeWidth={1.75} />
                </button>
            </div>
            {!isOverlay && <PageNodeGap index={index} />}
        </motion.div>
    );
})

const PageNodeGap = React.memo(function PageNodeGap({
    index
}: Readonly<{
    index: number;
}>) {
    const { addNewPageAtIndex, newPageIsActive } = useEditablePages();
    const disabled = newPageIsActive;
    const classNames = useMemo(() => [
        styles.pageNodeGap,
        disabled ? styles.gapDisabled : "",
    ], [disabled]);

    const handleAddPageClick = useCallback(() => {
        addNewPageAtIndex(index + 1);
    }, [addNewPageAtIndex, index]);

    return (
        <div className={classNames.join(" ")}>
            {!disabled && (
                <button className={styles.addPageButton}
                    onClick={handleAddPageClick}>
                    <Plus size={8} strokeWidth={3} />
                </button>
            )}
        </div>
    )
})