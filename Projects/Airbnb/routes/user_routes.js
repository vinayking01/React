const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require('../Controllers/userController.js')
const {saveRedirectUrl} = require('../Middlewares/authentication')

// router.get('/demouser',async (req,res)=>{
//     let fakeuser = new User({
//         email : "user1234@gmail.com",
//         username : "user1234"
//     });

//     let registeredUser = await User.register(fakeuser , "password123");
//     res.send(registeredUser)
// })

router.get('/signup', UserController.RenderSignupForm)

router.post('/signup',UserController.SignUpRequest)

router.get('/login',UserController.LoginForm)

router.post(
    '/login',
    saveRedirectUrl, // Middleware to save redirect URL
    passport.authenticate('local', {
        failureRedirect: '/login', // Redirect to login page on failure
        failureMessage: 'true',
        failureFlash: 'Invalid credentials!'
    }),
    UserController.LoginReq
);

  

router.get('/logout',UserController.Logout)

module.exports = router;

