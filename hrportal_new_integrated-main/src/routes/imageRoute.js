import upload from '../middleware/multer.middleware.js';
import express from 'express';

import {updateImage,uploadImage,deleteImage} from '../controllers/imageController.js';

const router = express.Router();
router.post('/profile-image', upload.single('image'), uploadImage);//upload& fetch
//router.get('/', fetchImage);//fetch
router.delete('/', deleteImage);
router.put('/update', upload.single('image'), updateImage);
export default router;