import { uploadImage } from "../../helpers/cloudinary";


export const handleImageUpload = async (req, res) => {
    try {
        const base64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64" +base64;
        const result =await uploadImage(url);

        res.json({
            success: true,
            message: 'Image uploaded successfully',
            url: result,
        })
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({success:false, message: 'Image upload failed' });
    }
}