import { Sections } from "@/types/cv/state/AllSectionTypes";
import { Education } from "@/types/cv/Education";
import { Heading } from "@/types/cv/Heading";
import { Contact } from "@/types/cv/Contact";
import { Summary } from "@/types/cv/Summary";
import { CustomSection } from "@/types/cv/CustomSection";
import { useCvPageContext } from "../context/useCVContext";

export interface CvPaperCustomSectionProps {
  // Define any props you need for the custom section
  detail: Sections;
  style?: React.CSSProperties;
  className?: string;
}
const CvPaperSection = (props: CvPaperCustomSectionProps) => {
  let renderSection: React.ReactNode = null;
  const { detail } = props;
  const { scale } = useCvPageContext();
  const mergedStyle = {
    ...props.style,
    fontSize: props.style?.fontSize
      ? `calc(${props.style.fontSize} * ${scale})`
      : `calc(1rem * ${scale})`,
  };
  if ((detail as any).componentName === "Education") {
    const section = detail as Education;
    renderSection = (
      <>
        <p>{section.institution}</p>
        <p>{section.degree}</p>
        <p>{section.gpa}</p>
        <p>{section.date}</p>
        <p>{section.major}</p>
      </>
    );
  } else if ((detail as any).componentName === "Heading") {
    const section = detail as Heading;
    renderSection = (
      <>
        <p>{section.fullname}</p>
        <p>{section.introduction}</p>
      </>
    );
  } else if ((detail as any).componentName === "Contact") {
    const section = detail as Contact;
    renderSection = (
      <>
        <p>{section.email}</p>
        <p>{section.phone}</p>
        <p>{section.address}</p>
        <p>{section.linkedin}</p>
        <p>{section.github}</p>
        <p>{section.website}</p>
      </>
    );
  } else if ((detail as any).componentName === "Summary") {
    const section = detail as Summary;
    renderSection = (
      <>
        <p>
          {Array.isArray(section.summary_list)
            ? section.summary_list.join(", ")
            : section.summary_list}
        </p>
      </>
    );
  } else if ((detail as any).componentName === "CustomSection") {
    const section = detail as CustomSection;
    renderSection = (
      <>
        <p>{section.name}</p>
        <p>
          {Array.isArray(section.content)
            ? section.content.join(", ")
            : section.content}
        </p>
      </>
    );
  }
  return <div style={mergedStyle}>{renderSection}</div>;
};

export default CvPaperSection;
