const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
        },
        email:{
            type:String,
            required:[true],
        },      
        jwtToken:{
            type:String,
        },
        isLoggedIn:{
            type:Boolean
        },
        mobileNo:{
            type:String
        },
        address:{
            type:String,
        }
    }
);

const adminSchema = new mongoose.Schema(
    {
        email:{
            type:String,
        },
        password:{
            type:String,
        },
    }
);

const usersModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin",adminSchema);

module.exports.userSchema = userSchema;
module.exports.usersModel = usersModel;
module.exports.adminModel = adminModel;