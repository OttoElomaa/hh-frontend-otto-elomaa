import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CarList from './components/CarList'
import { AppBar, Typography } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <AppBar position="static">
        <Typography variant="h6">
          Car Shop
        </Typography>
      </AppBar>

      <h1>Car App</h1>

      <CarList/>

    </>
  )
}

export default App
