const Users = require("../models/userModel");
const jwt=require("jsonwebtoken");

const usersModel = Users.usersModel;
const adminModel = Users.adminModel;

module.exports.login = (req,res) => {

    const user = req.body.user;
    console.log(req.body.user); 
    
    try{
        adminModel.findOne({email:user.email},function(err,foundUser){
            if(err){
                return res.status(500).json({
                    msg:"Internal Server Error",
                    error:err,
                });
            }
            else{
                if(foundUser){
                    if(user.password === foundUser.password){
                        const token = jwt.sign({ userId: foundUser._id }, process.env.SECRET_KEY, {
                            expiresIn: "5 min",
                        });   
                        if (!token){
                            return res.status(500).json({
                              msg: "Internal server error.",
                              error:err,
                            });
                        }
                        foundUser.jwtToken = token;
                        foundUser.isLoggedIn = true;
                        foundUser.save(function(err){
                            if(!err){
                                res.status(200).json({
                                    msg:"Successfully Logged In.",
                                    token: token,
                                })
                            }else{
                                return res.status(500).json({
                                    msg: "Internal server error.",
                                    error:err,
                                });
                            }
                        });   
                    }else{
                        return res.status(401).json({
                            msg:"Incorrect Password",
                            error:err,
                        });
                    }
                }else{
                    return res.status(404).json({
                        msg:"User Not Found",
                        error:err,
                });
            }}
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            msg:err,
        });   
    };

}

module.exports.createUser = (req,res) => {
    const user = req.body.user;
    console.log(user);

    usersModel.findOne({email:user.email},function (err,data){
        if(err){
            return res.status(500).json({
                msg: "Internal Server Error",
            });
        }else{
            if(data){
                return res.status(406).json({
                    msg:"This email is already registered."
                }); 
            }else{
                const person = new usersModel({
                    username:user.username,
                    email:user.email,
                    mobileNo:user.mobileNo,
                    address:user.address
                });
                person.save(function(err){
                    if(err){
                        return res.status(406).json({
                            msg:"Failed to create a User."
                        });
                    }else{
                        return res.status(200).json({
                            msg:"Successfully, Added the user."
                        });
                    }
                });
            }
        }
    });
}

module.exports.getUser = (req,res) => {
    usersModel.find({},function(err,result){
        if(err){
            console.log(err);
            return res.status(500).json({
                msg: "Internal Server Error",
            });
        }else{
            if(result){
                return res.status(200).json({
                    msg:result
                });
            }
        }
    });
}

module.exports.validate = (req,res) => {

    const now = Date.now().valueOf() / 1000;

    jwt.verify(req.body.token,process.env.SECRET_KEY,function(err,result){
        console.log(now);
        console.log(result);
        if(err){
            return res.status(403).json({
                msg: "Internal server error.",
            });
        }else{
            if(result){
                const token = jwt.sign({ userId: result.userId }, process.env.SECRET_KEY, {
                    expiresIn: "5 min",
                });   
                if (!token){
                    return res.status(500).json({
                      msg: "Internal server error.",
                      error:err,
                    });
                }else{
                    return res.status(200).json({
                        msg:"Valid Token.",
                        newToken:token
                    });  
                }          
            }else{
                return res.status(403).json({
                    msg:"Invalid Token, Please Login Again."
                });
            }
        }
    });

    console.log(req.body.token);
}

module.exports.delete = (req,res) => {
    console.log(req.body);
    usersModel.deleteOne({_id:req.body.id},function(err,result){
        if(err){
            return res.status(500).json({
                msg: "Internal Server Error",
            });
        }else{
            if(result){
                return res.status(200).json({
                    msg:"SuccessFully Deleted."
                });
            }else{
                return res.status(500).json({
                    msg:"Something went Wrong"
                });
            }
        }
    });
}