require('dotenv').config();
const s3 = require('../config/s3');

const { PutObjectCommand, DeleteObjectCommand  } = require('@aws-sdk/client-s3');

async function uploadImage(file, folderName) {
  
  const key = `${folderName}/${Date.now()}-${file.originalname.replace(/\s+/g, '')}`;

  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key, // e.g., 'images/my-image.jpg'
    Body: file.buffer,
    ContentType: file.mimetype, // Adjust based on your image type
  };

  try {

    await s3.send(new PutObjectCommand(uploadParams));
    let imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    return imageUrl;

  } catch (err) {
    return err;
  }
}

async function deleteImage(key) {

    const deleteParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
    };

    try {

      let data = await s3.send(new DeleteObjectCommand(deleteParams));
      return data

    } catch (err) {

      return err

    }

}


module.exports = { uploadImage, deleteImage };