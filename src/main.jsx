import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PageFlipContainer from './PageFlipContainer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageFlipContainer />
  </StrictMode>,
)
