// router file call uploadRouter
c
import { isAdmin, authMiddleware } from '../middlewares/authMiddleware.js';
import { uploadImages, deleteImages } from '../controller/uploadImages.js';
import { upload, resizeAndUploadImage } from '../middlewares/uploadImages.js';

const uploadRoute = express.Router();

uploadRoute.post(
    '/', 
    authMiddleware, 
    isAdmin, 
    upload.array('images', 5),
    resizeAndUploadImage, uploadImages);

uploadRoute.delete('/delete-img/:id', authMiddleware, isAdmin, deleteImages);

export default uploadRoute;