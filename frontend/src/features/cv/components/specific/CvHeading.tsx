import React from "react";
import { Heading } from "@/types/cv/Heading";
import CvPaperText from "../CvPaperText";
import _textEditor from "../_textEditor";

export interface CvHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  detail: Heading;
  style: React.CSSProperties;
  className?: string;
}

const CvHeading: React.FC<CvHeadingProps> = ({ detail, style, className }) => {
  return (
    <div style={style} className={className}>
      <CvPaperText fontStyle="bold" content={detail.fullname} fontSize="2em" />
      {detail.introduction && (
        <CvPaperText
          content={detail.introduction}
          fontSize={style.fontSize as string}
        />
      )}
    </div>
  );
};

export const EditableCvHeading = ({ detail }: { detail: Heading }) => {
  return (
    <div>
      <_textEditor content={detail.fullname} onchange={(v) => {}} />
      <_textEditor content={detail.introduction || ""} onchange={(v) => {}} />
    </div>
  );
};

export default CvHeading;
