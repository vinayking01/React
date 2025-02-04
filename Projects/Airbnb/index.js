
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate')
const listings_routes = require('./routes/listing_routes');
const reviews_routes = require('./routes/review_routes');
const user_routes = require('./routes/user_routes')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash  = require('connect-flash')
const passport = require('passport');
const LocalStrategy  = require('passport-local');
const User = require('./Models/user_schema')
require('dotenv').config();

// Your server code here
const app = express();

// Replace with your MongoDB connection string
// const mongoURI = 'mongodb://localhost:27017/Airbnb';
const DataBaseURL = process.env.ATLAS_DB_URL;

// Connect to MongoDB
mongoose.connect(DataBaseURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));


app.use(express.static(path.join(__dirname, 'Public'))); // Serve the public folder as static files
// Middleware
app.use(express.urlencoded({ extended: true }));
// method override with POST having ?_method=DELETE . Middleware to override the method based on query parameter because HTML forms do not support PUT, PATCH, or DELETE requests on server side.
app.use(methodOverride('_method'));
// Set the view engine to ejs
app.set('view engine', 'ejs');
// Set the directory for ejs files
app.set('views', path.join(__dirname, 'views'));
// use ejs-locals for all ejs templates:
app.engine('ejs', ejsMate);

const Store = MongoStore.create({
  mongoUrl: DataBaseURL,
  crypto: {
    secret: process.env.SESSION_SECRET || "defaultsecret",
  },
  touchAfter: 24 * 60 * 60, // 1 day
});

const SessionDetails = {  
  store: Store,          
  secret: process.env.SESSION_SECRET || "defaultsecret", // Use an environment variable or a default value
  resave: false,             
  saveUninitialized: true,   
  cookie: {
    maxAge: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
  },
};


// session middleware
// app.use(session(SessionDetails)); // express session is not good for production instead of this we use some other store like mongo etc.

Store.on("error",()=>{
    console.log("Error in mongo session",err);
})

app.use(session(SessionDetails));


app.use(passport.initialize())  // a middleware to initialize the passport
app.use(passport.session());//
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash middleware
app.use(flash())  
app.use((req,res,next)=>{     
    res.locals.success = req.flash("success"); // this way we provided the success variable to the every template instead of passing in templates like ejs.
    res.locals.failure = req.flash("failure");
    res.locals.currentUser = req.user || null; // store the users whose session is currently logged in
    next();
})

app.get('/',(req,res) =>{
    res.redirect('/listings');
})

// Listing handling
app.use('/listings',listings_routes);

// Review handling
app.use('/listings/:id/reviews',reviews_routes);

// User authentication handling
app.use('/',user_routes);

// handling custom error and replacing by default middleware added automatically by express
app.use((err, req, res, next) => {      
    res.status(err.status || 500);      
    res.render('listings/error.ejs', { error: err });   
});  


app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});