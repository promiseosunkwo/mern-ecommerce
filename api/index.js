// connecting all dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./Routes/user");
const authRoute = require("./Routes/auth");
const productRoute = require("./Routes/product");
const cartRoute = require("./Routes/cart");
const orderRoute = require("./Routes/order");
var cors = require('cors')
// connecting dotenv to this file
dotenv.config();

// use json format in postman
app.use(express.json());


// unblocks cors policy error during axios.get("http:\\localhost\")
app.use(cors());

// rest api call
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Connection Success"))
.catch((err)=>{console.log(err)});


app.listen(process.env.PORT_NO || 5000, () => {
    console.log("Backend server is running");
});