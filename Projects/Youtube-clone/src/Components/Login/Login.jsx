// This is login Component based on Firebase Real Time databases


// import React, { useEffect, useState } from "react";
// import "./Login.css";
// import Youtube_logo from "../../assets/youtube-logo.svg";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { app } from "../../firebase_configuration";
// import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
// import {signOut } from "firebase/auth";


// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const provider = new GoogleAuthProvider();
//   const auth = getAuth(app);
//   const [user, setUser] = useState(null);

//   const email_login = async (e) => {
//     e.preventDefault();
//     console.log(e)
//     await signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         console.log("User signed in ", user);
//       })
//       .catch((error) => {
//         console.log("Error occurred:", error);
//       });
//   };

//   const Login_with_google = (e) => {
//     e.preventDefault()
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         alert(result)
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         // The signed-in user info.
//         const user = result.user;
//         alert("user logged in", user);

//       }).catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         // ...
//       });
//   }

//   const logout = () => {
//     const auth = getAuth();
//     signOut(auth).then(() => {
//       console.log("Sign-out successful.")
//     }).catch((error) => {
//       console.log("An error happened.")
//     });
//   }

//   useEffect(() => {
//     console.log("running first time")
//     onAuthStateChanged(auth, (user) => { // this is the event listener actaully which listens the state changes
//       if (user) {
//         setUser(user.email)
//       }
//       else {
//         console.log("came here")
//         setUser(null)
//       }
//     });
//   }, [])

//   return (
//     <div className="login-container flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
//         <div className="flex flex-col items-center mb-6">
//           <img src={Youtube_logo} alt="YouTube Logo" className="w-16 h-16 mb-2" />
//           <h2 className="text-2xl font-bold text-gray-700">{user?`Hi, ${user}`:`${user} login`}</h2>
//         </div>
//         <form >
//           {/* Email Field */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-600">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-600">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="flex flex-col gap-2">
//             <button
//               type="submit"
//               onClick={email_login}
//               className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
//             >
//               Login
//             </button>
//             <button
//               type="submit"
//               onClick={Login_with_google}
//               className="w-full text-black bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
//             >
//               Sign in With Google Account
//             </button>

//           </div>

//         </form>
//         <button
//               type="submit"
//               onClick={logout}
//               className="w-full text-white bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
//             >
//               Logout
//             </button>
//       </div>
//     </div>
//   );
// };

// export default Login;


// This is login Component based on Firebase-> FireStore databases


import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Login.css";
import Youtube_logo from "../../assets/youtube-logo.svg";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../../firebase_configuration";
import { collection, addDoc, doc, getDoc, setDoc, getFirestore, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { Login_Request, Login_success, Login_fail, Load_profile } from "../../Store/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [togglebtn, Settoggle] = useState(true);
  const Dispatch = useDispatch();
  const Navigate = useNavigate();
  const user_state = useSelector((state) => state.auth);
  const [user_data, setSession] = useState(sessionStorage.getItem('user_session'));

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  

  const Login_with_google = async () => {
    try {

      Dispatch(Login_Request());
      // Add YouTube scope
      const provider = new GoogleAuthProvider();
       // Add YouTube force-ssl scope for full access
      provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");   //The scope is used to request permissions from the user to access their YouTube account. 
      
      // Sign in with Google
      const result = await signInWithPopup(auth, provider);

      const credential = GoogleAuthProvider.credentialFromResult(result);

      // Set user and token in state

      const user = result.user;
      const accessToken = credential.accessToken;
      console.log(user)
      const profile = {
        username: user.displayName,
        profile_photo: user.photoURL
      }

      Dispatch(Login_success(accessToken));

      Dispatch(Load_profile(profile))

      // Save session data synchronously
      sessionStorage.setItem("user_session", accessToken);
      sessionStorage.setItem("name", profile);

      // Update local state (optional but not necessary for sessionStorage)
      setSession(accessToken);

      Navigate('/')

    } catch (error) {
      Dispatch(error.message)
      console.error("Error during Google sign-in:", error.message);
    }
  };

  useEffect(() => {
    // const user_data = !user_data ?user_data.accessToken : null;
    if (user_data) {
      console.log("already logged in ")
           Navigate('/');  // Navigate if accessToken exists
        } 
  }, [])


  return (
    <div className="login-container flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          <img src={Youtube_logo} alt="YouTube Logo" className="w-16 h-16 mb-2" />
          <h2 className="text-2xl font-bold text-gray-700 text-center">Hi Login with Google Account</h2>
        </div>
        <form className="flex flex-col gap-2">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="">
            <button
              type="submit"
              onClick={Login_with_google}
              className="w-full text-black bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
            >
              {(togglebtn) ? "Log In" : "Sign Up"}
            </button>

          </div>

        </form>
        {/* {{togglebtn} && "dsd"} */}
        {togglebtn ? (<div className="mt-2 text-center">
          <Link onClick={() => { Settoggle(prev => !(prev)) }} className="cursor underline">New User ? Click Here to Register</Link>
        </div>) : (<div className="mt-2 text-center">
          <Link onClick={() => { Settoggle(prev => !(prev)) }} className="cursor underline">Already User? Click Here to Log In</Link>
        </div>)}
      </div>
    </div>
  );
};

export default Login;