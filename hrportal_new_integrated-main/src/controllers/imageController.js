
//import {uploadImageToCloudinary,getImageFromCloudinary} from '../service/imageService.js';
import {uploadImageToCloudinary} from '../service/imageService.js';
export const uploadImage = async (req, res) => {
    const { empid } = req.body;
    try {
      const image= req.file
     console.log(image);
      if (!image) {
        return res.status(400).json({ message: 'No image uploaded' });
      }
  
      const uploadResult = await uploadImageToCloudinary(image, empid);
      console.log(uploadResult);
      res.status(201).json({ message: 'Image uploaded successfully', image: uploadResult });
      //const imageData = await getImageFromCloudinary(uploadResult.imageUrl);
      // console.log(imageData);
      // res.set('Content-Type', 'image/jpeg'); // Adjust content type as needed
      // res.send(imageData);
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: 'Failed to upload image', error });
    }
  };


// export const fetchImage = async (req, res) => {
//     const { imageUrl } = req.query; // Expecting imageUrl as a query parameter
  
//     if (!imageUrl) {
//       return res.status(400).json({ message: 'imageUrl query parameter is required' });
//     }
  
//     try {
//       const imageData = await getImageFromCloudinary(imageUrl);
  
//       res.set('Content-Type', 'image/jpeg'); // Adjust content type as needed
//       res.send(imageData);
//     } catch (error) {
//       res.status(500).json({ message: 'Failed to fetch image', error: error.message });
//     }
//   };
  import { deleteImageFromCloudinary, deleteImageFromDatabase } from '../service/imageService.js';

  export const deleteImage = async (req, res) => {
    const {  empId,  imageUrl } = req.query;
  // console.log(empId,+" "+public_id);
    if (!empId || !imageUrl) {
      return res.status(400).json({ message: 'Image ID and public ID are required' });
    }
  
    try {
      // Delete the image from Cloudinary
      await deleteImageFromCloudinary( imageUrl);
  
      // Delete the image from the database
      await deleteImageFromDatabase(empId);
  
      res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      console.error('Error deleting image:', error);
      res.status(500).json({ message: 'Failed to delete image', error: error.message });
    }
  };
  
  export const updateImage = async (req, res) => {
    const { empid, oldImageUrl } = req.body;
    const newImage = req.file;
  
    if (!newImage || !empid || !oldImageUrl) {
      return res.status(400).json({ message: 'Missing parameters' });
    }
  
    try {
      // Extract the public ID from the old image URL
      const publicId = oldImageUrl.split('/').pop().split('.')[0];
  
      // Delete the old image from Cloudinary
      await deleteImageFromCloudinary(publicId);
  
      // Delete the old image record from the database
      await deleteImageFromDatabase(empid);
  
      // Upload the new image to Cloudinary
      const uploadResult = await uploadImageToCloudinary(newImage, empid);
  
      res.status(200).json({ message: 'Image updated successfully', image: uploadResult });
    } catch (error) {
      console.error('Error updating image:', error);
      res.status(500).json({ message: 'Failed to update image', error: error.message });
    }
  };