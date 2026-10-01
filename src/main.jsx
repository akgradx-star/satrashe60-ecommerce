import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// 🚀 1. Yahan humne apni tanki ko import kiya
import { ShopProvider } from './ShopContext.jsx' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 🚀 2. App ko ShopProvider ke andar daal diya taaki sabko data mile */}
    <ShopProvider>
      <App />
    </ShopProvider>
  </StrictMode>,
)