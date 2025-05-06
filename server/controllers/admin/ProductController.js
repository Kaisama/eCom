import { uploadImage } from "../../helpers/cloudinary.js";
import { Product } from "../../models/Products.js";


export const handleImageUpload = async (req, res) => {
    try {
        const base64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:" + req.file.mimetype + ";base64," +base64;
        const result =await uploadImage(url);

        res.json({
            success: true,
            message: 'Image uploaded successfully',
            url: result,
        })
    } catch (error) {
        res.status(500).json({success:false, message: 'Image upload failed' });
    }
}


//add new product 

export const addProduct = async (req, res) => {
    try {
        const {image,title,description,category,brand,price,salePrice,totalStock}= req.body;
        console.log(req.body);
        const newProduct = new Product({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock
        })
        console.log("newProduct",newProduct);


        await newProduct.save();
        res.status(201).json({
            success:true,
            message: 'Product added successfully',
            data: newProduct
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message: 'Failed to add product' });
    }
}


//fetch all products
export const fetchAllProducts = async (req, res) => {
try {
    const  products = await Product.find();

    res.status(200).json({
        success:true,
        message: 'Products fetched successfully',
        data: products
    })

} catch (error) {
    console.log(error);
    res.status(500).json({success:false, message: 'Failed to fetch product' });
}


}

// edit a product
export const editProduct = async (req, res) => {
try {

    const {image,title,description,category,brand,price,salePrice,totalStock}= req.body;
console.log(req.body,"req.bodya");
    const findProductById = await Product.findById(req.params.id);
console.log("findProductById",findProductById);
    if(!findProductById){
       res.status(404).json({
        success:false,
        message: 'Product not found',
       })
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock
    },{new:true});

    await updatedProduct.save();
    console.log("updatedProduct",updatedProduct);
    res.status(200).json({
        success:true,
        message: 'Product updated successfully',
        data: updatedProduct
    })

} catch (error) {
    console.log(error);
    res.status(404).json({success:false, message: 'Failed to edit product' });
}

}


//delete a product
export const deleteProduct = async (req, res) => {
try {
    const findProductById = await Product.findById(req.params.id);
    if(!findProductById){
       res.status(404).json({
        success:false,
        message: 'Product not found',
       })
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success:true,
        message: 'Product deleted successfully',
    })
    
} catch (error) {
    console.log(error);
    res.status(500).json({success:false, message: 'Failed to delete product' });
}
}