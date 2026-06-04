const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema({
    token:{
        type:String,
        required:[true, "Token is required"]
    }
},{
        timestamps:true,
    })

const tokenblacklistModel = mongoose.model("blacklist",blacklistSchema);
module.exports = tokenblacklistModel;
    


