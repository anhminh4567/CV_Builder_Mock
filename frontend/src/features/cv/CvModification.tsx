import { Box, Skeleton, Stack } from "@chakra-ui/react";
import { CvPageContextProvider } from "./context/useCVContext";
import { ErrorBoundary } from "react-error-boundary";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useCvModificationStateStore } from "@/stores/CvStateStore";
import { Cv } from "@/types/cv/state/Cv";
import { useEffect, useRef, useState } from "react";
import { useColorMode } from "@/components/ui/color-mode";
import CvPaper from "./components/CvPaper";
import CvTools from "./components/CvTools";
// import { localService } from "./services/LocalCvService";
// import { isEqual } from "lodash";
// import { CvSettings } from "./types/CvModificationSettings";
import "./CvModification.css";
import { toaster } from "@/components/ui/toaster";
import { localService } from "./services/LocalCvService";
import { cvService } from "@/services/CvModifyingService";
export interface CvModificationProps extends React.PropsWithChildren {}

const CvModification = (props: CvModificationProps) => {
  // let currentCvSettings = localService.getCvSettings("anyUserId", "testCvId_1");
  const [scale, setScale] = useState<number>(0.4);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const paperRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const colorMode = useColorMode().colorMode;
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    const layoutId = over.id as string;
    const componentId = active.id as string;
    console.debug("Drag Ended", layoutId, componentId);
  }
  const { isLoading, error, currentCv, fetchCvState } =
    useCvModificationStateStore();
  useEffect(() => {
    fetchCvState("anyUserId");
  }, []);

  return (
    <div className="flex flex-row">
      <DndContext onDragEnd={handleDragEnd}>
        <CvPageContextProvider
          scale={scale}
          setScale={(newVal) => {
            setScale(newVal);
            console.log("Scale changed to:", scale);
          }}
          currentCv={currentCv}
          showGrid={showGrid}
          setShowGrid={() => setShowGrid(!showGrid)}
          onSaveCv={(currentCv) => {
            console.log("Saving CV:", currentCv);
            const promiseSave = cvService.saveCvState("anyUserId", currentCv);
            toaster.promise(promiseSave, {
              loading: {
                title: "Saving CV",
                description: `Saving CV ${currentCv.name}...`,
              },
              success: {
                title: "CV Saved",
                description: `CV ${currentCv.name} saved successfully!`,
              },
              error: {
                title: "Save Failed",
                description: `Failed to save CV ${currentCv.name}.`,
              },
            });
          }}
          onExportPdf={(currentCv) => {
            console.log("Exporting CV to PDF:", currentCv);
            localService
              .exportToPdf(paperRef.current, currentCv)
              .then(() => {
                console.log("CV exported successfully");
                toaster.success({
                  title: "Exported",
                  description: `CV ${currentCv.name} exported successfully!`,
                });
              })
              .catch((error) => {
                console.error("Error exporting CV:", error);
                toaster.error({
                  title: "Export Failed",
                  description: `Failed to export CV ${currentCv.name}.`,
                });
              });
          }}
        >
          <CvTools onShowGridClick={() => setShowGrid(!showGrid)} />

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
              className="relative w-full flex justify-center overflow-auto p-3  "
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
              {!isLoading && !error && <CvPaper paperRef={paperRef}></CvPaper>}
            </div>
          </ErrorBoundary>
        </CvPageContextProvider>
      </DndContext>
    </div>
  );
};

export default CvModification;
