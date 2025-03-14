import { Routes, Route } from "react-router";
import LogIn from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import './App.css'
import './auth/axios-config'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route index element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
