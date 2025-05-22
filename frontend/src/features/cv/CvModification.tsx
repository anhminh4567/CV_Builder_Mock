import { Box } from "@chakra-ui/react";
import { CvPageContextProvider } from "./components/useCVContext";
import { ErrorBoundary } from "react-error-boundary";
import { DndContext } from "@dnd-kit/core";

export interface CvModificationProps extends React.PropsWithChildren {}

const CvModification = (props: CvModificationProps) => {
  return (
    <div>
      <DndContext>
        <CvPageContextProvider>
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
            {props.children}
          </ErrorBoundary>
        </CvPageContextProvider>
      </DndContext>
    </div>
  );
};

export default CvModification;
