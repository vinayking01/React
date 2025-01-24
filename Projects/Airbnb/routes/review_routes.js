const express = require('express');
const router = express.Router( {mergeParams: true} ); // mergeParams: true is used to merge the params from the parent router with the child router. This is useful when you want to access the parent router's params in the child router. 
const reviews = require('../Models/review_schema'); // Importing the review schema
const Listing = require('../Models/listing_schema');
const {IsLoggedIn , isAuthor} = require('../Middlewares/authentication')

// Review handling

router.post('/', IsLoggedIn, async (req, res, next) => {
    try{
        const {id} = req.params;
        const listing = await Listing.findById(id);
        const review = new reviews(req.body);
        review.author = req.user._id;
        console.log("my author ",review.author);
        listing.reviews.push(review);
        await review.save();
        await listing.save();
        req.flash('success' , "Your Review added")
        res.redirect('/listings/'+id);
    }
    catch(err)
    {
        next(err);
    }
});

// Review delete route
router.delete('/:reviewId',IsLoggedIn, isAuthor, async (req, res, next) => {
    try{
        const {id,reviewId} = req.params;
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // pull operator of mongoose removes all the elements from the array that match the specified condition.
        await reviews.findByIdAndDelete(reviewId); // deleting the review from the review 
        req.flash('success' , "Your Review deleted")
        res.redirect('/listings/'+id);
    }
    catch(err)
    {
        next(err);
    }
});

module.exports = router;