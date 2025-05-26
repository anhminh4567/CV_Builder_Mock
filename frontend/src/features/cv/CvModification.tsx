import { Box, Skeleton } from "@chakra-ui/react";
import { CvPageContextProvider } from "./context/useCVContext";
import { ErrorBoundary } from "react-error-boundary";
import { DndContext } from "@dnd-kit/core";
import { useCvModificationStateStore } from "@/stores/CvStateStore";
import { Cv } from "@/types/cv/state/Cv";
import { useEffect, useState } from "react";
import { useColorMode } from "@/components/ui/color-mode";
import CvPaper from "./components/CvPaper";
import CvTools from "./components/CvTools";
// import { localService } from "./services/LocalCvService";
// import { isEqual } from "lodash";
// import { CvSettings } from "./types/CvModificationSettings";

export interface CvModificationProps extends React.PropsWithChildren {}

const CvModification = (props: CvModificationProps) => {
  // let currentCvSettings = localService.getCvSettings("anyUserId", "testCvId_1");
  const [scale, setScale] = useState<number>(0.4);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const colorMode = useColorMode().colorMode;

  const { isLoading, error, currentCv, fetchCvState } =
    useCvModificationStateStore();
  useEffect(() => {
    fetchCvState("anyUserId");
    // localService.getCvSettings("anyUserId", "testCvId_1").then((setting) => {
    //   if (setting) {
    //     setShowGrid(setting.showGrid);
    //     setScale(setting.currentZoom);
    //   }
    // });
  }, []);

  return (
    <div className="flex flex-row">
      <CvTools onShowGridClick={() => setShowGrid(!showGrid)} />
      <DndContext>
        <CvPageContextProvider
          scale={scale}
          setScale={(newVal) => {
            setScale(newVal);
            console.log("Scale changed to:", scale);
          }}
          currentCv={currentCv}
          showGrid={showGrid}
          setShowGrid={() => setShowGrid(!showGrid)}
        >
          <ErrorBoundary
            fallback={
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                width="100vw"
              >
                <Box color={"red"}>Something went wrong</Box>
              </Box>
            }
          >
            <div
              className="w-full flex justify-center overflow-scroll p-3 items-center  "
              style={{
                maxHeight: "calc(100vh - var(--navbar-height) - 2rem)",
                minHeight: "calc(100vh - var(--navbar-height) - 2rem)",
                border: `1px solid ${colorMode === "dark" ? "white" : "gray"}`,
              }}
            >
              {props.children}
              {isLoading && (
                <Skeleton
                  height={Cv.DEFAULT_A4_HEIGHT * scale}
                  width={(Cv.DEFAULT_A4_HEIGHT / Cv.DEFAULT_A4_RATIO) * scale}
                />
              )}
              {!isLoading && !error && <CvPaper></CvPaper>}
            </div>
          </ErrorBoundary>
        </CvPageContextProvider>
      </DndContext>
    </div>
  );
};

export default CvModification;
