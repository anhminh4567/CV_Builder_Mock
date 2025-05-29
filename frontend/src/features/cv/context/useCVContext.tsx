import { Cv } from "@/types/cv/state/Cv";
import { CvSettings } from "@/types/cv/state/CvSettings";
import React, { createContext, useContext, useEffect } from "react";

export interface CvContextType {
  id?: string;
  scale: number;
  currentCv?: Cv;
  setCurrentCv: (cv: Cv) => void;
  setScale: (scale: number) => void;
  showGrid: boolean;
  setShowGrid: (showGrid: boolean) => void;
  layoutCount?: number;
  globalCvStyle?: React.CSSProperties;
  setGlobalCvStyle?: (style: React.CSSProperties) => void;
  isEditing: boolean;
  setIsEditing: () => void;
  selectedElementId: string | null;
  setSelectedElementId?: (id: string) => void;
  savedCv?: () => void;
  exportPdf?: () => void;
}
const defaultStyles: React.CSSProperties = {
  boxSizing: "border-box",
  backgroundColor: "transparent",
  // border: "1px dotted black",
  fontSize: "1.5rem",
};
const CvContext = createContext<CvContextType | null>(null);

export const useCvPageContext = () => {
  const context = useContext(CvContext);
  if (!context) {
    throw new Error("CvContext must be used within a CvContextProvider");
  }
  return context;
};

export interface CvContextProviderProps extends React.PropsWithChildren {
  scale: number;
  setScale: (scale: number) => void;
  showGrid: boolean;
  setShowGrid: () => void;
  currentCv?: Cv;
  onSaveCv: (currentCv: Cv) => void;
  onExportPdf?: (currentCv: Cv) => void;
}
export const CvPageContextProvider = (props: CvContextProviderProps) => {
  function getLayoutCount(layout: CvSettings["layout"]) {
    switch (layout) {
      case "SingleColumn":
        return 1;
      case "TwoColumns":
        return 2;
      case "ThreeColumns":
        return 3;
      default:
        return 1; // Default to one-column layout
    }
  }
  const [layoutCount, setLayoutCount] = React.useState<number>(
    getLayoutCount(props.currentCv?.cvSettings?.layout || "SingleColumn")
  );
  const [currentCv, changeCurrentCv] = React.useState<Cv | undefined>(
    props.currentCv
  );

  const [isEditable, setIsEditable] = React.useState(true);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  useEffect(() => {
    setLayoutCount(
      getLayoutCount(props.currentCv?.cvSettings?.layout || "SingleColumn")
    );
  }, [props.currentCv?.cvSettings?.layout]);
  useEffect(() => {
    changeCurrentCv(props.currentCv);
  }, [props.currentCv]);
  return (
    <CvContext.Provider
      value={{
        id: "",
        scale: props.scale,
        setScale: props.setScale,
        currentCv: currentCv,
        setCurrentCv: (cv: Cv) => {
          changeCurrentCv(cv);
        },
        showGrid: props.showGrid,
        setShowGrid: props.setShowGrid,
        layoutCount: layoutCount,
        globalCvStyle: defaultStyles,
        isEditing: isEditable,
        setIsEditing: () => setIsEditable(!isEditable),
        selectedElementId: selectedId,
        setSelectedElementId: (id: string) => {
          if (selectedId === id) {
            setSelectedId(null);
          } else {
            setSelectedId(id);
          }
        },
        savedCv: () => {
          if (props.onSaveCv && currentCv) {
            props.onSaveCv(currentCv);
          }
        },
        exportPdf: () => {
          if (props.onExportPdf && currentCv) {
            props.onExportPdf(currentCv);
          }
        },
      }}
    >
      {props.children}
    </CvContext.Provider>
  );
};
