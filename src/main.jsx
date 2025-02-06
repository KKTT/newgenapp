import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import Annuity from './Annuity'
import IUL from './IUL'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="annuity" element={<Annuity />} />
          <Route path="iul" element={<IUL />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
