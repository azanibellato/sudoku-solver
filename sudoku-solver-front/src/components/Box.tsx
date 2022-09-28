
type BoxProps = {
    value: number;
    row: number;
    col: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>, row: number, col: number) => void;
};

function Box(props: BoxProps){
    return <input 
        className="box"
        value={props.value || ""}
        onChange={(e)=>props.onChange(e, props.row, props.col)}
    />
}

export default Box;