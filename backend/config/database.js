const mongoose = require('mongoose');

async function connectionTOdb(){
    try{
        await mongoose.connect(process.env.MONGODB_URL, {
            family: 4,
            serverSelectionTimeoutMS: 10000,
        });
        console.log('successfully connected the DB ')
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectionTOdb;