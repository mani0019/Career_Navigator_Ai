const jwt = require("jsonwebtoken")
const tokenblacklistModel = require("../models/blacklistmodel.js");


async function authUser(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({ message: "token not provided" });
    }
    const blacklistedToken = await tokenblacklistModel.findOne({ token });
    if(blacklistedToken){
        return res.status(401).json({ message: "token is blacklisted" });   
    }
try{
    const decode =jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user = decode;
    next();
}
catch(err){
    return res.status(401).json({message:"tokens not provided"});
}

}

module.exports ={authUser}  