import {
  Avatar,
  Box,
  Flex,
  Image,
  Tooltip,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { navMenu } from "../../constants";

export const Sidebar = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex flexFlow={"column"} p={2}>
      <Image
        alt="cat"
        sx={{ width: { base: 70 } }}
        src={"/assets/cute-cat.png"}
        mb={10}
      />
      <VStack justifyContent="center" gap={6}>
        {navMenu.map((menu, index) => (
          <Tooltip key={index} label={menu.label} placement={'right-end'} rounded={'md'}>
            <Box
              p={2}
              _hover={{
                bg: colorMode === "light" ? "blackAlpha.300" : "gray.700",
                transition: "300ms",
              }}
              transition={"background"}
              rounded={"full"}
            >
              {menu.icon}
            </Box>
          </Tooltip>
        ))}
      </VStack>

      <Flex justifyContent={"center"} mt={"auto"}>
        <Avatar />
      </Flex>
    </Flex>
  );
};
