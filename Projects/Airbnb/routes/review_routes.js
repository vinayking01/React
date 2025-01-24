const express = require('express');
const router = express.Router( {mergeParams: true} ); // mergeParams: true is used to merge the params from the parent router with the child router. This is useful when you want to access the parent router's params in the child router. 
const ReviewController = require('../Controllers/reviewController');
const {IsLoggedIn , isAuthor} = require('../Middlewares/authentication')

// Review handling

router.post('/', IsLoggedIn, ReviewController.NewReview);

// Review delete route
router.delete('/:reviewId',IsLoggedIn, isAuthor, ReviewController.DestroyReview);

module.exports = router;