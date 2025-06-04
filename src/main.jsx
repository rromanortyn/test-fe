import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import AppContainer from './containers/app-container/app.container'
import './style.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContainer />
  </StrictMode>,
)
