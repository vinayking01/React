const Listing = require('../Models/listing_schema');
const review = require('../Models/review_schema');

module.exports.IsLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated())   // req.isAuthenticated() is a method provided by Passport.js. and this should run only once when user is trying to access without login anywhere in the website.
        {
            req.session.redirectUrl = req.originalUrl; // created a 'reDirectUrl' variable in sessions. &  Save the original URL user was trying to access 
            // This allows you to redirect them back to this URL after they log in. By memoization .
            // console.log(req.originalUrl)   
        req.flash('failure',"User must be logged in ")
        return res.redirect('/login');
    }
    next();
}

module.exports.saveRedirectUrl =(req,res,next)=>{
    // console.log(req.session.redirectUrl);
    
    if(req.session.redirectUrl)
    {
        res.locals.redirectUrl = req.session.redirectUrl;  // this is extra we are doing for storing the pre-visited link before login because in session when it resets then your created variables get deleted
    }
    next();
}

module.exports.isOwner = async (req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    // console.log(listing,"and",listing.owner,"here",res.locals.currentUser._id);
    if(!listing.owner.equals(res.locals.currentUser._id))
    {
        req.flash('failure','You do not have permission to edit because you are not the owner');
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isAuthor = async(req,res,next)=>{
    let {id,reviewId} = req.params;
    let Review = await review.findById(reviewId);
    if(!Review.author.equals(res.locals.currentUser._id))
    {
        req.flash('failure' , "you are not author of this review")
        return (res.redirect(`/listings/${id}`))
    }
    next()

}