const Route = require("express").Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const ProductModel = require("../models/Product");
// const User = require("../models/User");

// create new product 
Route.post("/", verifyTokenAndAdmin, async (req,res)=>{
        newProduct = new ProductModel(req.body);
    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err)

    }
   
});


// Update a product 
Route.put("/:id", verifyTokenAndAdmin, async (req,res)=>{
  
    try{
        const updatedProduct = await ProductModel.findByIdAndUpdate(req.params.id, {
        $set:req.body

        },{new:true});

        res.status(200).json(updatedProduct)

    }catch(err){
        res.status(500).json(err)

    }
   
});

// Delete a product 
Route.delete("/:id", verifyTokenAndAdmin, async (req, res)=>{
    try {
        await ProductModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted")

    } catch (err) {
        res.status(500).json(err)
    }
});


// Get a user 
Route.get("/find/:id",  async (req, res)=>{
    try {
        product = await ProductModel.findById(req.params.id);
        
        res.status(200).json(product);

    } catch (err) {
        res.status(500).json(err)
    }
});


// Get all products 
Route.get("/",  async (req, res)=>{
    const getNewProducts = req.query.new
    const queryCatergory = req.query.category
    try {
        let products;
        if (getNewProducts) {
            products = await ProductModel.find().sort({ createdAt : -1}).limit(1);
        }else if(queryCatergory) {
            products = await ProductModel.find({categories: {$in: [queryCatergory],},});
        }else{
            products = await ProductModel.find();
        }
       
        
        res.status(200).json(products);

    } catch (err) {
        res.status(500).json(err)
    }
});




module.exports = Route