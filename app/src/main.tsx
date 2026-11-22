import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { aplicarTema } from './lib/tema'
import { obtenerToken, irAlLogin } from './lib/sesion'
import './index.css'

aplicarTema()
if (!obtenerToken()) {
  irAlLogin()
} else {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode><App /></React.StrictMode>,
  )
}
