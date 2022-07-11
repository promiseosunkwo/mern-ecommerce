const Route = require("express").Router();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const UserModel = require("../models/User");
const User = require("../models/User");

// Update a user 
Route.put("/:id", verifyTokenAndAuthorization, async (req,res)=>{
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SEC_PHRASE).toString();
        
    }

    try{
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, {
        $set:req.body

        },{new:true});

        res.status(200).json(updatedUser)

    }catch(err){
        res.status(500).json(err)

    }
   
});

// Delete a user 
Route.delete("/:id", verifyTokenAndAuthorization, async (req, res)=>{
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted")

    } catch (err) {
        res.status(500).json(err)
    }
});


// Get a user 
Route.get("/find/:id", verifyTokenAndAdmin , async (req, res)=>{
    try {
        user = await UserModel.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);

    } catch (err) {
        res.status(500).json(err)
    }
});


// Get all users 
Route.get("/", verifyTokenAndAdmin , async (req, res)=>{
    const query = req.query.new
    try {
        users = query ? await UserModel.find().sort({_id: -1}).limit(5) : await UserModel.find();
        
        res.status(200).json(users);

    } catch (err) {
        res.status(500).json(err)
    }
});


// Get user statistics 
Route.get("/stats", verifyTokenAndAdmin , async (req, res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await UserModel.aggregate([
            {$match: { createdAt: {$gte: lastYear }}},
            {
                $project:{
                    month: {$month: "$createdAt" },
                },
            },
            {
                $group:{
                    _id: "$month",
                   total: {$sum: 1},
                },
            },
        ]);
        res.status(200).json(data);

    } catch (err) {
        res.status(500).json(err)
    }
});



module.exports = Route