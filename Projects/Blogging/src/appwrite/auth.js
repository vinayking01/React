import conf from "../Config/conf"

import { Client, Account, ID } from "appwrite";

export class Authservice {

    client = new Client();
    account;

    constructor()
    {
        this.client
        .setEndpoint(conf.appwriteUrl) // Your API Endpoint
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        

    }

    // create user account/ signup

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password);
            if(userAccount)
            {
                // here you can define your own functionality what i did is if, user got sign up then login directly.
                return this.login(email,password); 
            }
            else{
                return userAccount;
            }
        } catch (err) {
            console.error('Error creating account:', err.message); // Log the error details
            // Handle the error accordingly, like displaying a message to the user
            throw err;
        }
    }
    

    // login user
    async login({email,password}){
        try {
            const session = await this.account.createEmailPasswordSession(
                email, 
                password
            );
            return session;
        } catch (err) {
            console.error('Error creating account:', err.message); // error during logging
            throw err;
        }
    }

    // getCurrentUser check function whether user is authenticated or already in homepage then find is it logged in or not.
    async getCurrentUser(){
        try {
            const user = await this.account.get();
            return user;
        } catch (err) {
            console.log(err)
            throw err;
        }
    }

    // logout 
    async logout()
    {
        try{
            await this.account.deleteSessions();
            
        }
        catch(err)
        {
            console.log(err)
            throw err;
        }
    }
}

const authService  = new Authservice();

export default authService; // exporting the object of services containing various services 