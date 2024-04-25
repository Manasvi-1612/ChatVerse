import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ToggleColorMode = (props: ColorModeSwitcherProps) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);

  return (
    <IconButton
      pos="absolute"
      top="0"
      right="0"
      m={"1rem"}
      size="md"
      fontSize="lg"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon color={text == 'light' ? "orange.400" : "blue.700"} />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />

  );
};