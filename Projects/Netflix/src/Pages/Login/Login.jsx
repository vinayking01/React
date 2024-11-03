import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { useForm } from "react-hook-form"
import hero_banner from '../../assets/hero_banner.jpg'
import Footer from '../../Components/Footer/Footer'
import { signUp, logIn } from '../../firbase_authService'
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { toast } from 'react-toastify'

function Login() {
  const [username, SetUsername]  = useState("");
  const [email, SetEmail] = useState("");
  const [password , SetPassword] = useState("");
  const [Sign_in, Set_SignInUp] = useState("Sign In");
  const [loader , setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {

    setLoader(true)
    try {
      if (Sign_in === "Sign Up") {
        // Call signUp for registration
        const user = await signUp(data.username,data.email, data.password);
        console.log("User signed up:", data.email);
      } else {
        // Call logIn for authentication
        const user = await logIn(data.email, data.password);
        console.log("User logged in:", user);
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
    }
    setLoader(false)
  };


  return (

    // (loader)? <div> <img src={netflix_spinner} alt="" className='w-32 h-32 m-auto' /></div> : 
    <div>
      {/* Logo  */}
      <div className='pl-36 pt-16'>
        <img src={logo} alt="Netflix" className='center w-36 h-10' />
      </div>

      <div className='relative -top-28 '>
        <img
          src={hero_banner}
          alt="hero banner"
          className="hero-banner w-[100%] h-[100%] min-w-[500px] min-h-[400px] mask-image"
        />
        {/* form section  */}

        <div className='absolute top-[20%] left-[50%] transform -translate-x-[50%] z-9'>
          <div className='border-4 border-white p-9 m-auto text-center bg-black opacity-65'>
            <form onSubmit={handleSubmit(onSubmit)} className="login-form flex flex-col items-start">
              <h1 className='text-3xl font-bold mb-6'>{Sign_in}</h1>
              {(Sign_in =="Sign Up") && <div className='w-96 h-12 mb-6'>
              <input
                  id="name"
                  type="text"
                  {...register("username", {
                    required: "name is required"
                  })}
                  className='w-full h-full text-black'
                  placeholder="Enter your Name"
                  value= {username}
                  onChange={(e)=>{
                    SetUsername(e.target.value)
                  }}
                />
                </div>}
              <div className='w-96 h-12 mb-6'>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a valid email address"
                    }
                  })}
                  className='w-full h-full text-black'
                  placeholder="Enter your email"
                  value= {email}
                  onChange={(e)=>{
                    SetEmail(e.target.value)
                  }}
                />
              </div>
              <div className='w-96 h-12 mb-6'>
                <input
                  id="password"
                  type="password"
                  {...register("password", { required: "Password is required" })}
                  placeholder="Enter your password"
                  className='w-full h-full text-black'
                  value= {password}
                  onChange={(e)=>{
                    SetPassword(e.target.value)
                  }}
      
                />
              </div>
              
                {(Sign_in !="Sign In")?(<div className='relative z-100'>
                  <button type="submit" className="bg-red-800 opacity-70 text-white px-4 py-2 hover:bg-red-400 rounded-md w-32 cursor-pointer"> Sign Up</button></div> ): (<div className='relative z-10'>
                  <button type="submit" className="bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-400 w-32 cursor-pointer"> Sign In</button> 
                  <input type='button' value={"Forget Password"} className="text-gray-200 underline ml-4 hover:text-gray-700" /> </div>)}

                
              <div>
                <br />
                {(Sign_in !="Sign In")? (<p>Already Have an Account? <span onClick={()=>{
                  Set_SignInUp("Sign In")
                }}  className='text-xl underline font-semibold cursor-pointer text-white underline ml-4 hover:text-gray-400 '>Log In</span></p>): <p>New to Netflix? <span onClick={()=>{
                  Set_SignInUp("Sign Up")
                }}  className='text-xl underline font-semibold cursor-pointer text-white underline ml-4 hover:text-gray-400 '>Sign Up Now</span></p>}

              </div>
            </form>
          </div>
        </div>
        <div className='relative top-44'>
        <Footer/>
        </div>
        


      </div>
    </div>
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */

  )
}


export default Login
