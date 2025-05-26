import { Outlet, useNavigate } from "react-router";
import Header from "./Header";
import SideBar from "./SideBar";
import { Box, Stack } from "@chakra-ui/react";
import CloseableButton from "@/components/ui/CloseableButton";
import { FaSearch } from "react-icons/fa";
import React from "react";
import { BiAddToQueue } from "react-icons/bi";
import { FaRobot } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { BsPersonWorkspace } from "react-icons/bs";

export interface DefaultLayoutProps extends React.PropsWithChildren {}

const DefaultLayout = ({}: DefaultLayoutProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const sideBarContent = (isOpen: boolean) => (
    <Stack>
      <CloseableButton
        icon={<BiAddToQueue />}
        label="CV Customization"
        isOpen={isOpen}
        variant="start"
        onClick={() => {
          navigate("/", {});
        }}
      />
      <CloseableButton
        icon={<FaRobot />}
        label="AI CV-parse"
        isOpen={isOpen}
        variant="start"
        onClick={() => {
          navigate("/ai-cv-parse", {});
        }}
      />
      <CloseableButton
        icon={<IoIosLogOut />}
        label="Logout"
        isOpen={isOpen}
        variant="start"
      />
      <CloseableButton
        icon={<FaSearch />}
        label="Search"
        isOpen={isOpen}
        variant="start"
      />
      <CloseableButton
        icon={<BsPersonWorkspace />}
        label="Workspace"
        isOpen={isOpen}
        variant="start"
      />
    </Stack>
  );
  return (
    <Box display="flex" width="100vw" height="100vh">
      <SideBar
        isOpen={isOpen}
        setIsOpen={() => setIsOpen(!isOpen)}
        sideBarContent={sideBarContent(isOpen)}
      />
      <Box
        flex="1"
        bg="gray.50"
        _dark={{ bg: "gray.900" }}
        className="flex flex-col "
      >
        <Header sideBarContent={sideBarContent(true)} />
        <Box p={3}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DefaultLayout;
