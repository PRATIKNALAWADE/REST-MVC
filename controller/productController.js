

const Product = require('../models/productModel');

const getProducts =async(req,res)=>{
    try {
        const products =await Product.find({

        });

        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }

}




const getProductsById = async(req,res)=>{
    try {
        const {id} = req.params;

        const products =await Product.findById(id);

        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }

}

const updateProduct = async(req,res)=>{
    try {
        const {id} = req.params;

        const product =await Product.findByIdAndUpdate(id,req.body);

        if(!product){
            return res.status(404).json({message:'cannot find product with given ID'});

        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }


}


const deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params;

        const product =await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({message:'cannot find product with given ID'});

        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }

}



const addProduct = async (req,res)=>{
  
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }catch(error){
            console.log(error.message);
            res.status(500).json({message:error.message});
    }
}


module.exports = {
    getProducts,getProductsById,updateProduct,deleteProduct,addProduct
}