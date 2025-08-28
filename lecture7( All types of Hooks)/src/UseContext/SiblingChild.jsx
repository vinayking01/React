import { UserContext} from "./UseContext_hook";
import { useContext } from 'react';

export function SiblingChild1() {

  const data = useContext(UserContext);
  console.log("Inside the Sibling Child 1 trying to access data ",data); // it is not accessible because i have not wrapped into the provider . 

  return (
    <div><h4>This is our Sibling Child 1</h4></div>
  )
}

export function SiblingChild2(){

    const data = useContext(UserContext);
    console.log("Inside the Sibling Child 2 trying to access data ",data); // it is not accessible because i have not wrapped into the provider .

    return (
        <div><h4>This is our Sibling Child 2</h4></div>
    )

}