# Sudoku solver

This is a sample project of a Sudoku solver for a Code Challenge interview.
It is a full stack project, with backend made with Node+Express+TypeScript and frontend made with React+TypeScript.
The main Sudoku logic is in a TypeScript shared package (packages/sudoku).
The algorithm for solving the Sudoku is adapted from the one by Peter Norvig at [http://norvig.com/sudoku.html](http://norvig.com/sudoku.html), translating from Python to JavaScript and putting a little of OOP in the mix.
The algorithm improves on the simple brute force approach by using the standard Sudoku technique of eliminating options recursively. There is still a depth-first search to complete the algorithm, but the recursion avoids the need of backtracking and the elimination technique speeds it up considerably in comparison to a simple brute force approach.

## Prerequisites

- NodeJS v.16 or higher
- [pnpm](https://pnpm.io/) ```npm install -g pnpm```

## Installation

1. Clone this project with ```git clone https://github.com/azanibellato/sudoku-solver.git```.
2. From the project root directory, install dependencies with ```pnpm install```.
2. Build the pagackes with ``` pnpm build ```.

## Run

From the project root directory run ```pnpm start```.

Frontend should run on `http://localhost:3000`, the backend is available `http://localhost:3030`.

## Testing
Most of the testing is for the Sudoku logic in `packages/sudoku`.
To run the tests, go to the `packages/sudoku` directory and type ```pnpm test```.
Notice: there seems to be a bug with pnpm that requires to run ```npm install`` from the `packages/sudoku` directory before the first time running the tests to actually have `ts-jest` available.
