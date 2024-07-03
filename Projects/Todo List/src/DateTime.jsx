import { useState } from 'react'

export function DateTime()
{

    const p = new Date();
    var [DT, SetDateTime] = useState(p);  

    setInterval(() => {
        SetDateTime(new Date());
    }, 1000);

    return (
        <>
        <div style={{textAlign: 'center'}}>
        <h3 style={{color:"yellow"}}>{DT.toDateString()} / {DT.toLocaleTimeString()}</h3>
        </div>
        
        </>
    )
}