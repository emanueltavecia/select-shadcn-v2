import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import './index.css'
import { ExamplePage } from './ExamplePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ExamplePage />
  </StrictMode>,
)
