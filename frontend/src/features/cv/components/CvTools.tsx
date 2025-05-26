import { Tooltip } from "@/components/ui/tooltip";
import { Stack, StackSeparator } from "@chakra-ui/react";
import { BiAdjust } from "react-icons/bi";

export interface CvToolsProps {
  onShowGridClick?: () => void;
}
const CvTools = ({ onShowGridClick }: CvToolsProps) => {
  return (
    <div className="h-full">
      <Stack separator={<StackSeparator />} className="h-full p-2">
        <Tooltip content="show | hide grid" showArrow>
          <BiAdjust
            className="text-2xl cursor-pointer"
            onClick={() => onShowGridClick?.()}
          />
        </Tooltip>
      </Stack>
    </div>
  );
};

export default CvTools;
