const express = require('express');
const router = express.Router();
const User = require('../Models/user_schema.js')
const passport = require('passport');
const {saveRedirectUrl} = require('../Middlewares/authentication')

// router.get('/demouser',async (req,res)=>{
//     let fakeuser = new User({
//         email : "user1234@gmail.com",
//         username : "user1234"
//     });

//     let registeredUser = await User.register(fakeuser , "password123");
//     res.send(registeredUser)
// })

router.get('/signup',async (req,res)=>{
    res.render('User/signup.ejs',{title : "Sign Up"});
})

router.post('/signup',async (req,res)=>{
   try{ 
    let {username , email , password} = req.body;
    const newUser = await new User({email, username});
    const registeredUser = await User.register(newUser , password);
    // console.log(registeredUser);
    req.login(registeredUser, (err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Welcome to Airbnb');
        res.redirect('/listings');
    });
    }
    catch(err)
    {
        req.flash('failure',"Username already registered");
        res.redirect('/signup')
    }
})

router.get('/login',async(req,res)=>{
    let credentialError = null;
    if(req.session.flash.error)
    {
        credentialError = req.session.flash.error;
        req.session.flash = null; 
    }
    res.render('User/login.ejs',{title : "Login", error : credentialError});
})

router.post(
    '/login',
    saveRedirectUrl, // Middleware to save redirect URL
    passport.authenticate('local', {
        failureRedirect: '/login', // Redirect to login page on failure
        failureMessage: 'true',
        failureFlash: 'Invalid credentials!'
    }),
    (req, res) => {
        // Login successful
        req.flash('success', 'Welcome back to Airbnb!');
        const redirectUrl = req.session.redirectUrl || '/listings';
        delete req.session.redirectUrl; // Clean up session
        res.redirect(redirectUrl);
    }
);

  

router.get('/logout',async(req,res,next)=>{
    req.logout((err)=>{
        if(err)
        {
            return next(err);
        }

    // console.log(req)
    req.flash("success","logout successfully !")
    res.redirect('/listings');
})
})

module.exports = router;

