const mongoose = require('mongoose');
const User = require('./user_schema');

const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        // required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    comment: {
        type: String,
        // required: true
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;