import { useState } from 'react'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Account from "./pages/Account";
import QuizGeneration from "./pages/QuizGeneration";
import QuizQuestions from "./pages/QuizQuestions";
import Results from "./pages/Results";
import Layout from "./components/Layout";

//because I made a Layout component, we don't need to add Header and Footer component (me thinks?) -JL
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/quiz" element={<QuizGeneration />} />
          <Route path="/quiz/run" element={<QuizQuestions />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
