import cloudinary from "cloudinary";
import { cloud_api, cloud_name, cloud_secret } from "../config/config.js";

cloudinary.config({
    cloud_name: 'codewithmoha',
    api_key: '265961574972223',
    api_secret: '56KKVODbrT27n9ly2YqKFKTCkn8',
  });

 export const cloudinaryUploadImage = async (fileToUploud) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(fileToUploud, (result) => {
            resolve({
                url: result.secure_url,
                asset_id:result.asset_id,
                public_id:result.public_id,
                
            },{
                resource_type:"auto"
            })
        }) 
    })
}

export const cloudinaryDeleteImage = async (fileToDelete) => {
    return new Promise((resolve) => {
        cloudinary.uploader.destroy(fileToDelete, (result) => {
            resolve({
                url: result.secure_url,
                asset_id:result.asset_id,
                public_id:result.public_id,
                
            },{
                resource_type:"auto"
            })
        }) 
    })
}