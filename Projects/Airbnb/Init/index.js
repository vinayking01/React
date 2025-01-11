const express = require('express');
const mongoose = require('mongoose');
const sampleData = require('./sampledata');
const Listing = require('../Models/listing_schema');

const app = express();
const port = 3000;

// Replace with your MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/Airbnb';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const initdata = async () => {
    try {
        await Listing.deleteMany({});
        await Listing.insertMany(sampleData);
        console.log('Sample data added!');
    } catch (err) {
        console.log(err);
    }
}

initdata();