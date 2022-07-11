const jwt = require("jsonwebtoken");


const verifyToken = (req,res,next) =>{
    const authHeader = req.headers.token;
    if (authHeader) {

            // splitting the brearer and token in postman header
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.JWT_SEC, (err, user)=>{
                if(err) res.status(403).json("Token is not valid");
                req.user = user;
                next();
            });
    }else{
            return res.status(401).json("You are not Authenticated");
    }

}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req,res, ()=>{
    // req.params.id is the id on the url while req.user.id is the id of the token
    // next simply means proceeding to the following action 
    if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
    }else{
        res.status(401).json("You are not allowed to do that!");
    }

    })
}


const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req,res, ()=>{
    // req.params.id is the id on the url while req.user.id is the id of the token
    // next simply means proceeding to the following action 
    if (req.user.isAdmin) {
        next();
    }else{
        res.status(401).json("You are not allowed to do that!");
    }

    })
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin}