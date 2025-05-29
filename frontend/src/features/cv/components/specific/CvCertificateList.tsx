import React from "react";
import { CertificateList } from "@/types/cv/CertificateList";
import CvPaperText from "../CvPaperText";
import CvPaperList from "../CvPaperList";
import _listEditor from "../_listEditor";
import _textEditor from "../_textEditor";

interface CvCertificateListProps extends React.HTMLAttributes<HTMLDivElement> {
  detail: CertificateList;
  style?: React.CSSProperties;
  className?: string;
}

const CvCertificateList: React.FC<CvCertificateListProps> = ({
  detail,
  style,
  className,
}) => {
  const fontSize = style?.fontSize ? String(style.fontSize) : undefined;
  return (
    <div style={style} className={className}>
      <CvPaperText
        content="Certificates"
        fontStyle="bold"
        fontSize={fontSize || "2rem"}
      />
      <CvPaperList detail={detail} style={style} />
    </div>
  );
};

export const EditableCvCertificateList: React.FC<
  Omit<CvCertificateListProps, "detail"> & {
    detail: CertificateList;
    onChange: (value: CertificateList) => void;
  }
> = ({ detail, style, className, onChange }) => {
  const fontSize = style?.fontSize ? String(style.fontSize) : undefined;
  const handleChange = (idx: number, value: string) => {
    const newItems = [...detail.items];
    newItems[idx] = { ...newItems[idx], name: value };
    onChange({ ...detail, items: newItems });
  };
  const handleAdd = () => {
    onChange({
      ...detail,
      items: [...detail.items, { componentName: "Certificate", name: "" }],
    });
  };
  return (
    <div style={style} className={className}>
      <_listEditor
        content={detail}
        onchange={(items) => onChange({ ...detail, items })}
        renderItemEditor={(item, idx) => (
          <_textEditor
            content={item.name || ""}
            onchange={(v) => handleChange(Number(idx), v)}
          />
        )}
        onAddItem={handleAdd}
      />
    </div>
  );
};

export default CvCertificateList;
