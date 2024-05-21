import { Button, HStack } from '@chakra-ui/react';

export default function App() {


  return (
    <div className="App">
      <p>State: </p>

      <HStack>
        <Button >Connect</Button>
        <Button>Disconnect</Button>
      </HStack>
    </div>
  );
}
