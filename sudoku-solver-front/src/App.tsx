import React, { useEffect, useState } from 'react';
import Grid from './components/Grid';
import './css/App.css';
import { SudokuGrid } from 'sudoku';
import SolveButton from './components/SolveButton';

function App() {
  const GRID_SIZE = 9; // Must be a perfect square. Currently tested only with size 9, standard grid
  const BACKEND_URL = "http://localhost:3030/api/sudoku-solver/";
  const emptyGrid = new SudokuGrid(GRID_SIZE);

  const [gridData, setGridData] = useState(emptyGrid);
  const [solutionData, setSolutionData] = useState<SudokuGrid | null>(null);
  const [message, setMessage] = useState("");
  const [isSolveUsable, setIsSolveUsable] = useState(false);

  const changeNumber = (event:React.ChangeEvent<HTMLInputElement>, rowIndex:number, colIndex:number) => {
    const value = parseInt(event.target.value);
    setGridData(gridData.setNewValue(rowIndex, colIndex, value));
    setMessage("");
  };

  useEffect(()=>{
    setIsSolveUsable(solutionData==null && (!gridData.isEmpty())  && gridData.gridIsValid());
  }, [gridData, solutionData]);

  const solveGrid = () => {

    fetch(BACKEND_URL,  
      {method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(gridData)})
    .then(response=>response.json())
    .then(respData=>displaySolution(respData));
  };

  const displaySolution = (respData:{solved: boolean, solution?:number[][], message?:string})=>{
    if (respData.solved){
      setSolutionData(new SudokuGrid(GRID_SIZE, respData.solution));
    }
      
    else
      if (respData.message)
        setMessage(respData.message);
  }

  const clearGrid = ()=>{
    setGridData(emptyGrid);
    setSolutionData(null);
    setMessage("");
  };
  

  return (
    <div className="App">
      <h1>Sudoku solver</h1>
      <p className="instructions">Insert the numbers here to make your Sudoku and press solve to get the solution.</p>
      <Grid size={GRID_SIZE} grid={gridData} solution={solutionData} changeNumber={changeNumber} />
      <div className="message">{message}</div>
      <div className="actions">
        <button onClick={clearGrid}>Clear</button>
        <SolveButton solve={solveGrid} isUsable={isSolveUsable} />
      </div>
    </div>
  );
}

export default App;
