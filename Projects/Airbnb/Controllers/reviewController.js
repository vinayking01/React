const reviews = require('../Models/review_schema');
const Listing = require('../Models/listing_schema');


module.exports.NewReview = async (req, res, next) => {
    try{
        const {id} = req.params;
        const listing = await Listing.findById(id);
        const review = new reviews(req.body);
        console.log(review)
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
}


module.exports.DestroyReview = async (req, res, next) => {
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
}