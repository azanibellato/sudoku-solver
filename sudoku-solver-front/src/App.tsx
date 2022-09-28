import React from 'react';
import Grid from './components/Grid';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Sudoku solver</h1>
      <Grid size={9} />
    </div>
  );
}

export default App;
