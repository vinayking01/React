const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME.trim(),
    api_key: process.env.CLOUD_API_KEY.trim(),
    api_secret: process.env.CLOUD_API_SECRET.trim(),
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Airbnb_dev',
    allowedFormats: ['png','png','jpeg'] // supports promises as well
},
});

module.exports = {
    cloudinary,
    storage,
}
