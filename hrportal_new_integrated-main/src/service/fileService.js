import cloudinary from '../utils/cloudinary.js';

export const uploadFileToCloudinary = async (file, empid) => {
  if (!file || !empid) {
    throw new Error('Invalid parameters');
  }

  try {
    console.log(`Uploading file for empid: ${empid}`);
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      tags: [`empid_${empid}`], // Add empid tag
    });

    console.log('Upload result:', uploadResult);
    return uploadResult;
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
