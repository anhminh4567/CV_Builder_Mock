"use client";

import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
// import { useLocalSettingStore } from "@/stores/UserSettingStore";
import { ColorModeButton, ColorModeProvider } from "@/components/ui/color-mode";
const config = defineConfig({
  theme: {},
});
const system = createSystem(defaultConfig, config);
export function Provider(props: React.PropsWithChildren) {
  // const themeChoice = useLocalSettingStore((state) => state.userSetting.theme);
  // const {colorMode,setColorMode} = useColorMode();
  // if themeChoice
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>
        {/* <ColorModeButton style={{ position: "fixed", right: "0" }} /> */}
        {props.children}
      </ColorModeProvider>
    </ChakraProvider>
  );
}
