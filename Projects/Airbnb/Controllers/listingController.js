const Listing = require('../Models/listing_schema')
const Review = require('../Models/review_schema')


module.exports.Index = async (req,res,next) => {
    try{
        const alllistings = await Listing.find();
        res.render('listings/index.ejs', { alllistings, title:'Airbnb : Home' }); 
    }
    catch(err)
    {
        next(err)    // The next() function in Express is used to pass control to the next middleware in the stack. When you call next(err) in a route's catch block, Express identifies this as an error and skips all normal middleware functions, jumping directly to the error-handling middleware.
    } 
       
};

module.exports.RenderNewListForm = async (req, res) => {
    // console.log(req.user)
    res.render('listings/new.ejs',{title : 'Airbnb : New Listing'});
}

module.exports.RenderListItem = async (req, res,next) => {
  try {
  const {id} = req.params;
  const listingItem = await Listing.findById(id).populate({ path : 'reviews', populate : { path : 'author'},}).populate('owner'); // nested population of values
  res.render('listings/show.ejs',{listing :listingItem , title : `Airbnb : ${listingItem.title}`});
  }
  catch(err)
  {
      next(err)
  }
  // res.send('This is the listing with id: ' + id);
}

module.exports.CreateList = async (req, res, next) => {
  try {
      const newListing = new Listing(req.body);
      newListing.owner = req.user._id;
      await newListing.save();
      console.log(newListing);
      req.flash('success' , "Listing created successfully")
      res.redirect(`/listings/${newListing._id}`);
  } catch (err) {
      next(err);
  }
}

module.exports.RenderEditListForm = async (req, res, next) => {
  try {
      const { id } = req.params;
      const listingItem = await Listing.findById(id);
      if (!listingItem) throw new Error('Listing not found');
      req.flash('success' , "Listing details updated successfully")
      res.render('listings/edit.ejs', { listing: listingItem, title: `Airbnb: Edit ${listingItem.title}` });
  } catch (err) {
      next(err);
  }
}

module.exports.UpdateList = async (req, res, next) => {
  try {
      const { id } = req.params;
      let listingItem = await Listing.findByIdAndUpdate(id, req.body.listing, { new: true, runValidators: true }).populate({ path : 'reviews', populate : { path : 'author'},}).populate('owner'); // nested population of values
      if (!listingItem) throw new Error('Listing not found');
      res.render('listings/show.ejs', { listing: listingItem, title: `Airbnb: ${listingItem.title}` });
  } catch (err) {
      next(err);
  }
}

module.exports.DeleteListing = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedListing = await Listing.findByIdAndDelete(id);
        if (!deletedListing) throw new Error('Listing not found');
        req.flash('success' , "Listing deleted successfully")
        res.redirect('/listings');
    } catch (err) {
        next(err);
    }
  }