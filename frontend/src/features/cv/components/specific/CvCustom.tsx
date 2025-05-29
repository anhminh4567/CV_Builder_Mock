import React from "react";
import { CustomSection } from "@/types/cv/CustomSection";
import CvPaperText from "../CvPaperText";
import _textEditor from "../_textEditor";
import _listEditor from "../_listEditor";

interface CvCustomProps extends React.HTMLAttributes<HTMLDivElement> {
  detail: CustomSection;
  style?: React.CSSProperties;
  className?: string;
}

const CvCustom: React.FC<CvCustomProps> = ({ detail, style, className }) => {
  const fontSize = style?.fontSize ? String(style.fontSize) : undefined;
  return (
    <div style={style} className={className}>
      <CvPaperText content={detail.name} fontStyle="bold" fontSize={"2rem"} />
      {Array.isArray(detail.content) ? (
        detail.content.map((item, idx) => (
          <CvPaperText key={idx} content={item} fontSize={fontSize} />
        ))
      ) : (
        <CvPaperText content={detail.content} fontSize={fontSize} />
      )}
    </div>
  );
};

export const EditableCvCustom = ({ detail }: { detail: CustomSection }) => {
  return (
    <div>
      <_textEditor content={detail.name || ""} onchange={(v) => {}} />
      <_listEditor<string>
        content={
          Array.isArray(detail.content) ? detail.content : [detail.content]
        }
        onchange={(items) => {}}
        renderItemEditor={(item, idx) => (
          <_textEditor key={idx} content={item} onchange={(value) => {}} />
        )}
      />
    </div>
  );
};

export default CvCustom;
