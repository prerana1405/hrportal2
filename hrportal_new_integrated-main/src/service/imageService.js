import Image from  '../models/image.models.js';
import cloudinary from '../utils/cloudinary.js';
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
    // const newImage = new Image({
    //   public_id:uploadResult.public_id,
    //   url:uploadResult.secure_url,
    //   imagename:imagenames ,
    //   imageData:uploadResult.Buffer,
    // });
    // await newImage.save();
    return newImage;
  
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
  };
  
  // export const getImageFromCloudinary = async (public_id) => {
  //   try {
  //     console.log(`Fetching image with public_id: ${public_id}`);
  
  //     const result = await cloudinary.api.resource(public_id);
  //     if(!result){
  //       throw new Error('Image not found');
  //     }
  //     console.log('Fetch result:', result);
      
  //     return result;
  //   } catch (error) {
  //     console.error('Error retrieving image from Cloudinary:', error);
  //     throw new Error('Failed to retrieve image');
  //   }
  // };
  import axios from 'axios';
  export const getImageFromCloudinary = async (publicId) => {
    try {
      const imageUrl = cloudinary.url(publicId, { secure: true });
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      return Buffer.from(response.data, 'binary');
    } catch (error) {
      console.error('Error fetching image from Cloudinary:', error);
      throw new Error('Failed to fetch image');
    }
  };