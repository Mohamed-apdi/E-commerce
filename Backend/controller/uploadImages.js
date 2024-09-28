import { cloudinaryUploadImage, cloudinaryDeleteImage} from "../utils/cloudinary.js"
import asyncHandler from "express-async-handler"


// upload Images

export  const uploadImages = asyncHandler(async ( req, res) => {
  try {
    const files = req.files;
    const urls = [];


    if (!files) {
      res.status(400).json({ message: "No files were uploaded." });
      return;
    }

    if (files.length > 5) {
      res.status(400).json({ message: "Maximum 5 files are allowed." });
      return;
    }

    for(const file of files) {
      if (!file.buffer) {
        throw new Error("File buffer is undefined.");
      }
      const path = `data:image/jpeg;base64,${file.buffer.toString("base64")}`;
      const newPath = await cloudinaryUploadImage(path);
      urls.push(newPath);
    }

    res.json({ urls });

  } catch (error) {
    throw new Error(error.message)
  }
});

// Delete images

export const deleteImages = asyncHandler( async (req, res) => {

  const { id } = req.params;

  try {
    const result = await cloudinaryDeleteImage(id);
    res.json({ message: "Delete success", result});
  } catch (error) {
    throw new Error(error.message)
  }
})