const Listing = require('../Models/listing_schema')
const Review = require('../Models/review_schema')
const axios = require('axios');


require('dotenv').config();

module.exports.Index = async (req, res, next) => {
  try {
    const alllistings = await Listing.find();
    res.render('listings/index.ejs', { alllistings, title: 'Airbnb : Home' });
    // res.render('listings/demo.ejs',{key : process.env.HERE_API_KEY,title:'Airbnb : Home'});
  }
  catch (err) {
    next(err)    // The next() function in Express is used to pass control to the next middleware in the stack. When you call next(err) in a route's catch block, Express identifies this as an error and skips all normal middleware functions, jumping directly to the error-handling middleware.
  }

};

module.exports.RenderNewListForm = async (req, res) => {
  // console.log(req.user)
  res.render('listings/new.ejs', { title: 'Airbnb : New Listing' });
}

module.exports.RenderListItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listingItem = await Listing.findById(id).populate({ path: 'reviews', populate: { path: 'author' }, }).populate('owner'); // nested population of values
    const centerY = listingItem.cordinate.longitude;
    const centerX = listingItem.cordinate.latitude;
    res.render('listings/show.ejs', { listing: listingItem, title: `Airbnb : ${listingItem.title}`, key: process.env.HERE_API_KEY.trim(), centerX, centerY });
  }
  catch (err) {
    next(err)
  }
  // res.send('This is the listing with id: ' + id);
}

module.exports.CreateList = async (req, res, next) => {
  try {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body);
    newListing.image.url = url;
    newListing.image.filename = filename;
    newListing.owner = req.user._id;

    // Ensure the listing has an address to geocode
    if (!newListing.location) {
      throw new Error('Listing does not have an address.');
    }
    // Construct the full address from the listing item
    const address = `${newListing.location}`;
    const Link = `https://geocode.search.hereapi.com/v1/geocode?q=location=${newListing.location}&country=${newListing.country}&apiKey=${process.env.HERE_API_KEY}`;
    // console.log(Link)
    // Geocode the address to get latitude and longitude
    await axios.get(Link).then(response => {
      // Check if the response contains items
      if (response.data.items && response.data.items.length > 0) {
        // Loop through the items (if needed)
        response.data.items.forEach(item => {
          // console.log("Item position:", item.position);

          // Extract longitude and latitude from the position object
          const long = item.position.lng;
          const lat = item.position.lat;

          // Update newListing with the coordinates
          newListing.cordinate = {
            longitude: long,
            latitude: lat
          };

          console.log(`Longitude: ${long}, Latitude: ${lat}`);
        });
      } else {
        console.log("No geocode results found for the provided location.");
      }
    })
      .catch(error => {
        console.error("Error during geocoding API call:", error.message);
      });
    // console.log(newListing)
    await newListing.save();
    //   console.log(newListing);
    req.flash('success' , "Listing created successfully")
    res.redirect(`/listings/${newListing._id}`);
    res.end("done")
  } catch (err) {
    next(err);
  }
}

module.exports.RenderEditListForm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const listingItem = await Listing.findById(id);
    if (!listingItem) throw new Error('Listing not found');
    let originalImageUrl = listingItem.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250")// customizing the cloudinary url to preview in compressing manner
    // console.log(originalImageUrl)
    req.flash('success', "Listing details updated successfully")
    res.render('listings/edit.ejs', { listing: listingItem, title: `Airbnb: Edit ${listingItem.title}`, originalImageUrl });
  } catch (err) {
    next(err);
  }
}

module.exports.UpdateList = async (req, res, next) => {
  try {
    const { id } = req.params;
    //   console.log("Our requested body ",req,"--------------------")
    let listingItem = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true, runValidators: true }).populate({ path: 'reviews', populate: { path: 'author' }, }).populate('owner'); // nested population of values
    if (typeof req.file !== "undefined") {
      listingItem.image.url = req.file.path;
      listingItem.image.filename = req.file.filename;
    }

    // Ensure the listing has an address to geocode
    if (!listingItem.location) {
      throw new Error('Listing does not have an address.');
    }
    const centerY = listingItem.cordinate.longitude;
    const centerX = listingItem.cordinate.latitude;
    // Construct the full address from the listing item
    const address = `${listingItem.location}`;

    // Geocode the address to get latitude and longitude
    const Link = `https://geocode.search.hereapi.com/v1/geocode?q=location=${listingItem.location}&country=${listingItem.country}&apiKey=${process.env.HERE_API_KEY}`;
    // console.log(Link)
    // Geocode the address to get latitude and longitude
    await axios.get(Link).then(response => {
      // Check if the response contains items
      if (response.data.items && response.data.items.length > 0) {
        // Loop through the items (if needed)
        response.data.items.forEach(item => {
          // console.log("Item position:", item.position);

          // Extract longitude and latitude from the position object
          const long = item.position.lng;
          const lat = item.position.lat;

          // Update newListing with the coordinates
          listingItem.cordinate = {
            longitude: long,
            latitude: lat
          };

          // console.log(`Longitude: ${long}, Latitude: ${lat}`);
        });
      } else {
        console.log("No geocode results found for the provided location.");
      }
    })
      .catch(error => {
        console.error("Error during geocoding API call:", error.message);
      });
    await listingItem.save();
    if (!listingItem) throw new Error('Listing not found');
    res.render('listings/show.ejs', { listing: listingItem, title: `Airbnb : ${listingItem.title}`, key: process.env.HERE_API_KEY.trim(), centerX, centerY });
    res.end()
  } catch (err) {
    next(err);
  }
}

module.exports.DeleteListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) throw new Error('Listing not found');
    req.flash('success', "Listing deleted successfully")
    res.redirect('/listings');
  } catch (err) {
    next(err);
  }
}