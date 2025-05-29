import { useCvPageContext } from "../context/useCVContext";

export interface CvPaperTextProps {
  content?: string;
  fontStyle?: "italic" | "normal" | "bold";
  fontName?: string;
  fontColor?: string;
  fontSize?: string;
}
const CvPaperText = ({
  content,
  fontColor,
  fontStyle = "normal",
  fontSize = "1rem",
}: CvPaperTextProps) => {
  const { scale } = useCvPageContext();
  return (
    <p
      style={{
        color: fontColor || "black",
        fontStyle: fontStyle,
        fontWeight: fontStyle === "bold" ? "bold" : "normal",
        fontSize: `calc(${fontSize} * ${scale})`,
      }}
    >
      {content}
    </p>
  );
};

export default CvPaperText;
