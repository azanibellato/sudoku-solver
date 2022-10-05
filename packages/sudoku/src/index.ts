
export class SudokuGrid{
    data: number[][];
    size: number;

    constructor(size:number, data?:number[][]){
        this.size = size;
        if (data)
            this.data = data;
        else
            this.data = new Array(this.size).fill(new Array(this.size).fill(null));
    
    }    
    
    /**
     * Checks if a number in the sudoku grid is valid (no duplicates in row, column or sub-grid)
     * @param row The row index (0-based) of the number to check
     * @param col The column index (0-based) of the number to check
     * @returns true if the number is valid, false if it is not valid
     */
    numberIsValid(row:number, col:number):boolean {
        const data = this.data;

        // We don't check null values
        if (data[row][col]==null) return true;

        //Check row
        for (let j=0; j<data.length; j++){ 
            if (j!==col && data[row][j]===data[row][col]) 
                return false;
        }

        //Check column
        for (let i=0; i<data.length; i++){ 
            if (i!==row && data[i][col]===data[row][col]) 
            return false;
        }

        // Check subgrid (square)
        const squareSize = Math.sqrt(data.length);
        const rowSquareStart = Math.floor(row/squareSize) * squareSize;
        const colSquareStart = Math.floor(col/squareSize) * squareSize;
        for (let i=rowSquareStart; i<rowSquareStart+squareSize; i++){
            for (let j=colSquareStart; j<colSquareStart+squareSize; j++){
                if ((i!==row || j!==col) && data[i][j]===data[row][col]) 
                    return false;
            }
        }

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
                if (!this.numberIsValid(i,j)) return false;
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
}
