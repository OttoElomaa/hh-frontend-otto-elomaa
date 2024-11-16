import { useState } from 'react'
import './App.css'

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Stack, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';

import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';


function App() {
  

  const [value, setValue] = useState('0')

  
  const handleChange = (event, newValue) => {
    setValue(newValue)
  };


  return (

    <Container maxWidth="xl">

      <CssBaseline />

      <Stack
        mt={2}
        direction="column"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <AppBar position="fixed"> 
          <Toolbar>
            <Typography variant="h6">Personal Training App</Typography>
          </Toolbar>
        </AppBar>

       

        {/*TABCONTEXT, TABS and TABPANEL implemented with help by MUI docs and CHATGPT */}
        <TabContext value={value}>
          <Tabs
            value={value} onChange={handleChange}
            centered
          
            >

            <Tab label="HOME PAGE" value="0" />
            <Tab label="CUSTOMERS" value="1" />
            <Tab label="SESSIONS" value="2" />
          </Tabs>


          <TabPanel value="0">

            <h2>Welcome to the personal trainer app!</h2>
            <p>We're here to help you improve. </p>
          </TabPanel>

          <TabPanel value="1">
            <CustomerList/>
          </TabPanel>

          <TabPanel value="2">
            <TrainingList/>
          </TabPanel>

        </TabContext>
      </Stack>

    </Container>
  )
}

export default App
