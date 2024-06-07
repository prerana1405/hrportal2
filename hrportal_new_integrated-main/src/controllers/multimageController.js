// const { uploadImageToCloudinary, getRecentImagesFromCloudinary} = require('./imageService');
import {uploadImageToCloudinary,getRecentImagesFromCloudinary} from '../service/multiImageService.js';
// Upload image and return recent 6 images
export const uploadImages = async (req, res) => {
  const { empid } = req.body;
  try {
    const image = req.file;
    if (!image) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    await uploadImageToCloudinary(image, empid);
    const recentImages = await getRecentImagesFromCloudinary(empid);

    res.status(201).json({ message: 'Image uploaded successfully', recentImages });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Failed to upload image', error });
  }
};

// Fetch recent images
export const fetchRecentImages = async (req, res) => {
  const { empid } = req.query;
  try {
    const recentImages = await getRecentImagesFromCloudinary(empid);
    res.status(200).json({ recentImages });
  } catch (error) {
    console.error('Error fetching recent images:', error);
    res.status(500).json({ message: 'Failed to fetch recent images', error });
  }
};

// // Delete image
// export const deleteImage = async (req, res) => {
//   const { public_id } = req.body;
//   try {
//     await deleteImageFromCloudinary(public_id);
//     res.status(200).json({ message: 'Image deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting image:', error);
//     res.status(500).json({ message: 'Failed to delete image', error });
//   }
// };
