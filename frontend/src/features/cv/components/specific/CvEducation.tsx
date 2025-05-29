import React from "react";
import { Education } from "@/types/cv/Education";
import CvPaperText from "../CvPaperText";
import _textEditor from "../_textEditor";

interface CvEducationProps extends React.HTMLAttributes<HTMLDivElement> {
  detail: Education;
  style?: React.CSSProperties;
  className?: string;
}

const CvEducation: React.FC<CvEducationProps> = ({
  detail,
  style,
  className,
}) => {
  const fontSize = style?.fontSize ? String(style.fontSize) : undefined;
  return (
    <div style={style} className={className}>
      <CvPaperText content="Education" fontStyle="bold" fontSize={"2rem"} />
      {detail.institution && (
        <CvPaperText
          content={`Institution: ${detail.institution}`}
          fontSize={fontSize}
        />
      )}
      {detail.degree && (
        <CvPaperText content={`Degree: ${detail.degree}`} fontSize={fontSize} />
      )}
      {detail.gpa !== undefined && (
        <CvPaperText content={`GPA: ${detail.gpa}`} fontSize={fontSize} />
      )}
      {detail.date && (
        <CvPaperText content={`Date: ${detail.date}`} fontSize={fontSize} />
      )}
      {detail.major && (
        <CvPaperText content={`Major: ${detail.major}`} fontSize={fontSize} />
      )}
    </div>
  );
};

export const EditableCvEducation: React.FC<
  Omit<CvEducationProps, "detail"> & {
    detail: Education;
    onChange: (value: Education) => void;
  }
> = ({ detail, style, className, onChange }) => {
  const fontSize = style?.fontSize ? String(style.fontSize) : undefined;
  return (
    <div style={style} className={className}>
      <CvPaperText content="Education" fontStyle="bold" fontSize={"2rem"} />
      <_textEditor
        content={detail.institution || ""}
        onchange={(v) => onChange({ ...detail, institution: v })}
      />
      <_textEditor
        content={detail.degree || ""}
        onchange={(v) => onChange({ ...detail, degree: v })}
      />
      <_textEditor
        content={detail.gpa !== undefined ? String(detail.gpa) : ""}
        onchange={(v) =>
          onChange({ ...detail, gpa: v ? Number(v) : undefined })
        }
      />
      <_textEditor
        content={detail.date || ""}
        onchange={(v) => onChange({ ...detail, date: v })}
      />
      <_textEditor
        content={detail.major || ""}
        onchange={(v) => onChange({ ...detail, major: v })}
      />
    </div>
  );
};

export default CvEducation;
