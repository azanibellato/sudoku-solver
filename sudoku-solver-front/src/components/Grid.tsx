import Box from './Box';
import '../css/Grid.css';

type GridProps = {
    size: number;  
    data: number[][];
    changeNumber: (event: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => void;
};

function numberIsValid(row:number, col:number, data:number[][]):boolean {
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

function Grid(props: GridProps){
    
    const rows = props.data.map(
        (row:number[], rowIndex:number)=> 
            (<div className="grid-row">
                {row.map( (el:number, colIndex:number)=> 
                    (<Box onChange={props.changeNumber} row={rowIndex} col={colIndex} max={props.size}
                        value={el} key={rowIndex*props.size+colIndex} error={!numberIsValid(rowIndex, colIndex, props.data)}/>)) }
            </div>)
        );

    return (
    <div className="grid">
        {rows}
    </div>
    ); 
}

export default Grid;