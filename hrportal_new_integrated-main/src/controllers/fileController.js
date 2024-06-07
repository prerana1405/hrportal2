import { uploadFileToCloudinary, getFilesFromCloudinary , deleteFileFromCloudinary, deleteFileFromDatabase} from '../service/fileService.js';
//import { deleteFileFromCloudinary, deleteFileFromDatabase } from '../services/fileService';

export const uploadFile = async (req, res) => {
  const { empid } = req.body;
  

  try {
    const file = req.file;
    console.log(file.originalname);
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const uploadResult = await uploadFileToCloudinary(file, empid);
    console.log(uploadResult);
    res.status(201).json({ message: 'File uploaded successfully', file: uploadResult });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Failed to upload file', error });
  }
};
export const getFilesByEmpId = async (req, res) => {
  const { empid } = req.params;

  try {
    const files = await getFilesFromCloudinary(empid);
    res.status(200).json({ files });
  } catch (error) {
    console.error('Error retrieving files:', error);
    res.status(500).json({ message: 'Failed to retrieve files', error });
  }
};


export const deleteFile = async (req, res) => {
  const {  empId,  fileUrl } = req.query;
// console.log(empId,+" "+public_id);
  if (!empId || !fileUrl) {
    return res.status(400).json({ message: 'file ID and public ID are required' });
  }

  try {
    // Delete the image from Cloudinary
    await deleteFileFromCloudinary(fileUrl);

    // Delete the image from the database
    await deleteFileFromDatabase (empId);

    res.status(200).json({ message: 'file deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Failed to delete file', error: error.message });
  }
};