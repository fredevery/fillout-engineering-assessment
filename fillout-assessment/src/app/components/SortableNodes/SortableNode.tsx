import React, { isValidElement, cloneElement, type ReactElement } from 'react'
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities';

export type DraggableNode = ReactElement<{
    id: string;
    dragHandleRef?: (node: HTMLElement | null) => void;
}>
export type SortableNodeProps = Readonly<{
    children: DraggableNode;
}>

export default React.memo(function SortableNode({
    children
}: SortableNodeProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        isDragging,
        transform,
        transition,
    } = useSortable({ id: children?.props.id });

    if (transform) {
        transform.scaleX = 1;
    }

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`sortable-node ${isDragging ? 'dragging' : ''}`}>
            {isValidElement(children) ? cloneElement(children, { dragHandleRef: setActivatorNodeRef }) : null}
        </div>
    )
})