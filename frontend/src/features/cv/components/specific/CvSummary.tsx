import React from "react";
import { Summary } from "@/types/cv/Summary";
import CvPaperText from "../CvPaperText";
import _listEditor from "../_listEditor";
import _textEditor from "../_textEditor";

export interface CvSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  detail: Summary;
  style?: React.CSSProperties;
  className?: string;
}

const CvSummary: React.FC<CvSummaryProps> = ({ detail, style, className }) => {
  const fontSize = style?.fontSize ? String(style.fontSize) : undefined;
  return (
    <div style={style} className={className}>
      <CvPaperText content="Summary" fontStyle="bold" fontSize={"2rem"} />
      <ul>
        {detail.summary_list.map((item, idx) => (
          <li key={idx}>
            <CvPaperText content={item} fontSize={fontSize} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const EditableCvSummary: React.FC<{
  detail: Summary;
}> = ({ detail }) => {
  return (
    <div>
      <CvPaperText content="Summary" fontStyle="bold" fontSize={"2rem"} />
      <_listEditor<string>
        content={detail.summary_list}
        onchange={(items) => {
          detail.summary_list = items;
        }}
        renderItemEditor={(item, idx) => (
          <_textEditor content={item} onchange={(value) => {}} />
        )}
      />
    </div>
  );
};

export default CvSummary;
