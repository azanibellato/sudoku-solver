import { CellValue, CellIndex } from ".";
import { SudokuOptions, searchSolution } from "./solver";

export class SudokuGrid{
    data: CellValue[][];
    size: number;

    constructor(size:number, data?:CellValue[][]){
        if (size<=1 && !Number.isInteger(Math.sqrt(size)))
            throw new Error("Size must be a perfect square greater than 1");
        this.size = size;
        if (data)
            this.data = data;
        else {
            this.data = new Array(this.size);
            for (let i = 0; i < this.size; i++)
                this.data[i] = new Array(this.size).fill(null); 
        }
    }    

    getValue(cellIndex: CellIndex):CellValue{
        return this.data[cellIndex.row][cellIndex.col];
    }
    
    /**
     * Checks if a number in the sudoku grid is valid (no duplicates in row, column or sub-grid)
     * @param cellIndex The cell index of the number to check
     * @returns true if the number is valid, false if it is not valid
     */
    numberIsValid(cellIndex:CellIndex):boolean {
        const value = this.getValue(cellIndex);
        if (value==null) 
            return true; //Null values are valid

        for (const index of cellsToCheck(cellIndex, this.size))
            if (value==this.getValue(index))
                return false;

        //No errors, number is valid
        return true;
    }

    /**
     * Checks the whole Sudoku grid to see if it's valid (no duplicates in row, column or sub-grid)
     * @returns true if the grid is valid, false if there are duplicate values in row, column or sub-grid
     */
    gridIsValid(): boolean{
        for (let i=0; i<this.size; i++){
            for (let j=0; j<this.size; j++){
                if (!this.numberIsValid({row: i,col: j})) return false;
            }
        }
        return true;
    }

    /**
     * Sets a new value for the sudoku grid at the desired row and column, 
     * returning a new object with the updated value
     * @param rowIndex The row index (0-based) where to place the new value
     * @param colIndex The column index (0-based) where to place the new value
     * @param value The new value to insert in the grid
     * @returns A new SudokuGrid with the updated value
     */
    setNewValue(rowIndex: number, colIndex: number, value: number){
        const newData = new Array(this.size); 
        for (let i=0; i<this.size; i++)
            newData[i] = this.data[i].slice(0); // Copy column
        newData[rowIndex][colIndex]=value; 
        return new SudokuGrid(this.size, newData);
    }

    solve(){
        if (this.isEmpty())
            this.data[0][0]=1; // To avoid issues with completely empty grids, solve by starting to set the first value
        const options = new SudokuOptions(this);
        return searchSolution(options);
    }

    isEmpty(){
        return (this.data.every(row=>row.every(cell=>cell===null)));
    }
}



/**
 * Gives an array of cell indexes to check for validation of a given cell -
 * i.e. the cells on the same rows, same column or same subgrid (square)
 * @param cellIndex the index of the cell to validate
 * @param size the size of the Sudoku grid
 * @returns an array of indexes (i,j) representing the cells to check
 */
 export function cellsToCheck(cellIndex: CellIndex, size: number):Array<CellIndex>{
    const cellIndexes = new Array<CellIndex>();

    //Check row
    for (let j=0; j<size; j++){
        if (j!==cellIndex.col)
            cellIndexes.push({row: cellIndex.row, col: j});
    }

    //Check column
    for (let i=0; i<size; i++){
        if (i!==cellIndex.row)
            cellIndexes.push({row: i, col: cellIndex.col});
    }

    // Check subgrid (square)
    const squareSize = Math.sqrt(size);
    const rowSquareStart = Math.floor(cellIndex.row/squareSize) * squareSize;
    const colSquareStart = Math.floor(cellIndex.col/squareSize) * squareSize;
    for (let i=rowSquareStart; i<rowSquareStart+squareSize; i++){
        for (let j=colSquareStart; j<colSquareStart+squareSize; j++){
            if (i!==cellIndex.row && j!==cellIndex.col)
                cellIndexes.push({row: i, col: j});
        }
    }

    return cellIndexes;
}