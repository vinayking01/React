import React from "react"

export default function MyButton(props)
{
    return (
        <>
            <button onClick={props.YourBtn}>Click on Btn {props.btn_number}</button>
        </>
    )
}