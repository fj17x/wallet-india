import "./App.css"
import Home from "./pages/Home"
import Send from "./pages/Send"
import React from "react"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/send" element={<Send />} />
      </Routes>
    </div>
  )
  //}
}

export default App
