import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import AppContainer from './containers/app/app.container.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContainer />
  </StrictMode>,
)
