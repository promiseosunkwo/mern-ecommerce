const Route = require("express").Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const OrderModel = require("../models/Order");


// create new Order 
Route.post("/", verifyToken, async (req,res)=>{
        newOrder = new OrderModel(req.body);
    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err)

    }
   
});


// Update an order 
Route.put("/:id", verifyTokenAndAdmin, async (req,res)=>{
  
    try{
        const updatedOrder = await OrderModel.findByIdAndUpdate(req.params.id, {
        $set:req.body

        },{new:true});

        res.status(200).json(updatedOrder)

    }catch(err){
        res.status(500).json(err)

    }
   
});

// Delete a Order  
Route.delete("/:id", verifyTokenAndAdmin, async (req, res)=>{
    try {
        await OrderModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted")

    } catch (err) {
        res.status(500).json(err)
    }
});


// Get a user orders 
Route.get("/find/:userId", verifyTokenAndAuthorization,  async (req, res)=>{
    try {
        orders = await OrderModel.find({userId: req.params.userId});
        
        res.status(200).json(orders);

    } catch (err) {
        res.status(500).json(err)
    }
});


// Get all orders
Route.get("/", verifyTokenAndAdmin,  async (req, res)=>{
    try {
        all_orders = await OrderModel.find();
        
        res.status(200).json(all_orders);

    } catch (err) {
        res.status(500).json(err)
    }
});

// GET MONTHLY INCOME
Route.get("/income", verifyTokenAndAdmin, async (req, res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() -1));
    const beforeLastMonth = new Date(new Date().setMonth(lastMonth.getMonth() -1));

    try {
        const income = await OrderModel.aggregate([
            {$match: { createdAt: {$gte: beforeLastMonth }}},
            {
                $project:{
                    month: {$month: "$createdAt" },
                    sales: "$amount",
                },
            }, 
            {
                $group:{
                    _id: "$month",
                   total: {$sum: "$sales"},
                },
            },
        ]);
        res.status(200).json(income);

    } catch (err) {
        res.status(500).json(err)
        
    }
})



module.exports = Route