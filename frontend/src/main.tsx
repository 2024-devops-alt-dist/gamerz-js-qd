import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import NavBar from './components/NavBar.tsx';
import { BrowserRouter } from "react-router";
import Footer from './components/Footer.tsx';
import { AuthProvider } from './context/AuthContext';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <App />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
