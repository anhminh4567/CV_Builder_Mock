import { IconButton, Text } from "@chakra-ui/react";
import React from "react";

export interface CloseableButtonProps {
  onClick?: () => void;
  label: string;
  icon: React.ReactNode;
  isOpen: boolean;
}
const CloseableButton = (props: CloseableButtonProps) => {
  return (
    <IconButton
      onClick={props.onClick}
      bg={"transparent"}
      _hover={{
        bg: "teal",
      }}
      className=""
    >
      {props.icon}
      <Text
        // className={` ${props.isOpen ? "inline" : "hidden"}`}
        style={{
          opacity: props.isOpen ? 1 : 0,
          maxWidth: props.isOpen ? "100%" : 0,
          overflow: "hidden",
          whiteSpace: "nowrap",
          transition: "opacity 0.1s max-width 0.3s ",
        }}
      >
        {props.label}
      </Text>
    </IconButton>
  );
};

export default CloseableButton;
