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
        url : {type : String},
        filename : {type : String}
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
    cordinate: {
        longitude : { 
            type : Number, 
        },
        latitude : {
            type : Number,
        }
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