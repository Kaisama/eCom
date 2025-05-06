import express from "express";
import { addProduct, deleteProduct, editProduct, fetchAllProducts, handleImageUpload } from "../../controllers/admin/ProductController.js";
import { upload } from "../../helpers/cloudinary.js";
const ProductRouter = express.Router();

ProductRouter.post('/upload-image',upload.single('my_file'),handleImageUpload);
ProductRouter.post('/add-product',addProduct);
ProductRouter.put('/edit-product/:id',editProduct);
ProductRouter.get('/fetch-all-products',fetchAllProducts);
ProductRouter.delete('/delete-product/:id',deleteProduct);


export default ProductRouter;