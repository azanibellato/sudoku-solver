
type BoxProps = {
    value: number;
    row: number;
    col: number;
    max: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => void;
};

function Box(props: BoxProps){
    return <input 
        type="number"
        className="box"
        min="1"
        max={props.max}
        value={props.value || ""}
        onChange={(e)=>props.onChange(e, props.row, props.col)}
    />
}

export default Box;