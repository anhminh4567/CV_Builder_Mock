import React from "react";
import { ExperienceList } from "@/types/cv/ExperienceList";
import CvPaperText from "../CvPaperText";
import CvPaperList from "../CvPaperList";
import _listEditor from "../_listEditor";
import _textEditor from "../_textEditor";
import { Experience } from "@/types/cv/Experience";

interface CvExperienceListProps extends React.HTMLAttributes<HTMLDivElement> {
  detail: ExperienceList;
  experience?: ExperienceList["items"];
  style?: React.CSSProperties;
  className?: string;
}

const CvExperienceList: React.FC<CvExperienceListProps> = ({
  detail,
  style,
  className,
}) => {
  return (
    <div style={style} className={className}>
      <CvPaperText content="Experience" fontStyle="bold" fontSize={"2rem"} />

      <CvPaperList style={style} detail={detail} />
    </div>
  );
};

export const EditableCvExperienceList = ({
  detail,
}: {
  detail: ExperienceList;
}) => {
  return (
    <div>
      <CvPaperText content="Experience" fontStyle="bold" fontSize={"2rem"} />
      <_listEditor<Experience>
        content={detail.items}
        onchange={(items) => {}}
        renderItemEditor={(item, idx) => (
          <div>
            <_textEditor
              content={item.job_title || ""}
              onchange={(value) => {}}
            />
            <_textEditor
              content={item.company || ""}
              onchange={(value) => {}}
            />
            <_textEditor
              content={item.description.join("\n") || ""}
              onchange={(value) => {}}
            />
            <_textEditor
              content={item.from_date || ""}
              onchange={(value) => {}}
            />
            <_textEditor
              content={item.to_date || ""}
              onchange={(value) => {}}
            />
          </div>
        )}
      />
    </div>
  );
};

export default CvExperienceList;
