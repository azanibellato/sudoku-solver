import React, { useState } from 'react';
import Grid from './components/Grid';
import './css/App.css';
import { SudokuGrid } from 'sudoku';

function App() {
  const GRID_SIZE = 9; // Must be a perfect square. Currently tested only with size 9, standard grid
  const BACKEND_URL = "http://localhost:3030/api/sudoku-solver/";
  const emptyGrid = new SudokuGrid(GRID_SIZE);

  const [gridData, setGridData] = useState(emptyGrid);

  const changeNumber = (event:React.ChangeEvent<HTMLInputElement>, rowIndex:number, colIndex:number) => {
    const value = parseInt(event.target.value);
    setGridData(gridData.setNewValue(rowIndex, colIndex, value));
  };

  const solveGrid = () => {
    fetch(BACKEND_URL,  
      {method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(gridData)})
    .then(response=>response.json())
    .then(solution=>displaySolution(solution));
  };

  const displaySolution = (solution:number[][])=>{
    setGridData(new SudokuGrid(GRID_SIZE, solution));
  }

  const clearGrid = ()=>{setGridData(emptyGrid)}
  

  return (
    <div className="App">
      <h1>Sudoku solver</h1>
      <p className="instructions">Insert the numbers here to make your Sudoku and press solve to get the solution.</p>
      <Grid size={GRID_SIZE} grid={gridData} changeNumber={changeNumber} />
      <div className="actions">
        <button onClick={clearGrid}>Clear</button>
        <button onClick={solveGrid}>Solve</button>
      </div>
    </div>
  );
}

export default App;
