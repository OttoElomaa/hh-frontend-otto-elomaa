import { useState } from 'react'

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './TodoList'

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AppBar, Toolbar, Typography } from '@mui/material';

function App() {
  const [count, setCount] = useState(0)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="xl">

        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">To-do List</Typography>
          <CssBaseline />
          </Toolbar>
        </AppBar>

        
        <TodoList />
      </Container>
    </LocalizationProvider>
  )
}

export default App
