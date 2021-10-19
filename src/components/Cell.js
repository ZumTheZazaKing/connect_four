export function Cell(props){
    return <div className={`cell`}>
        <div onClick={(e) => props.play(e)} id={props.cellNumber} className={`token ${props.value}`}></div>
    </div>
}