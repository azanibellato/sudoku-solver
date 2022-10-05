
export class SudokuGrid{
    data: number[][];
    size: number;

    constructor(size:number, data?:number[][]){
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
    
    /**
     * Checks if a number in the sudoku grid is valid (no duplicates in row, column or sub-grid)
     * @param row The row index (0-based) of the number to check
     * @param col The column index (0-based) of the number to check
     * @returns true if the number is valid, false if it is not valid
     */
    numberIsValid(row:number, col:number):boolean {
        const data = this.data;
        if (this.data[row][col]==null) 
            return true; //Null values are valid

        for (const [i,j] of this.cellsToCheck(row, col))
            if (this.data[row][col]==this.data[i][j])
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

    cellsToCheck(rowIndex:number, colIndex:number):number[][]{
        const cellIndexes = new Array();

        //Check row
        for (let j=0; j<this.size; j++){
            if (j!==colIndex)
                cellIndexes.push([rowIndex,j]);
        }

        //Check column
        for (let i=0; i<this.size; i++){
            if (i!==rowIndex)
                cellIndexes.push([i,colIndex]);
        }

        // Check subgrid (square)
        const squareSize = Math.sqrt(this.size);
        const rowSquareStart = Math.floor(rowIndex/squareSize) * squareSize;
        const colSquareStart = Math.floor(colIndex/squareSize) * squareSize;
        for (let i=rowSquareStart; i<rowSquareStart+squareSize; i++){
            for (let j=colSquareStart; j<colSquareStart+squareSize; j++){
                if (i!==rowIndex && j!==colIndex)
                    cellIndexes.push([i,j]);
            }
        }

        return cellIndexes;
    }
}

class SudokuOptions{
    grid: SudokuGrid;
    options: number[][][];

    constructor(grid: SudokuGrid){
        this.grid = grid;
        this.options = new Array(this.grid.size);
        for (let i=0; i<this.grid.size; i++){
            this.options[i] = new Array(this.grid.size);
            for (let j=0; j<this.grid.size; j++){
                this.options[i][j] = new Array();
                if (this.grid.data[i][j]!=null)
                    this.options[i][j].push(this.grid.data[i][j]); //If already filled, the option is set
                else // Otherwise, we need to check what options are available
                    for (let z=1; z<=this.grid.size; z++){
                        const testGrid = this.grid.setNewValue(i,j,z);
                        if (testGrid.numberIsValid(i,j))
                            this.options[i][j].push(z);
                    }
            }
        }
    }

    tryRemoveOption(row:number, col:number, value:number){
        if (this.options[row][col].length<=1)
        return null; //Contradiction - we cannot remove the last option
        const reducedOptions = this.options[row][col].filter(val=>val!==value);
        if (reducedOptions.length == 1){
            const lastOption = reducedOptions[0];

        }
            
        
        
        
    }

    
}
