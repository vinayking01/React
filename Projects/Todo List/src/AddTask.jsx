import { useState } from "react"
import { DisplayTaskList } from "./DisplayTask";
import { ClearAll } from "./ClearAllList";

export function AddTask() {
    var [title, SetTask] = useState('');
    var [TaskList, SetList] = useState([]);
    var [TaskLength, SetLength] = useState(0);

    function updateTask(event) {
        // console.log(event.target.value);
        SetTask(event.target.value);
    }
    function DisplayTask(event) {
        event.preventDefault(); // Prevent the form from submitting and reloading the page

        if (!TaskList.includes(title) && title !== '') {
            SetList([...TaskList, title])
            SetLength(TaskLength + 1);
            SetTask('')
            // console.log(TaskList)
        }
        
    }
    
    const deleteTask = (curElem) => {
        var NewList = TaskList.filter(Element => ((curElem) != Element));
        SetList(NewList);
    };
     function ClearALList()
    {
        SetList([]);
        SetLength(0);
    }
    return (
        <>
            <form onSubmit={DisplayTask} style={{border:"4px dotted pink"}}>
                <div className="input">
                    <input type="text" value={title} onChange={updateTask} />
                </div>
                <button type={"submit"}> Add Task </button>
            </form>
            {(TaskLength > 0) && <DisplayTaskList Data={TaskList} TaskLength={TaskLength} deleteTask = {deleteTask} />}
            <ClearAll ClearAllList={ClearALList}/>
        </>


    );
}