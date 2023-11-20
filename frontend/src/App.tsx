import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false)

  const onopen = () => {
    console.log('Conectado')
    setIsConnected(true)
  }

  const onclose = () => {
    console.log('Desconectado')
    setIsConnected(false)
  }

  const onmessage = ({ data }) => {
    console.log(data)
  }

  useEffect(() => {
    console.log('count changed')
    // Socket AWS API Gateway
    if (socket) socket.close()
    const newSocket = new WebSocket('ws://localhost:3000')
    newSocket.onopen = onopen
    newSocket.onclose = onclose
    newSocket.onmessage = onmessage
    setSocket(newSocket)
    return () => {
      socket?.close()
    }
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h2>Websocket</h2>
      {isConnected ? <p>Conectado</p> : <p>Desconectado</p>}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
