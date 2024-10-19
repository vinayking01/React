import React from 'react'
import container from '../container/container';
import { Link } from 'react-router-dom';
import Logo, { logo } from '../logo'
import logoutBtn from './logoutBtn';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state)=>{
    state.auth.status})
    const navigate = useNavigate();

    // creating navigation 
    const navItems = [
      {
        name: 'Home',
        slug: "/",
        active: true
      }, 
      {
        name: "Login",
        slug: "/login",
        active: !authStatus,
    },
    {
        name: "Signup",
        slug: "/signup",
        active: !authStatus,
    },
    {
        name: "All Posts",
        slug: "/all-posts",
        active: authStatus,
    },
    {
        name: "Add Post",
        slug: "/add-post",
        active: authStatus,
    },
    ]

  return (
    <header className='py-3  shadow bg-gray-500'>
      <container>
        <nav className='flex'>
          {/* logo */}
          <div className='mr-4'>
          <link to='/'/>
          <Logo width='70px' />
          </div>

          {/*  list of navigation links */}
          <div>
            <ul className='flex ml-auto'>
              {
                navItems.map((item)=>{
                  if(item.active)
                    {
                      <li key={item.name}><button type="button" onClick={()=>{
                        navigate(item.slug)  // navigation will do the redirection and we have already passed the link in the name slug
                      }} className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                        {item.name}
                        </button></li>
                    }
                })
              }
                 {/* one thing is remaining is if user is already login then show him the logout button . */}
              {authStatus && (
                  <li> <logoutBtn/> </li>
                )}
            </ul>
          </div>

        </nav>
      </container>

    </header>
  )
}

export default Header