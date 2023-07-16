import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { writeToDB } from './firebase.js'

writeToDB(3, "ashley", 340)
writeToDB(33, "ashleyyy", 3540)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
