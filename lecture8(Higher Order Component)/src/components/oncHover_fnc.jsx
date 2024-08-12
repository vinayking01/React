/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable-next-line react/prop-types */

import { HOComponent } from "./HigherOrderComp";

const OnHover = ({count,incrementCount})=>
{   
    return (
    <div style={{textAlign:"center"}}>
    <h3>{count}</h3>
    <button onMouseOver={incrementCount}>on Hover</button>
    </div>
    )
}

export default HOComponent(OnHover);