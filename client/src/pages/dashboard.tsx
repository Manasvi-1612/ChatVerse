import { Box, Flex } from '@chakra-ui/react';
import { Sidebar } from '../components/shared/Sidebar';
import { Profile } from '../components/shared/Profile';

export default function Dashboard() {
  return (
    <Flex height={'100svh'}>
      <Sidebar/>
      <Profile/>
      <Box flex={'1'}>REMAIN</Box>
    </Flex>
  );
}
