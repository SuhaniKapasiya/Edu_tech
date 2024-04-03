const User = require("../models/User");
const Profile = require("../models/Profile"); 
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
// Method for updating a profile

exports.updateProfile = async (req, res)=>{
    try{
      //get data
      const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
      //get UserId
      const UserId = req.user.id;
      if (!contactNumber || !gender || !id) {
        return res.status(400).json({
          success: false,
          message: "All fields are requires",
        });
      }
      //find profile by userId
      const userDetails = await User.findById(UserId);
      // const profileId = userDetails.additionalDetails;
      // const profileDetails = await Profile.findById(profileId);
      const profile = await Profile.findById(userDetails.additionalDetails);

      // Update the profile fields
      profile.dateOfBirth = dateOfBirth;
      profile.about = about;
      profile.contactNumber = contactNumber;

      // Save the updated profile
      await profile.save();

      return res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
        profileDetails,
      });
    }catch(error){
        return res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}


//deleteAccount
//Explore ->how can we schedule this deletion operation
exports.deleteAccount =async(req,res)=>{
  // TODO: Find More on Job Schedule
  // const job = schedule.scheduleJob("10 * * * * *", function () {
  // 	console.log("The answer to life, the universe, and everything!");
  // });
  // console.log(job);
  try {
    //get id
    const userId = req.user.id;
    //validation
    const userDetails = await User.findById(userId).populate("courses");
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    //TODO :HW unenroll user from all enrlled course

    // Extract enrolled courses
    const enrolledCourses = userDetails.courses;
    // Unenroll user from each course
    await Promise.all(
      enrolledCourses.map(async (Course) => {
        // Remove user from course's enrolled students list
        await Course.findByIdAndUpdate(Course._id, {
          $pull: { enrolledStudent: userId },
        });
      })
    );

    //delete profile
    await Profile.findByIdAndDelete({ userId: userDetails.additionalDetails });

    //delete User
    await User.findByIdAndUpdate({ _id: userId });
    // return response
    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User cannot be deleted successfully",
    });
  }
}

exports.getAllUserDetails = async (req, res) => {
  try {
    //get id
    const id = req.user.id;

    //validation and get user details

    const userDetails = await User.findById(id).populate("additionalDetails").exec();
    console.log(userDetails);
    //return response
    return res.status(200).json({
      success: true,
      message: "User Data Fetched Successfully",
      userDetails,
    });
  } catch (error) {
      return res.status(500).json({
        success:false,
        message:error.message,
      })
  }

};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log(image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate("courses")
      .exec();
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};