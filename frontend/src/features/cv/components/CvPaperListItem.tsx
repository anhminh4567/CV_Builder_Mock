import React from "react";
import { SectionListItem } from "@/types/cv/state/AllSectionTypes";
import { Certificate, isCertificate } from "@/types/cv/Certificate";
import { Skill, isSkill } from "@/types/cv/Skill";
import { Experience, isExperience } from "@/types/cv/Experience";
import { Project, isProject } from "@/types/cv/Project";
import { useCvPageContext } from "../context/useCVContext";
import CvPaperText from "./CvPaperText";

export interface CvPaperListItemProps {
  detail: SectionListItem;
  style?: React.CSSProperties;
  className?: string;
}
const CvPaperListItem = (props: CvPaperListItemProps) => {
  const {} = useCvPageContext();
  // Merge the incoming style with a scaled font size

  const mergedStyle = {
    ...props.style,
    fontSize: props.style?.fontSize ? props.style.fontSize : "1.5rem",
  };
  let renderItem: React.ReactNode = null;
  let detailSection = undefined;
  if (isCertificate(props.detail)) {
    detailSection = props.detail as Certificate;
    renderItem = (
      <>
        <CvPaperText
          content={detailSection.name}
          fontSize={mergedStyle.fontSize as string}
        />
        <CvPaperText
          content={detailSection.issuer}
          fontSize={mergedStyle.fontSize as string}
        />
        <CvPaperText
          content={detailSection.date}
          fontSize={mergedStyle.fontSize as string}
        />
      </>
    );
  } else if (isSkill(props.detail)) {
    detailSection = props.detail as Skill;
    renderItem = (
      <>
        <CvPaperText
          content={detailSection.name}
          fontSize={mergedStyle.fontSize as string}
        />
        <CvPaperText
          content={detailSection.skill_type}
          fontSize={mergedStyle.fontSize as string}
        />
      </>
    );
  } else if (isExperience(props.detail)) {
    detailSection = props.detail as Experience;
    renderItem = (
      <>
        <CvPaperText
          content={detailSection.job_title}
          fontSize={mergedStyle.fontSize as string}
        />
        <CvPaperText
          content={detailSection.company}
          fontSize={mergedStyle.fontSize as string}
        />
        <CvPaperText
          content={`${detailSection.from_date} - ${detailSection.to_date}`}
          fontSize={mergedStyle.fontSize as string}
        />
        <CvPaperText
          content={
            Array.isArray(detailSection.description)
              ? detailSection.description.join(", ")
              : detailSection.description
          }
          fontSize={mergedStyle.fontSize as string}
        />
      </>
    );
  } else if (isProject(props.detail)) {
    detailSection = props.detail as Project;
    renderItem = (
      <>
        <CvPaperText
          content={detailSection.name}
          fontSize={mergedStyle.fontSize as string}
        />
        <CvPaperText
          content={
            Array.isArray(detailSection.description)
              ? detailSection.description.join(", ")
              : detailSection.description
          }
          fontSize={mergedStyle.fontSize as string}
        />
        <CvPaperText
          content={detailSection.link}
          fontSize={mergedStyle.fontSize as string}
        />
      </>
    );
  }
  return (
    <div style={mergedStyle} className={props.className}>
      {renderItem}
    </div>
  );
};

export default CvPaperListItem;
