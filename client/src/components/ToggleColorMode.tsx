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

  const handleClick = () => {
    toggleColorMode();
  };

  return (
    <IconButton
      pos="absolute"
      _hover={{ backgroundColor: 'transparent', filter: 'drop-shadow(0 0 0.5rem #000)' }}
      top="0"
      right="0"
      mx={6}
      size="md"
      fontSize="lg"
      color="current"
      marginLeft="2"
      backgroundColor={'transparent'}
      onClick={handleClick}
      icon={<SwitchIcon color={text == 'light' ? "orange.400" : "blue.700"} />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  );
};