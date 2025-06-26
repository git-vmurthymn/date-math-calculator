import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import DateMathCalculator from './App.jsx'  // <- your DateMathCalculator is in App.jsx

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DateMathCalculator />
  </React.StrictMode>
)
