import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../Store/authSlice';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Moved useNavigate to the top level

    const logouthandler = () => {
        authService.logout().then(() => {
            console.log("Deleted session");
            dispatch(logout());
            navigate('/'); // Navigate to home after logging out
        }).catch(error => {
            console.error("Logout failed:", error);
        });
    };

    return (
        <button 
            className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' 
            onClick={()=>{logouthandler()}}
        >
            Logout
        </button>
    );
}

export default LogoutBtn;
