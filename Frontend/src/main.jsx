import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <RegisterPage />
  </StrictMode>,
)
