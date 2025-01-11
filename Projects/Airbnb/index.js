
const express = require('express');
const mongoose = require('mongoose');
const Listing = require('./Models/listing_schema'); // Import the schema
const path = require('path');
const methodOverride = require('method-override');

// Your server code here
const app = express();

// Replace with your MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/Airbnb';
// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
// override with POST having ?_method=DELETE . Middleware to override the method based on query parameter because HTML forms do not support PUT, PATCH, or DELETE requests on server side.
app.use(methodOverride('_method'));
// Set the view engine to ejs
app.set('view engine', 'ejs');
// Set the directory for ejs files
app.set('views', path.join(__dirname, 'views'));



app.get('/', (req, res) => {
    res.render('listings/home.ejs');
});

// Index Route
app.get('/listings', async (req, res) => {
    const alllistings = await Listing.find();
    res.render('listings/index.ejs', { alllistings });    
});

// New Route
app.get('/listings/new/', async (req, res) => {
    res.render('listings/new.ejs');
});

// Show Route
app.get('/listings/:id', async (req, res) => {
    const {id} = req.params;
    const listingItem = await Listing.findById(id);
    res.render('listings/show.ejs',{listing :listingItem});
    // res.send('This is the listing with id: ' + id);
});

// Create new listing
app.post('/listings', async (req, res) => {
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect(`/listings/${newListing._id}`);
});

// edit route
app.get('/listings/:id/edit', async (req, res) => {
    const {id} = req.params;
    const listingItem = await Listing.findById(id);
    res.render('listings/edit.ejs',{listing :listingItem});
});


// Update route
app.put('/listings/:id', async (req, res) => {
const {id} = req.params;
console.log(req.body);
const listingItem = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true, runValidators: true });
res.render('listings/show.ejs',{listing :listingItem});
});

// Delete route
app.delete('/listings/:id', async(req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});