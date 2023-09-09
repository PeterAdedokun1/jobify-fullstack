import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import axios from "axios"
import customFetch from './utils/CustomFetch.tsx'


const data = await customFetch.get("/test");
console.log(data.data)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
