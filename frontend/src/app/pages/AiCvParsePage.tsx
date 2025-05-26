import { Box, Button, FileUpload, Icon } from "@chakra-ui/react";
import { LuUpload } from "react-icons/lu";
import { useToken } from "@chakra-ui/react";
import React from "react";

const AiCvParsePage = () => {
  const [fourxlSize] = useToken("sizes", ["4xl"]);
  const [files, setFiles] = React.useState<File[]>([]);
  const handleFileUpload = () => {
    console.log("Files to upload:", files.length);
    files.forEach((file) => {
      console.log("Uploading file:", file.name);
    });
  };
  return (
    <div className="cv-ai-parse-page w-full h-full ">
      <Box className="flex flex-col items-center justify-center h-full p-4 gap-2">
        <FileUpload.Root
          alignItems="stretch"
          maxFiles={1}
          maxHeight="md"
          maxWidth={fourxlSize}
          accept={["application/pdf"]}
        >
          <FileUpload.HiddenInput
            onChange={(e) =>
              setFiles(
                e.currentTarget.files ? Array.from(e.currentTarget.files) : []
              )
            }
          />
          <FileUpload.Dropzone>
            <Icon size="md" color="fg.muted">
              <LuUpload />
            </Icon>
            <FileUpload.DropzoneContent>
              <Box>Drag and drop pdf file here</Box>
              <Box color="fg.muted">.pdf only</Box>
            </FileUpload.DropzoneContent>
          </FileUpload.Dropzone>
          <FileUpload.List clearable showSize />
        </FileUpload.Root>
        <Button
          bg={"teal"}
          _hover={{
            bg: "teal.700",
          }}
          className="p-2"
          onClick={() => handleFileUpload()}
        >
          {" "}
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default AiCvParsePage;
