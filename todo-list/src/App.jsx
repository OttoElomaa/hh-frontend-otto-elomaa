import { useState } from 'react'

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoList from './TodoList'

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { AppBar, Tab, Tabs, Toolbar, Typography } from '@mui/material';

import { TabContext, TabPanel } from '@mui/lab';


function App() {
  
  const [value, setValue] = useState('1')

  // CONST FUNC implemented with help by CHATGPT
  const handleChange = (event, newValue) => {
    //setDesc(event.target.value);
    setValue(newValue)
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="xl">

        <CssBaseline />
 

        {/*TABCONTEXT, TABS and TABPANEL implemented with help by MUI docs and CHATGPT */} 
       <TabContext value={value}>
          <Tabs 
            value={value} onChange={handleChange}
            centered>

              <Tab label="SKIBIDI" value="0"></Tab>
              <Tab label="SKIBIDI 2" value="1"></Tab>
          </Tabs>


          <TabPanel value="0">
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6">Home Page</Typography>
              </Toolbar>
            </AppBar>

            <p>Welcome to the app!</p>
            </TabPanel>

          <TabPanel value="1">
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6">ToDo List Page</Typography>
                </Toolbar>
              </AppBar>

            <TodoList />
          </TabPanel>

            

          </TabContext>

      </Container>
    </LocalizationProvider>
  )
}

export default App
