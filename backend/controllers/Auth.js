const User = require("../models/User");
const OTP = require("../models/OTP");
const { json } = require("express");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config(); 
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const Profile = require("../models/Profile");

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
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP generated:", otp);

    //check unique otp or not
    const result = await OTP.findOne({ otp: otp });
    console.log("Result is Generate OTP Func");
    console.log("OTP", otp);
    console.log("Result", result);

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
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

// Signup Controller for Registering USers

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

      //2 password match ->Check if password and confirm password match
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
    .limit(1)
    .catch((error) => {
      console.error("Error fetching recent OTP:", error);
      return []; // Return an empty array if there's an error
    });

    console.log("recentOtp", recentOtp);


      //validate OTP
      if (recentOtp.length == 0) {
          console.log("recentOtp res", recentOtp);
        //OTP not found
        return res.status(400).json({
         
          success: false,
          message: " The OTP is not valid",
        });
      } else if (otp !== recentOtp[0].otp) {
        //Invalid OTP
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
        });
      }

      //Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      let approved = "";
      approved === "Instructor" ? (approved = false) : (approved = true);

      // Create the Additional Profile For User
      const profileDetails = await Profile.create({
        gender: null,
        dateOfBirth: null,
        about: null,
        contactNumber: null,
      });

      //entry create in DB
      const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password: hashedPassword,
        accountType:accountType,
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


// Login controller for authenticating users

exports.login = async (req,res)=>{
    try{
      // Get email and password from request body
      const { email, password } = req.body;
      // validation -> Check if email or password is missing
      if (!email || !password) {
        // Return 400 Bad Request status code with error message
        return res.status(400).json({
          success: false,
          message: "All fields are required, please try again",
        });
      }
      //user check exist or not -> Find user with provided email
      const user = await User.findOne({ email }).populate("additionalDetails");
      if (!user) {
        // Return 401 Unauthorized status code with error message
        return res.status(401).json({
          success: false,
          message: "User is not registrered, please signup first",
        });
      }

      //generate JWT,after password matching
      if (await bcrypt.compare(password, user.password)) {
        const payload = {
          email: user.email,
          id: user._id,
          accountType: user.accountType,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        // Save token to user document in database
        user.token = token;
        user.password = undefined;
        //create cookie and send response
        const Option = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        res.cookie("token", token, Option).status(200).json({
          success: true,
          token,
          user,
          message: "User Logged in successfully",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Password is incorrect",
        });
      }
    }catch(error){
      console.log(error);
      // Return 500 Internal Server Error status code with error message
      return res.status(500).json({
        success: false,
        message: "Login Failure ,please try again",
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


// Controller for Changing Password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};