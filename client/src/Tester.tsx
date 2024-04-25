"use client"

import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null)
  const [message, setMessage] = useState("")
  const [input, setInput] = useState("")

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000')

    socket.onopen = () => {
      console.log('Connected to the server')
      setSocket(socket)
    }

    //control reach here when server sends you a message
    socket.onmessage = (message) => {
      console.log('Message from server:', message.data)
      setMessage(message.data)
    }

    return () => {
      socket.close()
    }

  }, [])

  if (!socket) {
    return <div>Connecting to socket server....</div>
  }

  return (
    <>
      <form>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={(e) => {
          e.preventDefault()
          socket.send(input)
        }}>Send</button>
      </form>
      {message}
    </>
  )
}

export default App

