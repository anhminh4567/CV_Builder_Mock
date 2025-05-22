import { Box, Button } from "@chakra-ui/react";

import { FaArrowRight } from "react-icons/fa";

export interface SideBarProps {
  sideBarContent?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: () => void;
  className?: string;
}
const transition = "width 0.3s cubic-bezier(0.4,0,0.2,1)";

const SideBar = ({ isOpen, setIsOpen, sideBarContent }: SideBarProps) => {
  //   const [isOpen, setIsOpen] = useState(false);
  return (
    <Box
      as="aside"
      w={isOpen ? "var(--sidebar-width)" : "var(--sidebar-collapsed-width)"}
      h="100vh"
      position="relative"
      zIndex={1}
      flexDirection="column"
      style={{
        transition: transition,
      }}
      className="hidden md:flex"
    >
      <Box flex="1" p={4} overflowY="auto">
        {sideBarContent && sideBarContent}
      </Box>
      <Box p={4} className="w-full">
        <Button
          bgColor="teal"
          variant="solid"
          fontWeight={"bold"}
          className="text-center w-full"
          onClick={() => setIsOpen()}
        >
          <FaArrowRight
            style={{
              transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
              transform: isOpen ? "rotate(1260deg)" : "rotate(0deg)",
            }}
          />
        </Button>
      </Box>
    </Box>
  );
};

export default SideBar;
