import React from "react";
import { Contact } from "@/types/cv/Contact";
import CvPaperText from "../CvPaperText";
import _textEditor from "../_textEditor";

interface CvContactProps extends React.HTMLAttributes<HTMLDivElement> {
  detail: Contact;
  style?: React.CSSProperties;
  className?: string;
}

const CvContact: React.FC<CvContactProps> = ({ detail, style, className }) => {
  const fontSize = style?.fontSize ? String(style.fontSize) : undefined;
  return (
    <div style={style} className={className}>
      <CvPaperText
        content="CONTACT"
        fontStyle="bold"
        fontSize={fontSize || "2.2rem"}
      />
      {detail.email && (
        <CvPaperText content={`Email: ${detail.email}`} fontSize={fontSize} />
      )}
      {detail.phone && (
        <CvPaperText content={`Phone: ${detail.phone}`} fontSize={fontSize} />
      )}
      {detail.address && (
        <CvPaperText
          content={`Address: ${detail.address}`}
          fontSize={fontSize}
        />
      )}
      {detail.linkedin && (
        <CvPaperText
          content={`LinkedIn: ${detail.linkedin}`}
          fontSize={fontSize}
        />
      )}
      {detail.github && (
        <CvPaperText content={`GitHub: ${detail.github}`} fontSize={fontSize} />
      )}
      {detail.website && (
        <CvPaperText
          content={`Website: ${detail.website}`}
          fontSize={fontSize}
        />
      )}
    </div>
  );
};

export const EditableCvContact: React.FC<
  Omit<CvContactProps, "detail"> & {
    detail: Contact;
    onChange: (value: Contact) => void;
  }
> = ({ detail }) => {
  return (
    <div>
      <_textEditor content={detail.email || ""} onchange={(v) => {}} />
      <_textEditor content={detail.phone || ""} onchange={(v) => {}} />
      <_textEditor content={detail.address || ""} onchange={(v) => {}} />
      <_textEditor content={detail.linkedin || ""} onchange={(v) => {}} />
      <_textEditor content={detail.github || ""} onchange={(v) => {}} />
      <_textEditor content={detail.website || ""} onchange={(v) => {}} />
    </div>
  );
};

export default CvContact;
