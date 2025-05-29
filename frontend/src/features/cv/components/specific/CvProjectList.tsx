import React from "react";
import { ProjectList } from "@/types/cv/ProjectList";
import CvPaperText from "../CvPaperText";
import CvPaperList from "../CvPaperList";
import _listEditor from "../_listEditor";
import _textEditor from "../_textEditor";
import { Project } from "@/types/cv/Project";

export interface CvProjectListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  detail: ProjectList;
  style?: React.CSSProperties;
  className?: string;
}

const CvProjectList: React.FC<CvProjectListProps> = ({
  detail,
  style,
  className,
}) => {
  return (
    <div style={style} className={className}>
      <CvPaperText content="Projects" fontStyle="bold" fontSize={"2rem"} />
      <CvPaperList detail={detail} style={style} />
    </div>
  );
};

export const EditableCvProjectList: React.FC<
  Omit<CvProjectListProps, "detail"> & {
    detail: ProjectList;
    onChange: (value: ProjectList) => void;
  }
> = ({ detail, style, className, onChange }) => {
  const handleChange = (idx: number, value: string) => {
    const newItems = [...detail.items];
    newItems[idx] = { ...newItems[idx], name: value };
    onChange({ ...detail, items: newItems });
  };
  const handleAdd = () => {
    onChange({
      ...detail,
      items: [
        ...detail.items,
        { componentName: "Project", name: "", description: [] },
      ],
    });
  };
  return (
    <div style={style} className={className}>
      <CvPaperText content="Projects" fontStyle="bold" fontSize={"2rem"} />
      <_listEditor<Project>
        content={detail.items}
        renderItemEditor={(item, idx) => (
          <div>
            <_textEditor
              content={item.name || ""}
              onchange={(v) => handleChange(Number(idx), v)}
            />
            <_listEditor<string>
              content={item.description || []}
              renderItemEditor={(desc, descIdx) => (
                <_textEditor content={desc} onchange={(v) => {}} />
              )}
            />
          </div>
        )}
        onAddItem={handleAdd}
      />
    </div>
  );
};

export default CvProjectList;
