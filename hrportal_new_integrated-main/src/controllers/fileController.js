import { uploadFileToCloudinary, getFilesFromCloudinary } from '../service/fileService.js';
import File from '../models/file.models.js';

export const uploadFile = async (req, res) => {
  const { empid } = req.body;

  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const uploadResult = await uploadFileToCloudinary(file, empid);

    const newFile = new File({
      path: uploadResult.secure_url,
      empid: empid,
      public_id: uploadResult.public_id,
      uploadedAt: new Date(),
    });

    await newFile.save();

    res.status(201).json({ message: 'File uploaded successfully', file: newFile });
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
