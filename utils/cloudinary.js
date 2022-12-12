import dotenv from "dotenv";
import cloudinaryModule from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary'
dotenv.config();

const cloudinary = cloudinaryModule.v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,

})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'onlineBooking',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});


export { cloudinary, storage }; 