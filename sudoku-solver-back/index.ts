import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {SudokuGrid} from 'sudoku';

const cors = require('cors');

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());


app.post('/api/sudoku-solver', (req: Request, res: Response) => {
  const gridData = req.body;
  if (!gridData){
    res.status(400).send({solved: false, message: "Missing data"});
    return;
  }
    
  const grid = new SudokuGrid(gridData.size, gridData.data);
  console.log(grid);
  const solution = grid.solve();
  if (solution)
    res.send({solved: true, solution: solution.data});
  else
    res.send({solved: false, message: "No solution"});
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});