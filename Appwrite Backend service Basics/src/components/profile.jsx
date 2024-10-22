import React, {useState, useEffect} from 'react'
import {account} from '../appwrite/config'
import {useNavigate, Link} from 'react-router-dom'
import TodoForm from './TodoForm'



function Profile() {
    const navigate = useNavigate()
    const [loading, setLoader] = useState(true);
    const [userDetails, setUserDetails] = useState("")

    useEffect(() => {
      const getData = account.get()
      getData.then(
        function(response){
            setUserDetails(response)
            setLoader(false);
            console.log(userDetails);
        },
        function(error){
            console.log(error);
        }
      )
    }, [])

    const handleLogout = async () => {
        try {
            await account.deleteSession("current")
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    }
    

  return (
    <>
      {(loading)?(
        <>
        <h1>Trying to fetch data if found. </h1>
        </>
      ):userDetails ? (
          <>
            <div className="min-h-min max-w-7xl mx-auto shadow-md flex justify-between text-right py-3 px-3 mt-2 rounded-md">
              <div>
                <p className="text-xl">Hello {userDetails.name}</p>
              </div>
              <div>
                <button
                  className="bg-red-400 text-white p-1 rounded-md"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
            {/* TODO FORM */}
            <TodoForm />
            
          </>
        ) :(
          <>
          <p className="mt-4">
            Please Login To see Profile{" "}
            <Link to="/">
              <span className="bg-blue-300 p-2 cursor-pointer text-white rounded-md">
                Login
              </span>
            </Link>
          </p>
          </>
        )
        }
    </>
  )
}

export default Profile