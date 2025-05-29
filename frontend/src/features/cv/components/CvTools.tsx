import { Tooltip } from "@/components/ui/tooltip";
import { Stack, StackSeparator } from "@chakra-ui/react";
import { BiAdjust } from "react-icons/bi";
import { useCvPageContext } from "../context/useCVContext";
import { FaEdit } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";
import { FaFilePdf, FaLayerGroup } from "react-icons/fa6";
import React from "react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import CvPaperContainer from "./CvPaperContainer";
import { BaseSection } from "@/types/cv/BaseSection";
import { Component } from "@/types/cv/state/Component";
import { Cv } from "@/types/cv/state/Cv";
import CvComponentEditorDrawer from "./CvComponentEditorDrawer";

export interface CvToolsProps {
  onShowGridClick?: () => void;
}
const CvTools = ({ onShowGridClick }: CvToolsProps) => {
  const { isEditing, setIsEditing, savedCv, exportPdf, setCurrentCv } =
    useCvPageContext();
  const [isComponentStackOpen, setIsComponentStackOpen] = React.useState(true);
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectedComponentId, setSelectedComponentId] = React.useState<
    string | null
  >(null);
  const [isOpenDrawer, setIsOpenDrawer] = React.useState<boolean>(false);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  // State to hold the actual content of the active item for the DragOverlay.
  const [activeItemContent, setActiveItemContent] =
    React.useState<Component<BaseSection> | null>(null);
  const { currentCv } = useCvPageContext();
  const gray = useColorModeValue("gray", "gray");
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && currentCv && active.id !== over.id) {
      const oldIdx = currentCv.componentIds.indexOf(active.id as string);
      const overIdx = currentCv.componentIds.indexOf(over.id as string);
      if (oldIdx === -1 || overIdx === -1) return;
      console.warn("old: ", currentCv);
      Cv.moveComponentToPosition(currentCv, oldIdx, overIdx);
      setCurrentCv(Cv.fromType(currentCv));
      console.warn("new: ", currentCv);
    }
    setActiveId(null); // Reset active ID after drag ends.
    setActiveItemContent(null); // Reset content.
    setIsDragging(false); // Reset dragging state.
  }
  function handleDragStart(event: DragEndEvent) {
    console.log("Drag Started", event.activatorEvent.type);
    setActiveId(event.active.id as string);
    const itemBeingDragged = currentCv?.Components.find(
      (item) => item.id === event.active.id
    );
    setActiveItemContent(itemBeingDragged ? itemBeingDragged : null);
    setIsDragging(true); // Set dragging state to true.
  }
  return (
    <div className="h-full flex flex-row justify-start">
      <Stack separator={<StackSeparator />} className="h-full p-2">
        <Tooltip content="show | hide grid" showArrow>
          <BiAdjust
            className="text-2xl cursor-pointer hover:scale-110 transition-transform duration-200"
            onClick={() => onShowGridClick?.()}
          />
        </Tooltip>
        <Tooltip content="set is editing" showArrow>
          <FaEdit
            className="text-2xl cursor-pointer hover:scale-110 transition-transform duration-200"
            style={{
              color: isEditing ? "teal" : "",
              transition: "color 0.2s ease",
            }}
            onClick={() => setIsEditing()}
          />
        </Tooltip>
        <Tooltip content="save" showArrow>
          <IoMdSave
            className="text-2xl cursor-pointer hover:scale-110 transition-transform duration-200"
            onClick={() => {
              if (savedCv) {
                savedCv();
              }
            }}
          />
        </Tooltip>
        <Tooltip content="export pdf" showArrow>
          <FaFilePdf
            className="text-2xl cursor-pointer hover:scale-110 transition-transform duration-500"
            onClick={() => {
              if (exportPdf) {
                exportPdf();
              }
            }}
          />
        </Tooltip>
        <Tooltip content="components stack" showArrow>
          <FaLayerGroup
            style={{
              color: isComponentStackOpen ? "teal" : "",
              transition: "color 0.2s ease",
            }}
            className="text-2xl cursor-pointer hover:scale-110 transition-transform duration-500"
            onClick={() => {
              setIsComponentStackOpen(!isComponentStackOpen);
            }}
          />
        </Tooltip>
      </Stack>
      <Stack
        className=" overflow-x-auto  "
        style={{
          maxWidth: "50vw",
          width: isComponentStackOpen ? "100vw" : "0px",
          transition: "width 0.3s ease-in-out",
        }}
      >
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
          {currentCv && (
            <SortableContext
              items={Cv.fromType(currentCv).componentIds}
              strategy={verticalListSortingStrategy}
            >
              {currentCv?.Components.map((component) => (
                <CvPaperContainer
                  ID={component.id}
                  key={component.id}
                  onClick={() => {
                    // if (isDragging) return;
                    console.log("Clicked on component:", component.id);
                    setSelectedComponentId(component.id);
                    setIsOpenDrawer(true);
                  }}
                >
                  <div className="border rounded-md border-gray-500 p-2 w-[80%] hover:translate-x-6 transition-transform">
                    <p>{component.name}</p>
                    <span className="text-sm " style={{ color: gray }}>
                      {component.details.componentName} ({component.type})
                    </span>
                  </div>
                </CvPaperContainer>
              ))}
            </SortableContext>
          )}
        </DndContext>
      </Stack>
      <CvComponentEditorDrawer
        open={isOpenDrawer}
        setClose={() => {
          setIsOpenDrawer(false);
          setSelectedComponentId(null);
        }}
        componentId={selectedComponentId!}
      />
    </div>
  );
};

export default CvTools;
