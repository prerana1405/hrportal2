import cloudinary from '../utils/cloudinary.js';
import File from '../models/file.models.js';

export const uploadFileToCloudinary = async (file, empid) => {
    const filename =  file.originalname;
    console.log(filename);
  if (!file || !empid) {
    throw new Error('Invalid parameters');
  }
  try {
   // console.log(`Uploading file for empid: ${empid}`);
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      tags: [`empid_${empid}`], // Add empid tag
    });
     
   // console.log('Upload result:', uploadResult);
    
    const newFile = new File({
        path: uploadResult.secure_url,
        filename : filename,
        empid: empid,
        public_id: uploadResult.public_id,
        uploadedAt: new Date(),
      });
    await newFile.save();
    return newFile;

  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    throw new Error('Failed to upload file');
  }
};

export const getFilesFromCloudinary = async (empid) => {
  try {
    console.log(`Fetching files for empid: ${empid}`);
    const resources = await cloudinary.search
      .expression(`tags:empid_${empid}`)
      .execute();

    console.log('Fetched resources:', resources);
    return resources.resources;
  } catch (error) {
    console.error('Error retrieving files from Cloudinary:', error);
    throw new Error('Failed to retrieve files');
  }
};

// //add profile image
// export const uploadImageToCloudinary = async (image, empid) => {
//   const imagename =  image.originalname;
//  // console.log(filename);
// if (!image || !empid) {
//   throw new Error('Invalid parameters');
// }
// try {
//  // console.log(`Uploading file for empid: ${empid}`);
//   const uploadResult = await cloudinary.uploader.upload(image.path, {
//     tags: [`empid_${empid}`], // Add empid tag
//   });
   
//  // console.log('Upload result:', uploadResult);
  
//   const newImage = new File({
//       path: uploadResult.secure_url,
//       filename : imagename ,
//       empid: empid,
//       public_id: uploadResult.public_id,
//       uploadedAt: new Date(),
//     });
//   await newImage.save();
//   return newImage;

// } catch (error) {
//   console.error('Error uploading image to Cloudinary:', error);
//   throw new Error('Failed to upload image');
// }
// };

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