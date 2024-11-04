import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CarList from './components/CarList.jsx'
import AddCarForm from './components/AddCarForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CarList/>
    <AddCarForm/>
  </StrictMode>,
)
