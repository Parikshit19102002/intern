import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './main.js'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <div className=''>
  
    <App />
   
    

  </div>
  </BrowserRouter>,
)
