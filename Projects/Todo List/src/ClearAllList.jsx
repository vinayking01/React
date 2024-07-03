export function ClearAll(props)
{
    return (
        <>
        <div style={{textAlign:"center",marginTop:"10px", }}>
        <button style={{backgroundColor:"red", fontSize:"medium" , fontWeight:"bolder", padding:"10px 10px"  }} onClick={() => props.ClearAllList()}> Clear ALL</button>
        </div>
        </>
    )
}