
import Multimages from  '../models/multimage.models.js';
import cloudinary from '../utils/cloudinary.js';
import axios from 'axios';
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
    
    const newImage = new Multimages({
        path: uploadResult.secure_url,
        filename : imagename ,
        empid: empid,
        public_id: uploadResult.public_id,
        uploadedAt: new Date(),
      });
   await newImage.save();
    return {
      imageUrl: uploadResult.secure_url,
      public_id: uploadResult.public_id
    };
  
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
  };

  // Fetch recent 6 images from the database for a specific user
  export const getRecentImagesFromCloudinary = async (empid) => {
    if (!empid) {
      throw new Error('Invalid empid');
    }
    try {
      const recentImages = await Image.find({ empid }).sort({ uploadedAt: -1 }).limit(6);
      return recentImages.map(image => image.path);
    } catch (error) {
      console.error('Error fetching recent images from the database:', error);
      throw new Error('Failed to fetch recent images');
    }
  };
  