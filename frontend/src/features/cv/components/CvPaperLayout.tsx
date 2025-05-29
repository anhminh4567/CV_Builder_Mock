import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  useDroppable,
} from "@dnd-kit/core";
import CvLayoutGrid from "./CvLayoutGrid";
import React, { useEffect } from "react";
import { useCvPageContext } from "../context/useCVContext";
import { Component } from "@/types/cv/state/Component";
import { BaseSection } from "@/types/cv/BaseSection";
import { ComponentType } from "@/types/cv/state/ComponentType";
import CvPaperContainer from "./CvPaperContainer";
import CvCertificateList from "./specific/CvCertificateList";
import CvContact from "./specific/CvContact";
import CvEducation from "./specific/CvEducation";
import CvExperienceList from "./specific/CvExperienceList";
import CvHeading from "./specific/CvHeading";
import CvProjectList from "./specific/CvProjectList";
import CvSkillList from "./specific/CvSkillList";
import CvSummary from "./specific/CvSummary";
import CvCustom from "./specific/CvCustom";
import { CertificateList } from "@/types/cv/CertificateList";
import { SkillList } from "@/types/cv/SkillList";
import { ExperienceList } from "@/types/cv/ExperienceList";
import { ProjectList } from "@/types/cv/ProjectList";
import { Education } from "@/types/cv/Education";
import { Heading } from "@/types/cv/Heading";
import { Contact } from "@/types/cv/Contact";
import { Summary } from "@/types/cv/Summary";
import { CustomSection } from "@/types/cv/CustomSection";
import {
  verticalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { Cv } from "@/types/cv/state/Cv";

export interface CvPaperLayoutProps extends React.PropsWithChildren {
  ID: string;
  // childComponents: Component<BaseSection>[];
}
const CvPaperLayout = ({ children, ID }: CvPaperLayoutProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: ID,
  });
  const { showGrid, currentCv, globalCvStyle, setCurrentCv } =
    useCvPageContext();
  const localRef = React.useRef<HTMLDivElement>(null);
  const combinedRef = (node: HTMLDivElement | null) => {
    setNodeRef(node);
    localRef.current = node;
  };
  const [activeId, setActiveId] = React.useState<string | null>(null);
  // State to hold the actual content of the active item for the DragOverlay.
  const [activeItemContent, setActiveItemContent] =
    React.useState<Component<BaseSection> | null>(null);
  const style: React.CSSProperties = {
    color: isOver ? "green" : undefined,
  };
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log("Drag Ended", active, over);
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
  }
  function handleDragStart(event: DragEndEvent) {
    setActiveId(event.active.id as string);
    const itemBeingDragged = currentCv?.Components.find(
      (item) => item.id === event.active.id
    );
    setActiveItemContent(itemBeingDragged ? itemBeingDragged : null);
  }
  useEffect(() => {}, [currentCv]);
  return (
    <div
      id={ID}
      className="layout-cv w-full h-full"
      style={style}
      ref={combinedRef}
    >
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        {children}
        <CvLayoutGrid parentRef={localRef} isShowGrid={showGrid} />
        {currentCv && (
          <SortableContext
            items={Cv.fromType(currentCv).componentIds}
            strategy={verticalListSortingStrategy}
          >
            {currentCv?.Components.map((component) => (
              <CvPaperContainer ID={component.id} key={component.id}>
                {_genreateComponent(component!, globalCvStyle ?? {})}
              </CvPaperContainer>
            ))}
          </SortableContext>
        )}
        <DragOverlay>
          {activeId && activeItemContent ? (
            <div
              style={{ width: "100%", border: "3px solid teal", scale: 1.2 }}
            >
              {_genreateComponent(activeItemContent, globalCvStyle ?? {})}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default CvPaperLayout;
function _genreateComponent(
  component: Component<BaseSection>,
  defaultStyles: React.CSSProperties
): React.ReactNode | null {
  const type: ComponentType = component.type;
  const componentName = component.details.componentName;
  let componentElement: React.ReactNode | null = null;
  switch (componentName) {
    case "CertificateList": {
      const detail = component.details as CertificateList;
      componentElement = (
        <CvCertificateList
          detail={detail}
          style={defaultStyles}
          className="cv-certificate-list"
        />
      );
      break;
    }
    case "SkillList": {
      const detail = component.details as SkillList;
      componentElement = (
        <CvSkillList
          detail={detail}
          style={defaultStyles}
          className="cv-skill-list"
        />
      );
      break;
    }
    case "ExperienceList": {
      const detail = component.details as ExperienceList;
      componentElement = (
        <CvExperienceList
          detail={detail}
          style={defaultStyles}
          className="cv-experience-list"
        />
      );
      break;
    }
    case "ProjectList": {
      const detail = component.details as ProjectList;
      componentElement = (
        <CvProjectList
          detail={detail}
          style={defaultStyles}
          className="cv-project-list"
        />
      );
      break;
    }
    case "Education": {
      const detail = component.details as Education;
      componentElement = (
        <CvEducation
          detail={detail}
          style={defaultStyles}
          className="cv-education"
        />
      );
      break;
    }
    case "Heading": {
      const detail = component.details as Heading;
      componentElement = (
        <CvHeading
          detail={detail}
          style={defaultStyles}
          className="cv-heading"
        />
      );
      break;
    }
    case "Contact": {
      const detail = component.details as Contact;
      componentElement = (
        <CvContact
          detail={detail}
          style={defaultStyles}
          className="cv-contact"
        />
      );
      break;
    }
    case "Summary": {
      const detail = component.details as Summary;
      componentElement = (
        <CvSummary
          detail={detail}
          style={defaultStyles}
          className="cv-summary"
        />
      );
      break;
    }
    case "CustomSection": {
      const detail = component.details as CustomSection;
      componentElement = (
        <CvCustom
          detail={detail}
          style={defaultStyles}
          className="cv-custom-section"
        />
      );
      break;
    }
    default:
      console.error(`Unknown component type: ${type} (${componentName})`);
  }
  if (!componentElement) {
    return null;
  }
  return componentElement;
  // return (
  //   <CvPaperContainer ID={component.id} key={component.id}>
  //     {componentElement}
  //   </CvPaperContainer>
  // );
}
