import express from 'express';
import upload from '../middleware/multer.middleware.js';
import {uploadFile, getFilesByEmpId,deleteFile } from '../controllers/fileController.js';

const router = express.Router();
//upload docs
router.post('/upload', upload.single('file'), uploadFile);
router.get('/:empid', getFilesByEmpId);
router.delete('/', deleteFile);
//profile image
// router.post('/profile-image', upload.single('image'), uploadImage);
// router.get('/image/:public_id', getImage);
export default router;