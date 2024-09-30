import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from "./components/NavBar"
import Form from "./components/Form"
import GraphDoble from './components/GraphDoble.jsx'
import { randomDataForDoubleChart } from './utils-graphs.js'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <Form/>
      <GraphDoble data={randomDataForDoubleChart()}/>
    </>
  )
}

export default App
