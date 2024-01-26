import * as React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Signup from './components/Signup';
import Wave from './components/Wave';
import Empty from './components/Empty';
import Create from './components/Create';
import NotFound from './components/NotFount';
import MovieList from './components/MovieList';


function App() {
 

  return (
    <>
  <Router>

      <Routes>
         <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<Signup />} />
        <Route path="/empty" element={<Empty />} />
        <Route path="/create" element={<Create />} />
        <Route path="/movie" element={<MovieList />} />
      </Routes>
      <Wave/>
    </Router>
     
    </>
  )
}

export default App
