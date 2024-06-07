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


const extractPublicIdFromUrl = (url) => {
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1];
  const [publicId] = lastPart.split('.');
  return publicId;
};

// Delete file from Cloudinary and the database using the fileURL
export const deleteFileFromCloudinary = async (fileUrl) => {
  try {
    const publicId = extractPublicIdFromUrl(fileUrl);
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== 'ok') {
      throw new Error('Failed to delete File from Cloudinary');
    }
    await File.findOneAndDelete({ path: fileUrl });
  } catch (error) {
    console.error('Error deleting File from Cloudinary:', error);
    throw new Error('Failed to delete file');
  }
};
export const deleteFileFromDatabase= async (empId) => {
  try {
    const deletedImage = await File.findOneAndDelete({ empid: empId });
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