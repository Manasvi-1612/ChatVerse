import React, { useState, useEffect } from 'react';
import { Button, HStack, VStack } from '@chakra-ui/react';

export default function App() {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [fooEvents, setFooEvents] = useState([]);

  // function connect() {
  //   socket.connect();
  // }

  // function disconnect() {
  //   socket.disconnect();
  // }


  // useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   // function onFooEvent(value) {
  //   //   setFooEvents(previous => [...previous, value]);
  //   // }

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);
  //   // socket.on('foo', onFooEvent);

  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //     // socket.off('foo', onFooEvent);
  //   };
  // }, []);

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
