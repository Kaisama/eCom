import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

    cloudinary.config({ 
        cloud_name: 'dr3ern2v3', 
        api_key: '287394163892479',
        api_secret: '9BOPUiqD6pWNt3-WgfdGTA6Yl0M' 
    });
    
   const storage = new  multer.memoryStorage();

   async function uploadImage(file) {
    const result = await cloudinary.uploader.upload(file,{
        resource_type:'auto'
    })
    return result;
   }

   const upload = multer({storage});

   export { upload, uploadImage };