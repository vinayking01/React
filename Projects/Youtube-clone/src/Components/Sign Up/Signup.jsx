// This is login Component based on Firebase Real Time databases

// import React, { useState } from "react";
// import "./Signup.css";
// import Youtube_logo from "../../assets/youtube-logo.svg";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { app } from "../../firebase_configuration";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const CreateUser = async (e) => {
//     e.preventDefault();
//     const auth = getAuth(app); // Uses the default Firebase app instance
//     await createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         console.log("User created:", user);
//       })
//       .catch((error) => {
//         console.log("Error occurred:", error);
//       });
//   };

//   return (
//     <div className="signup-container flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
//         <div className="flex flex-col items-center mb-6">
//           <img src={Youtube_logo} alt="YouTube Logo" className="w-16 h-16 mb-2" />
//           <h2 className="text-2xl font-bold text-gray-700">Sign Up</h2>
//         </div>
//         <form onSubmit={CreateUser} className="space-y-6">
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
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;


// This is login Component based on Firebase -> FireStore databases



import React, { useState } from "react";
import "./Signup.css";
import Youtube_logo from "../../assets/youtube-logo.svg";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase_configuration";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const CreateUser = async (e) => {
    e.preventDefault();
    const auth = getAuth(app); // Uses the default Firebase app instance
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User created:", user);
      })
      .catch((error) => {
        console.log("Error occurred:", error);
      });
  };

  return (
    <div className="signup-container flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          <img src={Youtube_logo} alt="YouTube Logo" className="w-16 h-16 mb-2" />
          <h2 className="text-2xl font-bold text-gray-700">Sign Up</h2>
        </div>
        <form onSubmit={CreateUser} className="space-y-6">
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;