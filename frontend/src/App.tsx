import { Routes, Route } from "react-router";
import LogIn from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import './App.css'
import './auth/axios-config'
import AdminDashboard from "./pages/AdminDashboard";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  )
}

export default App
