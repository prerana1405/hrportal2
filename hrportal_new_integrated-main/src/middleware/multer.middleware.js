import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'public-uploads', // Optional: specify a folder name in Cloudinary
    resource_type: 'raw',
    format: 'pdf', // Specify the file format as 'pdf'
    public_id: (req, file) => `pdf_${Date.now()}_${file.originalname.replace(/\.[^/.]+$/, "")}`, // Generate a unique public ID for each file
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
});

export default upload;
