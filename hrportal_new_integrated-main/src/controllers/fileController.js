import { uploadFileToCloudinary, getFilesFromCloudinary } from '../service/fileService.js';
//import { getImageFromCloudinary } from '../service/fileService.js';

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
//uploadImage
// export const uploadImage = async (req, res) => {
//   const { empid } = req.body;
//   try {
//     const image= req.file
//    //console.log(image.filename);
//     if (!image) {
//       return res.status(400).json({ message: 'No image uploaded' });
//     }

//     const uploadResult = await uploadFileToCloudinary(image, empid);
//     console.log(uploadResult);
//     res.status(201).json({ message: 'Image uploaded successfully', image: uploadResult });
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     res.status(500).json({ message: 'Failed to upload image', error });
//   }
// };


// export const getImage = async (req, res) => {
//   const { public_id } = req.params;

//   try {
//     const imageData = await getImageFromCloudinary(public_id);
//     res.status(200).send(imageData);
//   } catch (error) {
//     console.error('Error retrieving image:', error);
//     res.status(500).json({ message: 'Failed to retrieve image', error });
//   }
// };