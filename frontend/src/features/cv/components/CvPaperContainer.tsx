// import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { useCvPageContext } from "../context/useCVContext";

export interface CvPaperContainerProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  ID: string;
  isOverlay?: boolean;
}

const CvPaperContainer = ({
  children,
  ID,
  isOverlay = false,
  onClick,
}: CvPaperContainerProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: dndIsDragging,
  } = useSortable({ id: ID });

  // const mergedStyle = transform
  //   ? {
  //       transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  //     }
  //   : undefined;
  const { isEditing } = useCvPageContext();
  const mergedStyle: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    boxSizing: "border-box",
    opacity: !isOverlay && dndIsDragging ? 0.1 : 1,
  };
  const listenersOnState = isEditing ? { ...listeners } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={mergedStyle}
      className={`cv-paper-container${
        !isOverlay && dndIsDragging ? " dragging" : ""
      }`}
      {...listenersOnState}
      {...attributes}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CvPaperContainer;
