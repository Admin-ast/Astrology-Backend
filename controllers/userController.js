const { User } = require("../models/User");

const getallUsers = async(req,res) => {
        const users = await User.find();

        if(users){
            return res.status(200).json({status:true, res:users});
        }
        else{
            return res.status(400).json({status:false, message:"Users not found"});
        }
}

const getUser = async(req, res) => {

    const user = await User.findById(req.params.id);
    if(user){
        return res.status(200).json({status:true, res:user});
    }
    else{
        return res.status(400).json({status:false, message: "User not found"});
        
    }

}

module.exports = {
    getallUsers,
    getUser
}
