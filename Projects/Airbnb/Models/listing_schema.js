const mongoose = require('mongoose');
const reviews = require('./review_schema');
const User = require('./user_schema');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        set: function(value) {
            return value },
        default: 'https://unsplash.com/photos/a-tree-that-is-standing-in-the-water-rOkiM1oHs3Q' // Default value
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    owner :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
});

listingSchema.post('findOneAndDelete', async function (listing) {
    if(listing)
    {
        await reviews.deleteMany({_id : {$in : listing.reviews}});
        console.log(listing);
        console.log("Deleted reviews");
    }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;