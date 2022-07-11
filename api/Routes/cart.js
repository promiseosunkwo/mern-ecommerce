const Route = require("express").Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const CartModel = require("../models/Cart");
// const User = require("../models/User");

// create new product 
Route.post("/", verifyToken, async (req,res)=>{
        newCart = new CartModel(req.body);
    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err)

    }
   
});

// Update a Cart 
Route.put("/:id", verifyTokenAndAuthorization, async (req,res)=>{
  
    try{
        const updatedCart = await CartModel.findByIdAndUpdate(req.params.id, {
        $set:req.body

        },{new:true});

        res.status(200).json(updatedCart)

    }catch(err){
        res.status(500).json(err)

    }
   
});

// Delete a cart 
Route.delete("/:id", verifyTokenAndAuthorization, async (req, res)=>{
    try {
        await CartModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted")

    } catch (err) {
        res.status(500).json(err)
    }
});

// Get a user cart
Route.get("/find/:userId",  async (req, res)=>{
    try {
        cart = await CartModel.findOne({userId: req.params.userId});
        
        res.status(200).json(cart);

    } catch (err) {
        res.status(500).json(err)
    }
});


// Get all user cart
Route.get("/", verifyTokenAndAdmin,  async (req, res)=>{
    try {
        carts = await CartModel.find();
        
        res.status(200).json(carts);

    } catch (err) {
        res.status(500).json(err)
    }
});




module.exports = Route