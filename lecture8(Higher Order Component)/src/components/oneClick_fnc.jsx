import { HOComponent } from "./HigherOrderComp";

 const OnClick =(props)=>
{
    return (
        <div style={{textAlign:"center" }}>
        <h3>{props.count}</h3>
        <button onClick={props.incrementCount}>on click</button>
        </div>
    )
}
export default HOComponent(OnClick);

