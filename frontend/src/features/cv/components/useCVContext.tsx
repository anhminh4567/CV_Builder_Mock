import React, { createContext, useContext } from "react";

export interface CvContextType {
  Id?: string;
}

const CvContext = createContext<CvContextType | null>(null);

export const useCvPageContext = () => {
  const context = useContext(CvContext);
  if (!context) {
    throw new Error("CvContext must be used within a CvContextProvider");
  }
  return context;
};

export interface CvContextProviderProps extends React.PropsWithChildren {}
export const CvPageContextProvider = (props: CvContextProviderProps) => {
  return (
    <CvContext.Provider value={{ Id: "" }}>{props.children}</CvContext.Provider>
  );
};
