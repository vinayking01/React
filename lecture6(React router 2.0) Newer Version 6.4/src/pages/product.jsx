import {NavLink} from 'react-router-dom'
import { Outlet } from 'react-router-dom' 

export function Products()
{
    return(
        <>
        <ul style={{padding: '20px 10px', margin: '30px 10px'}}>
        <li>
        <NavLink to='123'>Product- 123</NavLink>
        </li>
        <li>
        <NavLink to='124'>Product- 124</NavLink>
        </li>
        <li>
        <NavLink to='125'>Product- 125</NavLink>
        </li>
        </ul>
        <Outlet />
        </>
    )
}