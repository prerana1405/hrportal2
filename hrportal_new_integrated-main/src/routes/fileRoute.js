import express from 'express';
import upload from '../middleware/multer.middleware.js';
import { uploadFile, getFilesByEmpId } from '../controllers/fileController.js';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadFile);
router.get('/:empid', getFilesByEmpId);

export default router;
