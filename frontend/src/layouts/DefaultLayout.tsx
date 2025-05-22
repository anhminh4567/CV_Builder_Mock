import { Outlet } from "react-router";
import Header from "./Header";
import SideBar from "./SideBar";
import { Box, Stack } from "@chakra-ui/react";
import CloseableButton from "@/components/ui/CloseableButton";
import { FaSearch } from "react-icons/fa";
import React from "react";

export interface DefaultLayoutProps extends React.PropsWithChildren {}

const DefaultLayout = (props: DefaultLayoutProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const sideBarContent = (isOpen: boolean) => (
    <Stack>
      <CloseableButton icon={<FaSearch />} label="Search" isOpen={isOpen} />
      <CloseableButton icon={<FaSearch />} label="Search" isOpen={isOpen} />
      <CloseableButton icon={<FaSearch />} label="Search" isOpen={isOpen} />
      <CloseableButton icon={<FaSearch />} label="Search" isOpen={isOpen} />
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
        className="flex flex-col overflow-auto"
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
