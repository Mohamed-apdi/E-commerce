import cloudinary from "cloudinary";
import { cloud_api, cloud_name, cloud_secret } from "../config/config.js";
cloudinary.config({
    cloud_name: 'codewithmoha',
    api_key: '265961574972223',
    api_secret: '56KKVODbrT27n9ly2YqKFKTCkn8',
  });

 const cloudinaryuploudimage = async (fileToUploud) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(fileToUploud, (result) => {
            resolve({
                url: result.secure_url,
                
            },{
                resource_type:"auto"
            })
        }) 
    })
}

export default cloudinaryuploudimage;