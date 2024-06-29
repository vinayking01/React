import {NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom' 
export default function Contact()
{
    return (
        <>
            <h1>This is the Contact</h1>
            <div style={{padding : '30px 30px', textAlign : 'Center'}}>
            <p>This the various ways for Contact Below</p>
            <button >
            <NavLink to='contact-us'>Call us or Mail Us</NavLink>  
            </button>
            <button>
            <NavLink to='address'>Headquarter Address</NavLink>  
                        
            </button>
            <Outlet/> {/*  For rendering the routes of the contact  */}
            </div>
        </>
    );
} 