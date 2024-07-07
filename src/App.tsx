import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FutbolistaList from './components/FutbolistaList';
import UpdateFutbolista from './components/UpdateFutbolista';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FutbolistaList />} />
        <Route path="/update/:id" element={<UpdateFutbolista />} />
      </Routes>
    </Router>
  );
};

export default App;