import Image from  '../models/image.models.js';
import cloudinary from '../utils/cloudinary.js';
import axios from 'axios';
//add profile image
export const uploadImageToCloudinary = async (image, empid) => {
    const imagename =  image.originalname;
   // console.log(filename);
  if (!image || !empid) {
    throw new Error('Invalid parameters');
  }
  try {
   // console.log(`Uploading file for empid: ${empid}`);
    const uploadResult = await cloudinary.uploader.upload(image.path, {
      tags: [`empid_${empid}`], // Add empid tag
    });
     
   console.log('Upload result:', uploadResult);
    
    const newImage = new Image({
        path: uploadResult.secure_url,
        filename : imagename ,
        empid: empid,
        public_id: uploadResult.public_id,
        uploadedAt: new Date(),
      });
   await newImage.save();
    // return {
    //   imageUrl: uploadResult.secure_url,
    //   public_id: uploadResult.public_id
    // };

    return newImage
  
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
  };
  export const getImageFromCloudinary = async (imageUrl) => {
    try {
      // Fetch the image from Cloudinary
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
  
      // Optional: Process the image if needed (e.g., resize or change format)
      // const processedImage = await sharp(response.data).resize(200).toBuffer();
  
      // Return the image data
      return response.data;
    } catch (error) {
      console.error('Error fetching image from Cloudinary:', error);
      throw new Error('Failed to fetch image');
    }
  };
  
  // export const deleteImageFromCloudinary = async (public_id) => {
  //   try {
  //     const result = await cloudinary.uploader.destroy(public_id);
  //     if (result.result !== 'ok') {
  //       throw new Error('Failed to delete image from Cloudinary');
  //     }
  //   } catch (error) {
  //     console.error('Error deleting image from Cloudinary:', error);
  //     throw new Error('Failed to delete image');
  //   }
  // };

  //const cloudinary = require('cloudinary').v2;
//const Image = require('./imageModel');

// Helper function to extract public ID from URL
const extractPublicIdFromUrl = (url) => {
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1];
  const [publicId] = lastPart.split('.');
  return publicId;
};

// Delete image from Cloudinary and the database using the image URL
export const deleteImageFromCloudinary = async (imageUrl) => {
  try {
    const publicId = extractPublicIdFromUrl(imageUrl);
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== 'ok') {
      throw new Error('Failed to delete image from Cloudinary');
    }
    await Image.findOneAndDelete({ path: imageUrl });
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    throw new Error('Failed to delete image');
  }
};

  
  // export const deleteImageFromDatabase = async (empId) => {
  //   try {
  //     //const deletedImage = await Image.findByempIdAndDelete(empId);
  //     const deletedImage = await Image.findOneAndDelete({ empid: empId });
  //     console.log(deletedImage);
  //     if (deletedImage) {
  //       throw new Error('Image not found in the database');
  //     }
  //     return deletedImage;
  //   } catch (error) {
  //     console.error('Error deleting image from database:', error);
  //     throw new Error('Failed to delete image');
  //   }
  // };
  export const deleteImageFromDatabase = async (empId) => {
    try {
      const deletedImage = await Image.findOneAndDelete({ empid: empId });
      console.log(deletedImage);
  
      // if (deletedImage) {
      //   throw new Error('Image not found in the database');
      // }
  
      return deletedImage;
    } catch (error) {
      console.error('Error deleting image from database:', error);
      throw new Error('Failed to delete image');
    }
  };

  