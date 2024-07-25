import { useState } from 'react'

export  function UseState_hook() {
    const [count, setCount] = useState(0);
    const [user, setUser] = useState({
        name: "Vnay Singh",
        age : 22
    })
    function increaseValue() {
        setCount(count + 1);
    }
    function changeUser()
    {
        setUser({...user, name:"Binod"});  // for chg only single value
    }
    return (
        <>
            <h1>
                <div style={{ textAlign: 'center' }}>
                    <button onClick={increaseValue}>Click the button</button>
                    <h3>{count}</h3>
                </div>
                <div  style={{ textAlign: 'center' }}>
                    <button onClick={changeUser}>Get another data</button>
                    <h3>{user.name} & {user.age}</h3>
                </div>
            </h1>
        </>
    )
}

