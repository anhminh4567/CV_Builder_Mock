import React, { useEffect } from "react";
import { useCvPageContext } from "../context/useCVContext";
import CvPaperLayout from "./CvPaperLayout";

export interface CvPaperProps {
  paperRef: React.RefObject<HTMLDivElement>;
}
// const defaultStyles: React.CSSProperties = {
//   boxSizing: "border-box",
//   backgroundColor: "transparent",
//   border: "1px dotted black",
//   fontSize: "1.5rem",
// };
const defaultPaperStyles: React.CSSProperties = {
  padding: "1rem",
};
const CvPaper = ({ paperRef }: CvPaperProps) => {
  const { currentCv, scale, setScale } = useCvPageContext();
  // const paperRef = React.useRef<HTMLDivElement>(null);
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    console.log(scale);
    if (e.deltaY > 0) {
      // Scrolling down
      let newScale = Math.max(scale - 0.05, 0.1); // Limit scale to a minimum of 0.5
      setScale(newScale); // Limit scale to a minimum of 0.5
    } else {
      // Scrolling up
      let newScale = Math.min(scale + 0.05, 2); // Limit scale to a maximum of 2
      setScale(newScale); // Limit scale to a maximum of 2
    }
  };

  useEffect(() => {
    console.log(
      "ration: " +
        (paperRef.current?.offsetWidth || 0) /
          (paperRef.current?.offsetHeight || 0)
    );
  }, [paperRef.current?.offsetWidth]);
  return (
    <>
      {currentCv && (
        <div
          ref={paperRef}
          onWheel={handleWheel}
          className="relative cv-page-main bg-white shadow-md text-black"
          style={{
            width: currentCv?.width * scale,
            // height: currentCv?.height * scale,
            padding: currentCv.cvSettings?.style?.["padding"]
              ? `calc(${currentCv.cvSettings.style["padding"]} * ${scale})`
              : `calc(${defaultPaperStyles.padding} *${scale})`,
            height: "fit-content",
          }}
        >
          <CvPaperLayout ID="1"></CvPaperLayout>
        </div>
      )}
    </>
  );
};

export default CvPaper;
