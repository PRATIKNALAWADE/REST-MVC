const express = require('express');

const productRoute = require('./routes/productRoute');

const app = express();

const errorMiddleware = require('./middleware/errorMiddleware');

var cors = require('cors')



require('dotenv').config()

const MONGO_URL = process.env.Mongo_URL;
//console.log(MONGO_URL);
const PORT = process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cors())


//middleware
app.use('/api/products',productRoute);

app.use(errorMiddleware);

//connect with db
const mongoose = require('mongoose');

mongoose.connect(MONGO_URL)
.then(()=>{
    console.log("connected to mongoDB");
    app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));

   }
    ).catch((error)=>{
        console.log(error)
    });


//declaring app routes
app.get('/',(req,res)=>{
    res.send("Hello bhidu");
})

app.get('/blog',(req,res)=>{
    res.send("Blog");
})

app.get('/products',async(req,res)=>{
    try {
        const products =await Product.find({

        });

        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }

})

app.get('/products/:id',async(req,res)=>{
    try {
        const {id} = req.params;

        const products =await Product.findById(id);

        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message});
    }

})


//update
app.put('/products/:id',async(req,res)=>{
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

})


//delete
app.delete('/products/:id',async(req,res)=>{
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

})


app.post('/products',async (req,res)=>{
  
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }catch(error){
            console.log(error.message);
            res.status(500).json({message:error.message});
    }
})




