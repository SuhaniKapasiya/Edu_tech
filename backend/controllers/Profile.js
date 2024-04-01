const User = require("../models/User");
const Profile = require("../models/Profile"); 
const Course = require("../models/Course");

exports.updateProfile = async (req, res)=>{
    try{
        //get data 
        const {dateOfBirth="",about="",contactNumber, gender}  = req.body;
        //get UserId
        const UserId = req.user.id;
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success:false,
                message:'All fields are requires',
            })
        }
        //find profile
        const userDetails = await User.findById(UserId);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        //update profile 
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        return res.status(200).json({
            success:true,
            message:'Profile Updated Successfully',
            profileDetails,
        })

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
    try{
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
       await Promise.all(enrolledCourses.map(async (Course)=>{
         // Remove user from course's enrolled students list
           await Course.findByIdAndUpdate(Course._id,{
              $pull:{enrolledStudent : userId}
           });
       }))
  
     //delete profile
      await Profile.findByIdAndDelete({ userId: userDetails.additionalDetails });

      //delete User
      await User.findByIdAndUpdate({ _id: userId });
      // return response
      return res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
      });
    }catch(error){

        return res.status(500).json({
            success:false,
            message:'User cannot be deleted successfully',
        })
    }




}

exports.getAllUserDetails = async (req, res) => {
  try {
    //get id
    const id = req.user.id;

    //validation and get user details

    const userDetails = await User.findById(id).populate("additionalDetails").exec();
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