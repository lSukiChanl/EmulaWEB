import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EmulatorJS from './EmulatorJS.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EmulatorJS />
  </StrictMode>,
)


