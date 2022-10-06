import { CellIndex } from ".";
import { SudokuGrid, cellsToCheck } from "./SudokuGrid";

const STANDARD_GRID_SIZE = 9;

function sortCells(index1: CellIndex, index2: CellIndex){
    return (index1.row*STANDARD_GRID_SIZE+index1.col-index2.row*STANDARD_GRID_SIZE-index2.col);
}

describe('Sudoku grid knows which cells to check', ()=>{
    test('check first position', ()=>{
        const expectedCells = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[1,1],[1,2],[2,1],[2,2]].map(data=>({row:data[0], col:data[1]}));
        expectedCells.sort(sortCells);
        const actualCells = cellsToCheck({row: 0,col: 0}, STANDARD_GRID_SIZE);
        actualCells.sort(sortCells);
        expect(actualCells).toEqual(expectedCells);
    });

    test('check middle position', ()=>{
        const expectedCells = [[4,0],[4,1],[4,2],[4,3],[4,5],[4,6],[4,7],[4,8],[0,4],[1,4],[2,4],[3,4],[5,4],[6,4],[7,4],[8,4],[3,3],[3,5],[5,3],[5,5]].map(data=>({row:data[0], col:data[1]}));
        expectedCells.sort(sortCells);
        const actualCells = cellsToCheck({row: 4,col: 4}, STANDARD_GRID_SIZE);
        actualCells.sort(sortCells);
        expect(actualCells).toEqual(expectedCells);
    });

    test('check right middle position', ()=>{
        const expectedCells = [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[0,8],[1,8],[2,8],[3,8],[5,8],[6,8],[7,8],[8,8],[3,6],[5,6],[3,7],[5,7]].map(data=>({row:data[0], col:data[1]}));
        expectedCells.sort(sortCells);
        const actualCells = cellsToCheck({row: 4,col: 8}, STANDARD_GRID_SIZE);
        actualCells.sort(sortCells);
        expect(actualCells).toEqual(expectedCells);
    });

});

function buildEmptyData(){
    const data = new Array(STANDARD_GRID_SIZE);
    for (let i = 0; i < STANDARD_GRID_SIZE; i++)
        data[i] = new Array(STANDARD_GRID_SIZE).fill(null); 
    return data;
}

describe('Sudoku cell validation works', ()=>{
    test('empty sudoku should be valid in all cells', ()=>{
        const sudokuGrid = new SudokuGrid(STANDARD_GRID_SIZE);
        for (let i=0; i<STANDARD_GRID_SIZE; i++)
            for (let j=0; j<STANDARD_GRID_SIZE; j++)
                expect(sudokuGrid.numberIsValid({row: i, col: j})).toBe(true);
    });

    test('sudoku with one value should be valid in all cells', ()=>{
        const data = buildEmptyData();
        data[6][4]=1;
        const sudokuGrid = new SudokuGrid(STANDARD_GRID_SIZE, data);
        for (let i=0; i<STANDARD_GRID_SIZE; i++)
            for (let j=0; j<STANDARD_GRID_SIZE; j++){
                expect(sudokuGrid.numberIsValid({row: i, col: j})).toBe(true);
            }
          
    });

    test('duplicate values in a row should be invalid', ()=>{
        const data = buildEmptyData();
        data[1][1]=4;
        data[1][5]=4;
        const sudokuGrid = new SudokuGrid(STANDARD_GRID_SIZE, data);
        expect(sudokuGrid.numberIsValid({row: 1,col: 1})).toBe(false);
        expect(sudokuGrid.numberIsValid({row: 1,col: 5})).toBe(false);
        for (let i=0; i<STANDARD_GRID_SIZE; i++)
            for (let j=0; j<STANDARD_GRID_SIZE; j++){
                if (!((i==1 && j==5)||(i==1 && j==1)))
                    expect(sudokuGrid.numberIsValid({row: i, col: j})).toBe(true);
            }
    });

    test('duplicate values in a column should be invalid', ()=>{
        const data = buildEmptyData();
        data[2][4]=3;
        data[8][4]=3;
        const sudokuGrid = new SudokuGrid(STANDARD_GRID_SIZE, data);
        expect(sudokuGrid.numberIsValid({row: 2, col: 4})).toBe(false);
        expect(sudokuGrid.numberIsValid({row: 8, col: 4})).toBe(false);
        for (let i=0; i<STANDARD_GRID_SIZE; i++)
            for (let j=0; j<STANDARD_GRID_SIZE; j++){
                if (!((i==2 && j==4)||(i==8 && j==4)))
                    expect(sudokuGrid.numberIsValid({row: i, col: j})).toBe(true);
            }
    });

    test('duplicate values in a square should be invalid', ()=>{
        const data = buildEmptyData();
        data[8][8]=6;
        data[7][7]=6;
        const sudokuGrid = new SudokuGrid(STANDARD_GRID_SIZE, data);
        expect(sudokuGrid.numberIsValid({row: 8, col: 8})).toBe(false);
        expect(sudokuGrid.numberIsValid({row: 7, col: 7})).toBe(false);
        for (let i=0; i<STANDARD_GRID_SIZE; i++)
            for (let j=0; j<STANDARD_GRID_SIZE; j++){
                if (!((i==7 && j==7)||(i==8 && j==8)))
                    expect(sudokuGrid.numberIsValid({row: i, col: j})).toBe(true);                    
            }
    });
   

});
