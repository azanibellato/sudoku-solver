import { CellValue } from "sudoku";

type BoxProps = {
    value: CellValue;
    row: number;
    col: number;
    max: number;
    error: boolean;
    isSolution: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => void;
};

function Box(props: BoxProps){
    const squareSize = Math.sqrt(props.max);
    //Borders
    const classesArray = ['box'];
    if (props.row % squareSize===0) classesArray.push('border-top');
    if (props.row % squareSize===2) classesArray.push('border-bottom');
    if (props.col % squareSize===0) classesArray.push('border-left');
    if (props.col % squareSize===2) classesArray.push('border-right');

    //Other classes
    if (props.error) classesArray.push('error');
    if (props.isSolution) classesArray.push('solution');
    // CSS classes
    const classes = classesArray.join(" ");

    return <input 
        disabled={props.isSolution}
        type="number"
        className={classes}
        min="1"
        max={props.max}
        value={props.value || ""}
        onChange={(e)=>props.onChange(e, props.row, props.col)}
    />
}

export default Box;