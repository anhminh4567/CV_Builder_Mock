import React from "react";
import { SkillList } from "@/types/cv/SkillList";
import CvPaperText from "../CvPaperText";
import CvPaperList from "../CvPaperList";
import _listEditor from "../_listEditor";
import _textEditor from "../_textEditor";
import { Skill } from "@/types/cv/Skill";

export interface CvSkillListProps extends React.HTMLAttributes<HTMLDivElement> {
  detail: SkillList;
  style?: React.CSSProperties;
  className?: string;
}

const CvSkillList: React.FC<CvSkillListProps> = ({
  detail,
  style,
  className,
}) => {
  const fontSize = style?.fontSize ? String(style.fontSize) : undefined;
  return (
    <div style={style} className={className}>
      <CvPaperText
        content="Skills"
        fontStyle="bold"
        fontSize={fontSize || "2rem"}
      />
      <CvPaperList detail={detail} style={style} />
    </div>
  );
};

export const EditableCvSkillList: React.FC<
  Omit<CvSkillListProps, "detail"> & {
    detail: SkillList;
    onDetailChange: (value: SkillList) => void;
  }
> = ({ detail, style, className, onDetailChange: onDetailChange }) => {
  const fontSize = style?.fontSize ? String(style.fontSize) : undefined;
  const handleChange = (idx: number, value: string) => {
    const newItems = [...detail.items];
    newItems[idx] = { ...newItems[idx], name: value };
    onDetailChange({ ...detail, items: newItems });
  };
  const handleAdd = () => {
    const newItems = [...detail.items, { componentName: "Skill" } as Skill];
    onDetailChange({ ...detail, items: newItems });
  };
  return (
    <div style={style} className={className}>
      <CvPaperText
        content="Skills"
        fontStyle="bold"
        fontSize={fontSize || "2rem"}
      />
      <div className="w-full flex flex-row justify-around gap-2 p-2">
        <p>Skill Type</p>
        <p>Skills</p>
      </div>
      <_listEditor<Skill>
        content={detail.items}
        renderItemEditor={(item, idx) => (
          <div className="flex flex-row gap-2">
            <_textEditor
              content={item.skill_type || ""}
              onchange={(v) => {
                handleChange(Number(idx), v);
              }}
            />

            <_textEditor
              content={item.name || ""}
              onchange={(v) => handleChange(Number(idx), v)}
            />
          </div>
        )}
        onAddItem={handleAdd}
      />
    </div>
  );
};

export default CvSkillList;
