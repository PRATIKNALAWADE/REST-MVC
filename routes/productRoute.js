const express = require('express');

const router = express.Router();

const Product = require('../models/productModel');

//route connect to controller
const {getProducts,getProductsById,updateProduct,deleteProduct,addProduct}  =  require('../controller/productController');

router.get('/',getProducts)

router.get('/:id',getProductsById);


//update
router.put('/:id',updateProduct);


//delete
router.delete('/:id',deleteProduct);


router.post('/',addProduct)

module.exports = router;