const User = require('../Models/user_schema.js')

module.exports.RenderSignupForm = async (req,res)=>{
    res.render('User/signup.ejs',{title : "Sign Up"});
}

module.exports.SignUpRequest = async (req,res)=>{
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
}

module.exports.LoginForm = async(req,res)=>{
    let credentialError = null;
    if(req.session.flash.error)
    {
        credentialError = req.session.flash.error;
        req.session.flash = null; 
    }
    res.render('User/login.ejs',{title : "Login", error : credentialError});
}

module.exports.LoginReq = async (req, res) => {
    // Login successful
    req.flash('success', 'Welcome back to Airbnb!');
    const redirectUrl = req.session.redirectUrl || '/listings';
    delete req.session.redirectUrl; // Clean up session
    res.redirect(redirectUrl);
}

module.exports.Logout = async(req,res,next)=>{
    req.logout((err)=>{
        if(err)
        {
            return next(err);
        }

    // console.log(req)
    req.flash("success","logout successfully !")
    res.redirect('/listings');
})
}