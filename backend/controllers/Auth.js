const User = require("../models/User");
const OTP = require("../models/OTP");
const { json } = require("express");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); 
const mailSender = require("../utils/mailSender");

//sendOTP
exports.sendOTP = async (req, res) => {
  try {
    //fetch email from request ki body
    const { email } = req.body;

    //check is user already exist
    const checkUserPresent = await User.findOne({ email });

    //if user already exist ,then return a response
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already register",
      });
    }
    //generate Otp
    var otp = otpGenerator.generate(6, {
      uperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP generated:", otp);

    //check unique otp or not
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      opt = otpGenerator(6, {
        uperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };

    //created an entry for OTP
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);
     
    //return response successfully
    res.status(200).json({
        success:true,
        message:'OTP Sent Successfully',
        otp,
    })


  } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
  }
};

//singnUP

exports.signup = async(req,res)=>{
   
    try{
      //data fetch from request ki body
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp,
      } = req.body;

      //validate krlo
      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !confirmPassword ||
        !otp
      ) {
        return res.status(403).json({
          success: false,
          message: "All fields are required",
        });
      }

      //2 password match krlo
      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message:
            "Password and ConfirmPassword Value does not match ,please try again",
        });
      }

      //check user already exist or not
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User is already registered",
        });
      }

      //find most recent OTP stored for the user
      const recentOtp = await OTP.find({ email })
        .sort({ createdAt: -1 })
        .limit(1);
      console.log(recentOtp);

      //validate OTP
      if (recentOtp.length == 0) {
        //OTP not found
        return res.status(400).json({
          success: false,
          message: "OTP not Found",
        });
      } else if (otp !== recentOtp.otp) {
        //Invalid OTP
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }

      //Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      //entry create in DB

      const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null,
      });

      const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password: hashedPassword,
        accountType,
        additionalDetails: profileDetails._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
      }); //image url is an api which generate image based on your firstName  &

      //return res
      return res.status(200).json({
        success: true,
        message: "User is registered Successfully",
        user,
      });
    }catch(error){
        console.log("Error in singup",error);
        return res.status(500),json({
            success:false,
            message:"User cannot be registrered.Please try again",
        })

    }
  
}



//Login

exports.login = async (req,res)=>{
    try{
        //get data from req body
        const {email ,password} = req.body;
        //validation data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:'All fields are required, please try again',
            });
        }
        //user check exist or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registrered, please signup first",
            })
        }

        //generate JWT,after password matching
        if(await bcrypt.compare(password,user.password)){
          const payload = {
            email: user.email,
            id: user._id,
            accountType: user.accountType,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "2h",
          });
          user.token = token;
          user.password = undefined;
          //create cookie and send response
          const Option = {
            expires: new Date(Date.now() + 3 * 34 * 60 * 60 * 1000),
            httpOnly: true,
          };
          res.cookie("token", token, Option).status(200).json({
            success: true,
            token,
            user,
            message: "Logged in successfully",
          });
        }
        else{
            return res.status(401).json({
                success:false,
                message:'Password is incorrect',
            })
        }

        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure ,please try again',
        });

    }
};



//changePassword

//get data from req body
      //get oldPwd ,newPwd,confirmPwd,NewPwd
      //validation
      //update Pwd
      //send mail pwd updated
      //return res


exports.changePassword = async (req, res) => {
  try {
    // Get data from req body
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match.",
      });
    }

    // Fetch user details
    const userId = req.user.id; // Assuming user ID is stored in the request object after authentication
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check if old password matches
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isOldPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect.",
      });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedNewPassword;
    await user.save();

    // Send email confirmation (you can implement this part separately)
    async function sendVerificationEmail(email, otp) {
      try {
        const mailResponse = await mailSender(
          email,
          "Password updated successfuly",
          otp
        );
        console.log("Email sent Successfully", mailResponse);
      } catch (error) {
        console.log("error occured while Reseting  the password", error);
        throw error;
      }
    }

    // Return response
    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Error in changing password:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to change password. Please try again.",
    });
  }
};
