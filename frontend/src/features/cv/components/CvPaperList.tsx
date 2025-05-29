import React from "react";
import { SectionLists } from "@/types/cv/state/AllSectionTypes";
import CvPaperListItem from "./CvPaperListItem";

export interface CvPaperListProps {
  detail: SectionLists;
  style?: React.CSSProperties;
  className?: string;
}
const CvPaperList = (props: CvPaperListProps) => {
  return (
    <div>
      {props.detail.items?.map((item) => (
        <CvPaperListItem detail={item} />
      ))}
    </div>
  );
};

export default CvPaperList;
