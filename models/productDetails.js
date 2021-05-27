
import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    pname: String,
    description: String,
    //creator: String,
    categories: String,
    image: String,
    imageId: String,
    //selectedFile: String,
    price:Number,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var ProductDetails = mongoose.model('ProductDetails', productSchema);

export default ProductDetails;