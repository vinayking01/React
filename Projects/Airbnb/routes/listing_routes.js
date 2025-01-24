const express = require('express');
const router = express.Router();
const {IsLoggedIn , isOwner} = require('../Middlewares/authentication')
const ListingController = require('../Controllers/listingController');

// Index Route
// render 'index' into 'boilerplate':
router.get('/',ListingController.Index );

// New Route
router.get('/new', IsLoggedIn, ListingController.RenderNewListForm);

// Show Item 
router.get('/:id', ListingController.RenderListItem);

// Create new listing
router.post('/', IsLoggedIn, ListingController.CreateList);

// Edit Listings route
router.get('/:id/edit', IsLoggedIn, isOwner, ListingController.RenderEditListForm);

// Update route of listing
router.put('/:id',IsLoggedIn, isOwner, ListingController.UpdateList);

// Delete route of listing
router.delete('/:id', IsLoggedIn, isOwner, ListingController.DeleteListing);

module.exports = router;