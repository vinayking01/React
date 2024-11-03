//Create an authService.js file for reusable authentication functions. This makes our code cleaner by centralizing authentication actions (sign up, log in, and log out).

// authService.js
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "./firebase"; //
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";

// Sign up function
export const signUp = async (name , email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        await addDoc(collection(db,"user"),{
            uid : user.uid,
            name,
            authProvider : "local",
            email
        });
    }
    catch(error){
        console.log("error came",error)
        toast.error((error.code).split("/")[1])
    } 
};

// Log in function
export const logIn = async (email, password) => {
    try{
        return await signInWithEmailAndPassword(auth, email, password);
        }
    catch(error){
        console.log("error no logged",error)
        toast.error((error.code).split("/")[1])
    } 
};

// Log out function
export const logOut = () => {
  signOut(auth);
  toast('Logged out successfully !')
};
