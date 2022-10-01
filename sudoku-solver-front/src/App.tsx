import React, { useState } from 'react';
import Grid from './components/Grid';
import './css/App.css';

function App() {
  const GRID_SIZE = 9;
  const BACKEND_URL = "http://localhost:3030/api/sudoku-solver/";
  const emptyGrid = new Array(GRID_SIZE).fill(new Array(GRID_SIZE).fill(null));

  const [gridData, setGridData] = useState(emptyGrid);

  const changeNumber = (event:React.ChangeEvent<HTMLInputElement>, rowIndex:number, colIndex:number) => {
    const newData = JSON.parse(JSON.stringify(gridData)); // Deep copy
    newData[rowIndex][colIndex]=event.target.value; 
    setGridData(newData);
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
    setGridData(solution);
  }

  const clearGrid = ()=>{setGridData(emptyGrid)}
  

  return (
    <div className="App">
      <h1>Sudoku solver</h1>
      <p className="instructions">Insert the numbers here to make your Sudoku and press solve to get the solution.</p>
      <Grid size={GRID_SIZE} data={gridData} changeNumber={changeNumber} />
      <div className="actions">
        <button onClick={clearGrid}>Clear</button>
        <button onClick={solveGrid}>Solve</button>
      </div>
    </div>
  );
}

export default App;
