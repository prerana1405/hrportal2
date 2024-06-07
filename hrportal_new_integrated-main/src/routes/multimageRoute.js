import upload from '../middleware/multer.middleware.js';
import express from 'express';

//import {fetchRecentImages,uploadImage} from '../controllers/multimageController.js';
 import {uploadImages} from '../controllers/multimageController.js';
const router = express.Router();
router.post('/multimages', upload.single('image'), uploadImages);//upload& fetch
//router.get('/', fetchImage);//fetch
// router.delete('/', deleteImage);
export default router;