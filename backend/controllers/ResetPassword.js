const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//resetPasswordToken
exports.resetPasswordToken = async(req,res)=>{
    
    try{
      //get email from req body
      const email = req.body.email;
      //check user for this email ,enail validation
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.json({
          success: false,
          message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
        });
      }
      //generate token
      //const token = crypto.randomUUID();
      const token = crypto.randomBytes(20).toString("hex");
      //update user by adding tokne and expiration time
      const updatedDetails = await User.findOneAndUpdate(
        { email: email },
        {
          token: token,
          resetPasswordExpires: Date.now() + 5 * 60 * 1000,
        },
        { new: true } // new : true se updated documents return hota hai response mai
      );
      console.log("DETAILS", updatedDetails);
      //create URL
      const url = `http://localhost:3000/update-password/${token}`;
      //sned  mail containing the url
      await mailSender(
        email,
        "Password Reset Link",
        `Password Reset Link: ${url}`
      );
      //return response
      return res.json({
        success: true,
        message: "Email sent successfully , please check email",
      });
    }catch(error){
       console.log(error);
       return res.status(500).json({
        success:false,
        message:'Something went wrong with sending reset pwd email'
       })
    }


}


//resetPassword

exports.resetPassword = async(req,res)=>{

    try {
      //data fetch
      const { password, confirmPassword, token } = req.body;
      //validation
      if (password !== confirmPassword) {
        return res.json({
          success: false,
          message: "Password and Confirm Password Does not Match",
        });
      }
      //get userdetails from db using token
      const userDetails = await User.findOne({ token: token });
      //if not entry -> invalid token
      if (!userDetails) {
        return res.json({
          success: false,
          message: "Token is invalid",
        });
      }

      //token time check
  if (!(userDetails.resetPasswordExpires > Date.now())) {
    return res.status(403).json({
      success: false,
      message: `Token is Expired, Please Regenerate Your Token`,
    });
  }

      //has pwd
      const hashedPassword = await bcrypt.hash(password, 10);

      //password update
      await User.findOneAndUpdate(
        { token: token },
        { password: hashedPassword },
        { new: true }
      );

      //return response
      return res.status(200).json({
        success: true,
        message: "Password reset successful",
      });
    } catch (error) {
      console.log("error inside reset Password",error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong with sending reset pwd email",
      });
    }
}