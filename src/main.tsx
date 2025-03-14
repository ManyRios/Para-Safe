import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@getpara/react-sdk/styles.css";
import './index.css'
import App from './App.tsx'
//import { CapsulePara } from './context/capsulePara.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>

      <App />
  
  </StrictMode>,
)
