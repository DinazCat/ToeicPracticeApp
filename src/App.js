import React from 'react'
import "./App.css"
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Questions from './pages/Questions';
import Vocab from './pages/Vocab';
import Test from './pages/Test';
import Forum from './pages/Forum';
import ReadPdf from './pages/ReadPdf';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestionPage from './pages/QuestionPage';

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
          <Route path="/Forum" exact element={<Forum/>} />
          <Route path="/ReadPdf" exact element={<ReadPdf/>} />
          <Route path="/QuestionPage" exact element={<QuestionPage/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
