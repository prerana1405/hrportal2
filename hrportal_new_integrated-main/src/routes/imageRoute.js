import upload from '../middleware/multer.middleware.js';
import express from 'express';
//import {getImage,uploadImage} from '../controllers/imageController.js';
import {fetchImage,uploadImage} from '../controllers/imageController.js';
const router = express.Router();
router.post('/profile-image', upload.single('image'), uploadImage);
router.get('/:public_id', fetchImage);

export default router;