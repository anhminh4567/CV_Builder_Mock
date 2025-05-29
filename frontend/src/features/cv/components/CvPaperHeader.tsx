import React from "react";
import clsx from "clsx";
import { useCvPageContext } from "../context/useCVContext";

export interface CvPaperHeaderProps {
  variant?: HeaderVariants;
  content?: string | React.ReactNode;
  style?: React.CSSProperties;
  // Define any props you need for the header
}
type HeaderVariants = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
const headerStyles: Record<HeaderVariants, React.CSSProperties> = {
  h1: { fontSize: "2.25rem", fontWeight: 700, margin: "0.67em 0" },
  h2: { fontSize: "1.75rem", fontWeight: 600, margin: "0.83em 0" },
  h3: { fontSize: "1.5rem", fontWeight: 600, margin: "1em 0" },
  h4: { fontSize: "1.25rem", fontWeight: 500, margin: "1.33em 0" },
  h5: { fontSize: "1rem", fontWeight: 500, margin: "1.67em 0" },
  h6: { fontSize: "0.875rem", fontWeight: 500, margin: "2.33em 0" },
};
const CvPaperHeader = ({
  variant = "h3",
  content,
  style,
  className,
}: CvPaperHeaderProps & { className?: string }) => {
  const { scale } = useCvPageContext();
  const mergedStyle: React.CSSProperties = {
    ...headerStyles[variant],
    ...(style || {}),
    fontSize: `calc(${headerStyles[variant].fontSize} * ${scale})`,
    fontWeight: "bold",
  };
  return (
    <span className={` ${clsx("block", className)} `} style={mergedStyle}>
      {content}
    </span>
  );
};

export default CvPaperHeader;
