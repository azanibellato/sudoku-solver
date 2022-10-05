import Box from './Box';
import '../css/Grid.css';
import {SudokuGrid} from 'sudoku';

type GridProps = {
    size: number;  
    grid: SudokuGrid;
    changeNumber: (event: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => void;
};


function Grid(props: GridProps){
    
    const rows = props.grid.data.map(
        (row:number[], rowIndex:number)=> 
            (<div className="grid-row" key={rowIndex}>
                {row.map( (el:number, colIndex:number)=> 
                    (<Box onChange={props.changeNumber} row={rowIndex} col={colIndex} max={props.size}
                        value={el} key={rowIndex*props.size+colIndex} error={!props.grid.numberIsValid(rowIndex, colIndex)}/>)) }
            </div>)
        );

    return (
    <div className="grid">
        {rows}
    </div>
    ); 
}

export default Grid;