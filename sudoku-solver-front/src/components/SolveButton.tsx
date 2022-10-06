type SolveButtonProps = {
    isUsable: boolean;
    solve: () => void;
}

function SolveButton(props:SolveButtonProps){
    return (
        <button onClick={props.solve} disabled={!props.isUsable}>Solve</button>
    );

}

export default SolveButton;