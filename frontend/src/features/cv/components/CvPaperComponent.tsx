export interface CvPaperComponentProps {
  style?: React.CSSProperties;
  className?: string;
  childComponents?: React.ReactNode[];
}
const defaultStyles: React.CSSProperties = {
  boxSizing: "border-box",
  backgroundColor: "transparent",
  border: "1px solid #ccc",
  color: "black",
};
const CvPaperComponent = ({ style = defaultStyles }: CvPaperComponentProps) => {
  return <div style={style}>CvPaperComponentList</div>;
};

export default CvPaperComponent;
