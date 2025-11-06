import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/reset.css'
import { ConfigProvider } from 'antd'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ConfigProvider 
    theme={{
      
      token: {
        colorPrimary: '#d82323ff',
        borderRadius: '10px',
        
        
      },
    }}
    >
      <App />
    </ConfigProvider> 
    </BrowserRouter>
  </StrictMode>,
)
