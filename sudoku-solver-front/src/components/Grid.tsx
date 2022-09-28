import { useState } from 'react';
import Box from './Box';
import '../css/Grid.css';

type GridProps = {
    size: number;    
};

function Grid(props: GridProps){

    const [data, setData] = useState(new Array(props.size).fill(new Array(props.size).fill(null)));

    const changeNumber = (event:React.ChangeEvent<HTMLInputElement>, rowIndex:number, colIndex:number) => {
        const newData = JSON.parse(JSON.stringify(data)); // Deep copy
        newData[rowIndex][colIndex]=event.target.value; 
        setData(newData);
    };

    const rows = data.map(
        (row:number[], rowIndex)=> row.map(
            (el, colIndex)=> <Box onChange={changeNumber} row={rowIndex} col={colIndex} value={el} key={rowIndex*props.size+colIndex} />));
        
    console.log(rows);


    return <div className="grid">
        {rows}
    </div>; 
}

export default Grid;