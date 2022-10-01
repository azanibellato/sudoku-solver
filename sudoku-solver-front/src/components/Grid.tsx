import { useState } from 'react';
import Box from './Box';
import '../css/Grid.css';

type GridProps = {
    size: number;  
    data: number[][];
    changeNumber: (event: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => void;
};

function Grid(props: GridProps){

    const rows = props.data.map(
        (row:number[], rowIndex:number)=> 
            (<div className="grid-row">
                {row.map( (el:number, colIndex:number)=> 
                    (<Box onChange={props.changeNumber} row={rowIndex} col={colIndex} max={props.size}
                        value={el} key={rowIndex*props.size+colIndex} />)) }
            </div>)
        );
        
    console.log(rows);


    return (
    <div className="grid">
        {rows}
    </div>
    ); 
}

export default Grid;