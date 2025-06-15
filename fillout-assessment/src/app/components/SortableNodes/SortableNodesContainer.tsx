import { Children } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    UniqueIdentifier,
    type DragStartEvent,
    type DragEndEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableNode, { type DraggableNode } from './SortableNode';

export { type DragStartEvent, type DragEndEvent } from '@dnd-kit/core';

type SortableNodesContainerProps = Readonly<{
    items: {
        id: UniqueIdentifier;
    }[];
    children: DraggableNode[];
    overlayNode?: React.ReactNode;
    onDragStart: (event: DragStartEvent) => void;
    onDragEnd: (event: DragEndEvent) => void;
}>;

export default function SortableNodesContainer({
    items,
    children,
    overlayNode,
    onDragStart,
    onDragEnd
}: SortableNodesContainerProps) {
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}>
            <SortableContext
                items={items}
                strategy={horizontalListSortingStrategy}>
                {Children.map(children, (child) => (
                    <SortableNode>
                        {child}
                    </SortableNode>
                ))}
            </SortableContext>
            <DragOverlay>
                {overlayNode}
            </DragOverlay>
        </DndContext>
    )
}