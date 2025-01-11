const mongoose = require('mongoose');

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
    }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;