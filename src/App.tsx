import React from 'react';
import logo from './logo.svg';
import './App.css';
import FutbolistaList from './components/FutbolistaList';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Lista de Futbolistas</h1>
      <FutbolistaList />
    </div>
  );
};

export default App;