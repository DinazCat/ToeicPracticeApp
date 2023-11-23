import React from 'react'
import "./App.css"
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Questions from './pages/Questions';
import Vocab from './pages/Vocab';
import Test from './pages/Test';
import ListenPart1 from './pages/ListenPart1';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/Question" exact element={<Questions/>} />
          <Route path="/Vocab" exact element={<Vocab/>} />
          <Route path="/Test" exact element={<Test/>} />
          <Route path="/QuestionL1/add" exact element={<ListenPart1/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
