// utils file call cloudinary.js 
import { v2 as cloudinary }  from "cloudinary";
// import { cloud_api, cloud_name, cloud_secret } from "../config/config.js";

cloudinary.config({
    cloud_name: 'codewithmoha',
    api_key: '265961574972223',
    api_secret: '56KKVODbrT27n9ly2YqKFKTCkn8',
  });

 export const cloudinaryUploadImage = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file,{
            resource_type: "auto",
        });

        return {
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
        };
    } catch (error) {
        throw new Error(`Cloudinary upload Error: ${error.message}`);
    }
 };


 export const cloudinaryDeleteImage = async (file) => {
    try {
        const result = await cloudinary.uploader.destroy(file, {
            resource_type: "image",
        });

        return {
            result,
        }
    } catch (error) {
        throw new Error(`Cloudinary Deletion Error: ${error.message}`);
    }
 }