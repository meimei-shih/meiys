import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComingSoon from './screen/ComingSoon';
import './App.css';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<ComingSoon />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
