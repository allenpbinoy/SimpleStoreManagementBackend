import express from 'express';
import mongoose from 'mongoose';
import ProductDetails from '../models/productDetails.js';


const router = express.Router();

export const getProducts = async (req, res) => { 
    try {
        const productDetails = await ProductDetails.find();
                
        res.status(200).json(productDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getProduct = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await ProductDetails.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createProduct = async (req, res) => {
    const { pname, description,  price, categories,image,imageId,createdAt } = req.body;

    const newProductDetail= new ProductDetails({  pname, description,  price, categories,image,imageId,createdAt })

    try {
        await newProductDetail.save();

        res.status(201).json(newProductDetail );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { pname, description,  price, categories,image,imageId,createdAt } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);

    const updatedProduct = { pname, description,  price, categories,image,imageId,createdAt, _id: id };

    await ProductDetails.findByIdAndUpdate(id, updatedProduct, { new: true });

    res.json(updatedProduct);
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No product with id: ${id}`);

    await ProductDetails.findByIdAndRemove(id);

    res.json({ message: "Product deleted successfully." });
}

export default router;