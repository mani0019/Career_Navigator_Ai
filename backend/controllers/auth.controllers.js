const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenblacklistModel = require("../models/blacklistmodel.js");


async function registerUser(req,res){
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        return res.status(400).json({ message: "All fields are required" });
    }

    const userAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    });
    if(userAlreadyExists){
        return res.status(400).json({ message: "User already exists" });
    }
    const hash = await bcrypt.hash(password,10);

    const newUser = new userModel({
        username,
        email,
        password: hash,

    })
    await newUser.save();

    const token =jwt.sign(
        {id:newUser._id},
        process.env.JWT_SECRET_KEY,
        {expiresIn:"1d"}
    )
   res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
});
    res.status(201).json({
        message:"User registered successfully",
        user:{
            id:newUser._id,
            username:newUser.username,
            email:newUser.email,
        }
    }); 






}

/**
 * @loginUserController
 * @route POST /api/auth/login
 * @description Login a user
 * @access public
 */
async function loginUserController(req,res){
    const {email , password} = req.body;
    if(!email || !password){
        return res.status(400).json({ message: "All fields are required" });

    }
    const user  = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(400).json({ message: "Invalid password" });
    }

    const token =jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET_KEY,
        {expiresIn:"1d"}
    )
   res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000
});
    res.status(200).json({
        message:"User logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
        }
    });
}
/**
 * @logoutUserController
 * @route GET /api/auth/logout
 * @description Logout a user
 * @access public
 */

async function logoutUserController(req,res){
    const token = req.cookies.token;

    if(token){
        await tokenblacklistModel.create({ token });
    }
    res.clearCookie("token");
    res.status(200).json({
        message:"user logged out successfully"
    })



   
}
/**
 * @getMeController
 * @route GET /api/auth/get-me
 * @description 
 * @access private
 */

async function getMeController(req,res){

    const user = await userModel.findById(req.user.id);

    res.status(200).json({
        message:"user details fetched successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })

}



module.exports = { registerUser,loginUserController,logoutUserController,getMeController };
