
const  User = require("../models/User");
const  bcrypt = require("bcrypt");
const   jwt = require("jsonwebtoken");


// signup

const signupUser = async (req,res) => {
    const{name, email, password} = req.body;

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "Email already registered"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({name, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id}, process.env.JWT_SECRET,{
            expiresIn: "1h",
        });

        res.status(201).json({
            message:"Signup successful",
            token,
            user:{
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
          },
        });
    } catch(err){
        res.status(500).json({message: "Server error", error: err.message});
    }
};

// Login

const loginUser = async (req, res) => {
    const {email, password } = req.body;

    try{
       const user = await User.findOne({email});
       if(!user){
        return res.status(400).json({messsage: "Invalid credentials"});
       }

       const isMatch = await bcrypt.compare(password, user.password);
       if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"});
       }


       const token = jwt.sign({usedId: user._id }, process.env.JWT_SECRET,{
        expiresIn: "1h",
       });

       res.status(200).json({
        message: "Loing successful",
        token,
        user:{
            id: user._id,
            name: user.name,
            email: user.email,
        },
       });
    } catch(err){
        res.status(500).json({message: "Server error", error: err.message});
    }
};

module.exports = {
    signupUser,
    loginUser,
};
