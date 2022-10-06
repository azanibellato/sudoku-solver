import Box from './Box';
import '../css/Grid.css';
import {SudokuGrid, CellValue} from 'sudoku';

type GridProps = {
    size: number;  
    grid: SudokuGrid;
    solution: SudokuGrid | null;
    changeNumber: (event: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => void;
};


function Grid(props: GridProps){
    
    const rows = props.grid.data.map(
        (row:CellValue[], rowIndex:number)=> 
            (<div className="grid-row" key={rowIndex}>
                {row.map( (el:CellValue, colIndex:number)=> 
                    (<Box onChange={props.changeNumber} row={rowIndex} col={colIndex} max={props.size}
                        hasSolution={props.solution!==null}
                        isSolution={props.solution? (props.solution.data[rowIndex][colIndex]!==el) : false}
                        value={props.solution? props.solution.data[rowIndex][colIndex] : el} key={rowIndex*props.size+colIndex} error={!props.grid.numberIsValid({row: rowIndex, col: colIndex})}/>)) }
            </div>)
        );

    return (
    <div className="grid">
        {rows}
    </div>
    ); 
}

export default Grid;