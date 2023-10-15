export interface Draggable {
    dragStartHandler(event: DragEvent): void; // allow to drag
    dragEndHandler(event: DragEvent): void; // when the drag ends
}

export interface DragTarget {
    dragOverHandler(event: DragEvent): void; // when the draggable element is over the target
    dropHandler(event: DragEvent): void; // when the draggable element is dropped
    dragLeaveHandler(event: DragEvent): void; // when the draggable element is leaving the target
}