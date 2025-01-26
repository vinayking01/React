const express = require('express');
const router = express.Router();
const {IsLoggedIn , isOwner} = require('../Middlewares/authentication')
const ListingController = require('../Controllers/listingController');
const multer  = require('multer')
const {storage,cloudinary } = require('../CloudConfig');
const upload = multer({storage})

// const upload = multer({ dest: 'uploads/' }) // IN THIS LINE WE CAN SET THE DESTINATION OF FILE UPLOADED WHERE TO BE SAVED LIKE IN SYSTEM OR CLOUD 

// Index Route
// render 'index' into 'boilerplate':
router.get('/',ListingController.Index );

// New Route
router.get('/new', IsLoggedIn, ListingController.RenderNewListForm);

// Show Item 
router.get('/:id', ListingController.RenderListItem);

// Create new listing
router.post('/', IsLoggedIn, upload.single('image'), ListingController.CreateList);

// Edit Listings route
router.get('/:id/edit', IsLoggedIn, isOwner, ListingController.RenderEditListForm);

// Update route of listing
router.put('/:id',IsLoggedIn, isOwner,upload.single('image'), ListingController.UpdateList);

// Delete route of listing
router.delete('/:id', IsLoggedIn, isOwner, ListingController.DeleteListing);

module.exports = router;