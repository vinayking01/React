import { useState } from "react"
import { DisplayTaskList } from "./DisplayTask";
import { ClearAll } from "./ClearAllList";

export function AddTask() {
    var [title, SetTask] = useState('');

    // Now we are taking list data from the local Storage.
    var [TaskList, SetList] = useState(()=>{
       var rawList = localStorage.getItem('Data_OnLocalStorage');
       if(!rawList) // because initially the local storage area is blank so it should return blank array
        {
            return [];
        }
        return JSON.parse(rawList); 
    }); 

    var [TaskLength, SetLength] = useState((JSON.parse(localStorage.getItem('Data_OnLocalStorage')))? JSON.parse(localStorage.getItem('Data_OnLocalStorage')).length:0);  // taking the latest length of the tsk list using local storage
    

    function updateTask(event) {
        // console.log(event.target.value);
        SetTask(event.target.value);
        
    }
    function DisplayTask(event) {
        event.preventDefault(); // Prevent the form from submitting and reloading the page

        if (!TaskList.includes(title) && title !== '') {
            SetList([...TaskList, title])
             // Adding list to local Storage
            localStorage.setItem('Data_OnLocalStorage', JSON.stringify([...TaskList, title]));    // adding the every new task in our local storage.
            SetLength(TaskLength + 1);
            SetTask('')
           
            
        }
        
    }
    
    const deleteTask = (curElem) => {
        var NewList = TaskList.filter(Element => ((curElem) != Element));
        SetList(NewList);
        localStorage.setItem('Data_OnLocalStorage', JSON.stringify(NewList));       // After deleting the selective task updating the local storage.
    };
     function ClearALList()
    {
        SetList([]);
        localStorage.setItem('Data_OnLocalStorage', '[]');             // After deleting all the task updating the local storage.
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