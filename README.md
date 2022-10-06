# Sudoku solver

This is a sample project of a Sudoku solver for a Code Challenge interview.
It is a full stack project, with backend made with Node+Express+TypeScript and frontend made with React+TypeScript.
The main Sudoku logic is in a TypeScript shared package (packages/sudoku).

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
