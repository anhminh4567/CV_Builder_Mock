import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode";
import { Avatar, Box, Container } from "@chakra-ui/react";
import React from "react";

import { IoMenu } from "react-icons/io5";
export interface HeaderProps {
  sideBarContent?: React.ReactNode;
  //   isOpen: boolean;
  //   setIsOpen: () => void;
}

const Header = ({ sideBarContent }: HeaderProps) => {
  const bg = useColorModeValue("white", "black"); // darker in both modes
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const teal = useColorModeValue("teal", "teal");
  return (
    <>
      <Box className="sticky top-0">
        <Container
          h={"var(--navbar-height)"}
          bg={bg}
          p={0}
          m={0}
          w="100%"
          maxW="none"
          className="relative flex flex-row justify-between"
        >
          <IoMenu
            size={"40px"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            color={isMenuOpen ? teal : ""}
            style={{
              transition: "color 0.3s",
            }}
            className=" relative top-[50%] left-0 translate-y-[-50%] cursor-pointer block md:invisible"
          />
          <Container className="w-fit m-0 p-0 flex items-center">
            <ColorModeButton />
            <Avatar.Root className="right-0 top-0 m-2">
              <Avatar.Fallback name="Segun Adebayo" />
              <Avatar.Image src="https://bit.ly/sage-adebayo" />
            </Avatar.Root>
          </Container>
        </Container>
        <Container
          className={`dropdown-content w-full overflow-y-auto h-fit block md:hidden ${
            isMenuOpen ? "h-[50vh]" : "h-0"
          }`}
          bg={bg}
          style={{
            transition: "height 0.3s ease-in-out",
          }}
        >
          {sideBarContent}
        </Container>
      </Box>
    </>
  );
};

export default Header;
