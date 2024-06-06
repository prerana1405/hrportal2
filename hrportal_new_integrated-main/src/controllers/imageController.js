
import {uploadImageToCloudinary,getImageFromCloudinary} from '../service/imageService.js';
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
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: 'Failed to upload image', error });
    }
  };

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

  export const fetchImage = async (req, res) => {
    const { publicId } = req.params;
    try {
      const imageBuffer = await getImageFromCloudinary(publicId);
  
      // Determine content type dynamically based on file extension
      const ext = publicId.split('.').pop();
      const contentType = ext === 'png' ? 'image/png' : 'image/jpeg'; // Adjust as needed for other formats
  
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': imageBuffer.length,
      });
      res.end(imageBuffer);
    } catch (error) {
      console.error('Error fetching image:', error);
      res.status(500).json({ message: 'Failed to fetch image', error });
    }
  };
