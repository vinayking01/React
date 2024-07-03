
import { IoIosCloseCircle } from "react-icons/io";

export function DisplayTaskList(props) {
    var f = props.TaskLength;
    // console.log(f)

    return (
        <>
            <div style={{ border: '2px solid black', width: '100%', maxHeight: '300px', paddingTop: '30px', marginTop: '30px', overflowY: "auto" }}>
                <div style={{ display: 'flex', flexDirection: "column", alignItems: 'center', gap: '10px' }}>
                    {(f > 0) && props.Data.map((curElem, index) => (
                        <div key={index} style={{ border: '2px solid black', width: '90%', height: '50px', display: 'grid', gridTemplateColumns: '3fr 1fr', overflow: 'hidden', }}>
                            <div style={{backgroundColor:"pink" , padding:'2px 2px ' , fontSize: "medium"}}>
                                <p>{curElem}</p>
                            </div>
                            <button onClick={() => props.deleteTask(curElem)}>
                                <IoIosCloseCircle size={25} style={{ color: 'red' }} />
                            </button>
                        </div>
                    ))
                    }
                </div>

            </div>
        </>
    )
}
