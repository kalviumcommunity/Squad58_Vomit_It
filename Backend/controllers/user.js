const { validateEmail, validateLength } = require("../helpers/validation");
const User = require("../models/User");
const Code = require("../models/Code");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail, sendResetCode } = require("../helpers/mailer");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/token");
const generateCode  = require("../helpers/generateCode");
const { ProfilingLevel } = require("mongodb");
const { default: mongoose } = require("mongoose");


exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body)

    const checkemail = await User.findOne({ email });
    const checkusername = await User.findOne({ username });

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid Email Address.",
      });
    } else if (checkemail) {
      return res.status(400).json({
        message: "Email Address already in use.",
      });
    }else if (!validateLength(username, 4, 13)) {
      return res.status(400).json({
        message: "Username must contain 4-13 characters.",
      });
    } else if (checkusername) {
      return res.status(400).json({
        message: "Username not unique, try another one.",
      });
    } else if (!validateLength(password, 9, 45)) {
      return res.status(400).json({
        message: "Password must be atleast 9 characters",
      });
    } else {
      const cryptedPassword = await bcrypt.hash(password, 12);
      const user = await new User({
        username,
        email,
        password: cryptedPassword,
      }).save();
      const emailVerificationToken = generateToken(
        { id: user._id.toString() },
        "30m"
      );
      // const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
      // sendVerificationEmail(user.email, user.username, url);
      // const token = generateToken({ id: user._id.toString() }, "5d");
      res.send({
        id: user._id,
        email: user.email,
        createdAt: user.createdAt,
        username: user.username,
        token: token,
        verified: user.verified,
        message: "Done! Please check your inbox to activate your account.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const validUser = req.user.id;
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const checkverification = await User.findById(user.id);

    if(validUser !== user.id){
      return res
      .status(400)
      .json({ message: "Operation denied!" });
    }
    if (checkverification.verified == true) {
      return res
        .status(400)
        .json({ message: "This account is already activated." });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: "You have successfully verified your account." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.login = async (req, res) => {
  try {
   const {email, password} = req.body;
   const user = await User.findOne({email});
   if(!user){
    return res.status(400).json({message:"Email address not registered."});
   } 
   const checkPasswordCorrectorNot = await bcrypt.compare(password, user.password);
   if(!checkPasswordCorrectorNot){
    return res.status(400).json({message:"Incorrect email or password."});
   }
   const token = generateToken({ id: user._id.toString() }, "7d");
   res.send({
     id: user._id,
     email: user.email,
     createdAt: user.createdAt,
     username: user.username,
     token: token,
     verified: user.verified,
   });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.resendVerification= async(req,res)=>{
  try {
   const id= req.user.id;
   const user = await User.findById(id);
   if(user.verified === true){
     return res.status(400).json({message:"This account is already activated."});
   }
   const emailVerificationToken = generateToken(
     { id: user._id.toString() },
     "60m"
   );
   const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
   sendVerificationEmail(user.email, user.first_name, url);
   return res.status(200).json({message:"Verification link sent."});
  } catch (error) {
   res.status(500).json({ message: error.message });
  }
}



exports.checkifverfied= async(req,res)=>{
  try {
   const id= req.user.id;
   const user = await User.findById(id);
   if(user.verified === true){
     return res.status(200).json({message:true});
   }
   if(user.verified === false){
    return res.status(200).json({message:false});
  }
  } catch (error) {
   res.status(500).json({ message: error.message });
  }
}



exports.validateResetCode = async (req,res)=>{
 
  try {
    const {email, code} = req.body;
    const user = await User.findOne({email});
    const Dbcode = await Code.findOne({user:user._id});
    if(Dbcode.code !== code){
    return res.status(400).json({message:"Incorrect Recovery Code."});
    }
    return res.status(200).json({message:"Success"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


exports.getProfile = async (req,res)=>{
  try {
    const {username} = req.params;
    const user = await User.findById(req.user.id)
    const profile = await User.findOne({username}).select("-password");
   
    const posts = await Post.find({user:profile._id}).populate("user").sort({createdAt: -1 });
    
    res.json({ ...profile.toObject(),posts, followingorNot,followingBackorNot })
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}