import React from "react";

export interface CvLayoutGridProps {
  parentRef: React.RefObject<HTMLDivElement | null>;
  columns?: number;
  isShowGrid?: boolean;
  settings?: CvLayoutGridSettings;
}
export interface CvLayoutGridSettings {
  textPercentToParentWidth: number; // Percentage of parent width for text size
  borderPercentToParentWidth: number; // Percentage of parent width for border size
  borderColor: string; // Color of the border
}
const DEFAULT_SETTINGS: CvLayoutGridSettings = {
  textPercentToParentWidth: 5,
  borderPercentToParentWidth: 0.8,
  borderColor: "purple",
};

const CvLayoutGrid = React.forwardRef<HTMLDivElement, CvLayoutGridProps>(
  (
    { parentRef, columns = 1, isShowGrid = true, settings = DEFAULT_SETTINGS },
    ref
  ) => {
    React.useEffect(() => {
      if (parentRef.current) {
        const rect = parentRef.current.getBoundingClientRect();
        const visibleWidth = parentRef.current.clientWidth;
        const visibleHeight = parentRef.current.clientHeight;
        // scrollWidth and scrollHeight give the total scrollable area
        //means all the conent, even OVERFLOW content !!!!
        // const allWidth = parentRef.current.scrollWidth;
        // const allHeight = parentRef.current.scrollHeight;
        const style = window.getComputedStyle(parentRef.current);
        const marginLeft = parseFloat(style.marginLeft);
        const marginRight = parseFloat(style.marginRight);
        console.log(
          `Parent Rect: ${rect.width}x${
            rect.height
          }, Visible: ${visibleWidth}x${visibleHeight}, Margin: ${
            marginLeft + marginRight
          }`
        );
      }
    }, [parentRef]);
    return (
      <div
        ref={ref}
        className="absolute top-0 left-0 w-full h-full bg-transparent text-black"
        style={{
          display: isShowGrid ? "grid" : "none",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          width: "100%",
          height: "100%",
        }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <div
            key={index}
            className="border border-dotted border-purple-500 "
            style={{
              borderWidth:
                (parentRef.current?.clientWidth! / 100) *
                settings.borderPercentToParentWidth!,
              fontSize:
                (parentRef.current?.clientWidth! / 100) *
                settings.textPercentToParentWidth!,
            }}
          >
            {/* Column {index + 1} */}
          </div>
        ))}
      </div>
    );
  }
);

export default CvLayoutGrid;
