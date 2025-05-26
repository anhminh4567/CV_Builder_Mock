import React from "react";
import { useCvPageContext } from "../context/useCVContext";
import CvLayoutGrid from "./CvLayoutGrid";

export interface CvPaperProps {}

const CvPaper = ({}: CvPaperProps) => {
  const { currentCv, scale, setScale, showGrid } = useCvPageContext();
  const paperRef = React.useRef<HTMLDivElement>(null);
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
  return (
    currentCv && (
      <div
        ref={paperRef}
        onWheel={handleWheel}
        className="relative cv-page-main bg-white shadow-md text-black"
        style={{
          width: currentCv?.width * scale,
          height: currentCv?.height * scale,
        }}
      >
        <CvLayoutGrid isShowGrid={showGrid} parentRef={paperRef} />
      </div>
    )
  );
};

export default CvPaper;
