import { CellValue } from "sudoku";

type BoxProps = {
    value: CellValue;
    row: number;
    col: number;
    max: number;
    error: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => void;
};

function Box(props: BoxProps){
    const squareSize = Math.sqrt(props.max);
    //Borders
    const borderTop = (props.row % squareSize===0) ? ' border-top' : '';
    const borderBottom = (props.row % squareSize===2)? ' border-bottom' : '';
    const borderLeft = (props.col % squareSize===0)? ' border-left' : '';
    const borderRight = (props.col % squareSize===2)? ' border-right' : '';
    const error = (props.error) ? ' error' : '';
    // CSS classes
    const classes =`box${borderTop}${borderBottom}${borderLeft}${borderRight}${error}`;

    return <input 
        type="number"
        className={classes}
        min="1"
        max={props.max}
        value={props.value || ""}
        onChange={(e)=>props.onChange(e, props.row, props.col)}
    />
}

export default Box;