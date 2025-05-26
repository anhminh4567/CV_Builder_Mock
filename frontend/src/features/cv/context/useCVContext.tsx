import { Cv } from "@/types/cv/state/Cv";
import React, { createContext, useContext } from "react";

export interface CvContextType {
  id?: string;
  scale: number;
  currentCv?: Cv;
  setScale: (scale: number) => void;
  showGrid: boolean;
  setShowGrid: (showGrid: boolean) => void;
}

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
}
export const CvPageContextProvider = (props: CvContextProviderProps) => {
  return (
    <CvContext.Provider
      value={{
        id: "",
        scale: props.scale,
        setScale: props.setScale,
        currentCv: props.currentCv,
        showGrid: props.showGrid,
        setShowGrid: props.setShowGrid,
      }}
    >
      {props.children}
    </CvContext.Provider>
  );
};
