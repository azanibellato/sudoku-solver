import { CellIndex } from ".";
import { cellsToCheck, SudokuGrid } from "./SudokuGrid";


function getRowOfCell(cellIndex: CellIndex, size: number):Array<CellIndex>{
    const result = new Array<CellIndex>(size);
    for (let j=0; j<size; j++){
        result[j] = {row: cellIndex.row, col: j};
    }
    return result;
}

function getColOfCell(cellIndex:CellIndex, size: number):Array<CellIndex>{
    const result = new Array<CellIndex>(size);
    for (let i=0; i<size; i++){
        result[i] = {row: i, col: cellIndex.col};
    }
    return result;
}

function getSubGridOfCell(cellIndex:CellIndex, size: number):Array<CellIndex>{
    const result = new Array<CellIndex>(size);
    const squareSize = Math.sqrt(size);
    const rowSquareStart = Math.floor(cellIndex.row/squareSize) * squareSize;
    const colSquareStart = Math.floor(cellIndex.col/squareSize) * squareSize;
    for (let i=rowSquareStart; i<rowSquareStart+squareSize; i++){
        for (let j=colSquareStart; j<colSquareStart+squareSize; j++){
            result.push({row:i,col:j});
        }
    }
    return result;
}

function getAllCells(size: number):Array<CellIndex>{
    const result = new Array<CellIndex>();
    for (let i=0; i<size; i++){
        for (let j=0; j<size; j++){
            result.push({row: i, col: j});
        }
    }
    return result;
}

export class SudokuOptions{
    data: number[][][];
    size: number;

    constructor(grid?: SudokuGrid, options?: SudokuOptions){
        if (grid){
            this.size = grid.size;
            this.data = new Array(this.size);
            for (let i=0; i<this.size; i++){
                this.data[i] = new Array(this.size);
                for (let j=0; j<this.size; j++){
                    this.data[i][j] = new Array();
                    const value = grid.data[i][j];
                    if (value!==null)
                        this.data[i][j].push(value); //If already filled, the option is set
                    else // Otherwise, we need to check what options are available
                        for (let z=1; z<=this.size; z++){
                            const testGrid = grid.setNewValue(i,j,z);
                            if (testGrid.numberIsValid({row: i, col:j}))
                                this.data[i][j].push(z);
                        }
                }
            }
        }
        else{
            if (options){
                this.size = options.size;
                this.data = JSON.parse(JSON.stringify(options.data))
            }
            else{
                this.size = 0;
                this.data = [];
            }
        }
        
    }

    getOptions(cellIndex: CellIndex):Array<number>{
        return this.data[cellIndex.row][cellIndex.col];
    }

    setOptions(cellIndex: CellIndex, values:Array<number>):void{
        this.data[cellIndex.row][cellIndex.col] = values;
    }

    addOption(cellIndex: CellIndex, value:number):void{
        if (this.getOptions(cellIndex).includes(value)) return;
        this.data[cellIndex.row][cellIndex.col].push(value);
    }

    removeOption(cellIndex: CellIndex, value:number):void{
        if (!this.getOptions(cellIndex).includes(value)) return;
        this.setOptions(cellIndex, this.getOptions(cellIndex).filter(val=>val!==value));
    }

    checkIfSolved():boolean{
        for (const cellIndex of getAllCells(this.size))
            if (this.getOptions(cellIndex).length!=1)
                return false;
        return true;
    }

    getSolutionData(){
        if (this.checkIfSolved()){
            const solvedData = this.data.map(row => row.map(options => options[0]));
            return solvedData;
        }
        else
            return null;
    }

    copy(){
        return new SudokuOptions(undefined, this);
    }
}


    

/**
 * Tries to set a unique value for a cell
 * @param options The array of options
 * @param cellIndex The cell index where to set the value
 * @param value The value we are trying to set
 * @returns the options if succesful, null if not possible to set the value (removing other options leads to a contradiction)
 */
export function trySetOptionValue(options:SudokuOptions, cellIndex:CellIndex, value:number){
    const otherOptions = options.getOptions(cellIndex).filter(val=>val!=value);
    for (const option of otherOptions){
        if (!tryRemoveOptionValue(options, cellIndex, option))
            return null;
    }
    return options;
}

/**
 * Try to remove the given value at a specific cell index from the options.
 * Returns the options if successful, null if not possible.
 * @param options The array of options
 * @param cellIndex The cell index where to remove the value
 * @param value The value we are trying to remove
 * @returns the options if successful, null if not possible.
 */
export function tryRemoveOptionValue(options:SudokuOptions, cellIndex:CellIndex, value:number){
    if (!options.getOptions(cellIndex).includes(value)) //If the value was not in the list, nothing to do
        return options;
    options.removeOption(cellIndex, value); //Remove option
    const optionsLeft = options.getOptions(cellIndex);
    if (optionsLeft.length==0)
        return null; //Contradiction - we cannot remove the last option
    if (optionsLeft.length == 1){ // If we have only one option, try to remove it from the other cells to see if it's possible
        const lastOption = optionsLeft[0];
        for (const tryCellIndex of cellsToCheck(cellIndex, options.size))
            if (!tryRemoveOptionValue(options, tryCellIndex, lastOption)) //Try removing this option from all other cells
                return null; //If not possible, stop, this was not valid
    }

    //Check if there is only one place for the value in the row, column or subgrid
    const unitsToCheck = [
        getRowOfCell(cellIndex, options.size),
        getColOfCell(cellIndex, options.size),
        getSubGridOfCell(cellIndex, options.size)
    ];
    for (const unit of unitsToCheck){
        const possibleCells = unit.filter(cellIndex => options.getOptions(cellIndex).includes(value) ); // Get which cells have the value in their options
        if (possibleCells.length==0) // There is no place for that value in the row/col/subgrid - contradiction!
            return null;
        if (possibleCells.length==1) // There is exactly one place for that value in the row/col/subgrid
            if (!trySetOptionValue(options, possibleCells[0], value)) // Try to see if we can place it there
                return null; //If not possible, stop                
    }
    
    return options;
    
}

type OptionsLength = {
    cellIndex:CellIndex;
    optLength:number;
}

export function searchSolution(options: (SudokuOptions | null)): (SudokuGrid | null){
    if (!options)
        return null;
    const solution = options.getSolutionData();
    if (solution)
        return new SudokuGrid(options.size, solution);
    
    // If not solved, find the cell with the fewest options (greater than 1)
    const optionsLength:Array<OptionsLength> = getAllCells(options.size).map<OptionsLength>(
        (cellIndex) => ({cellIndex: cellIndex, optLength: options.getOptions(cellIndex).length})    
    );
    const defaultCell:OptionsLength = {cellIndex:{row:-1,col:-1}, optLength:options.size};
    const minCell = optionsLength.reduce((currMin, element)=>((element.optLength>1 && element.optLength<currMin.optLength)?element:currMin), defaultCell);
    const cellToTry = minCell.cellIndex;
    const valuesToTry = options.getOptions(cellToTry);
    for (const value of valuesToTry){
        const tempOptions = options.copy();
        const tempUpdatedOption = trySetOptionValue(tempOptions,cellToTry,value);
        if (tempUpdatedOption){
            const solution = searchSolution(tempUpdatedOption);
            if (solution) return solution;
        }
    }
    return null;
}