import { IconButton, Text } from "@chakra-ui/react";
import React from "react";
import clsx from "clsx";

type CloseableButtonVariant = "start" | "default";
export interface CloseableButtonProps {
  onClick?: () => void;
  label: string;
  icon: React.ReactNode;
  isOpen: boolean;
  variant?: CloseableButtonVariant;
}
const CloseableButton = ({
  icon,
  isOpen,
  label,
  onClick,
  variant = "default",
}: CloseableButtonProps) => {
  const defaultVariant = "";
  const startVariant = "flex flex-row justify-start";
  const paddingVariant = variant === "start" ? "0.5rem" : "0";
  const combinedVariant = clsx({
    [defaultVariant]: variant === "default",
    [startVariant]: variant === "start",
  });
  return (
    <IconButton
      onClick={onClick}
      bg={"transparent"}
      style={{
        paddingInlineStart: paddingVariant,
      }}
      _hover={{
        bg: "teal",
      }}
      className={`${isOpen ? combinedVariant : defaultVariant} `}
    >
      {icon}
      <Text
        style={{
          opacity: isOpen ? 1 : 0,
          maxWidth: isOpen ? "100%" : 0,
          overflow: "hidden",
          whiteSpace: "nowrap",
          transition: "opacity 0.1s max-width 0.3s ",
        }}
      >
        {label}
      </Text>
    </IconButton>
  );
};

export default CloseableButton;
