import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Index from './index';
import Recipes from './recipes';


function App() {
  return (

<React.StrictMode>
        <Router>
          <Routes>
            <Route path="/" element={<Index />}> </Route>
            <Route path="/search" element={<Index />}> </Route>
            <Route path="/recipes" element={<Recipes />}> </Route>

          </Routes>
        </Router>
</React.StrictMode>
  )
}

export default App
