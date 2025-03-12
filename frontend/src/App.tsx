import { Routes, Route } from "react-router";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route index element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  )
}

export default App
