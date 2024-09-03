import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ManageMeeting from './pages/ManageMeeting';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage/:id?" element={<ManageMeeting />} />
      </Routes>
    </Router>
  );
};

export default App;
