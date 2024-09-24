import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from "./components/NavBar"
import Form from "./components/Form"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <Form/>
    </>
  )
}

export default App
