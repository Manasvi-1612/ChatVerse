import { Button, HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useVerifyMutation } from '../redux/slices/actions/authActions';

export default function App() {

  const [verify] = useVerifyMutation()

  const [user, setUser] = useState({})

  const res = async () => {
    try {
      const response =
        await verify({})
      //const { accessToken } = response.data
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    res()
  }, [])

  return (
    <div className="App">
      <p>State: {JSON.stringify(user)}</p>

      <HStack>
        <Button >Connect</Button>
        <Button>Disconnect</Button>
      </HStack>
    </div>
  );
}
