import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Youtube_logo from "../../assets/youtube-logo.svg";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { app } from "../../firebase_configuration";
import { useDispatch } from "react-redux";
import {
  Login_Request,
  Login_success,
  Login_fail,
  Load_profile,
} from "../../Store/authSlice";

const Login = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const Dispatch = useDispatch();
  const Navigate = useNavigate();
  const [toggleBtn, setToggle] = useState(true); // Toggle between Login/Sign Up
  const [userSession, setUserSession] = useState(sessionStorage.getItem("user_session"));

  const Login_with_google = async () => {
    try {
      Dispatch(Login_Request());
      provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");

      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      const accessToken = credential.accessToken;

      const profile = {
        username: user.displayName,
        profile_photo: user.photoURL,
      };

      // Dispatch Redux actions
      Dispatch(Login_success(accessToken));
      Dispatch(Load_profile(profile));

      // Save session to storage
      sessionStorage.setItem("user_session", accessToken);
      sessionStorage.setItem("profile", JSON.stringify(profile));
      setUserSession(accessToken);

      Navigate("/");
    } catch (error) {
      Dispatch(Login_fail(error.message));
      console.error("Error during Google sign-in:", error.message);
    }
  };

  useEffect(() => {
    if (userSession) {
      Navigate("/");
    }
  }, [userSession, Navigate]);

  return (
    <div className="login-container flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center mb-6">
          <img src={Youtube_logo} alt="YouTube Logo" className="w-16 h-16 mb-2" />
          <h2 className="text-2xl font-bold text-gray-700 text-center">
            {toggleBtn ? "Hi, Login with Google Account for Go tube video Play :)" : "Sign Up with Google"}
          </h2>
        </div>
        <form className="flex flex-col gap-4">
          <button
            type="button"
            onClick={Login_with_google}
            className="w-full text-black bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
          >
            {toggleBtn ? "Log In" : "Sign Up"} with Google
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link
            onClick={() => setToggle((prev) => !prev)}
            className="cursor-pointer underline text-blue-600"
          >
            {toggleBtn
              ? "New User? Click Here to Register"
              : "Already a User? Click Here to Log In"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
