import { useState } from 'react'
import { Typehead } from './Typehead'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Typehead/>
    </>
  )
}

export default App
