const Course = require("../models/Course");
const Tag = require("../models/tags");
const User = require("../models/User");
const {uploadImageToCloudinary} =require("../utils/imageUploader");


exports.createCourse = async(req,res)=>{
    try{
        //fetch data 
        const {courseName,courseDescription,whatYouWillLearn,price,tag}=req.body;

        //get email
        const thumbnail = req.files.thumbnailImage;

        //validation
        if(!courseName || !courseDescription ||!whatYouWillLearn ||!price ||!tag ||!thumbnail){
            res.status(400).json({
              success: false,
              message: "All fields are required",
            });
        }
      //check for instructor
      const userId = req.user.id;
      const instructorDetails = await User.findById(userId);
      console.log("Instructor Details",instructorDetails);
      //TODO : verify that userId and instructor._id are same or different?

      if(!instructorDetails){
        return res.status(404).json({
            success:false,
            message:'Instructor Details not found',
        })
      }
      const tagDetails = await Tag.findById(tag);
      if(!tagDetails){
          return res.status(404).json({
            success:false,
            message:'Tag Details not found',
          })
      }

      //upload Image to Cloudinary
      const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

      //CREATE an entry for new Course
      const newCourse = await Course.create({
        courseName,
        courseDescription,
        instructor:instructorDetails.id,
        whatYouWillLearn:whatYouWillLearn,
        price,
        tag:tagDetails._id,
        thumbnail:thumbnailImage.secure_url,
      })

      //add the new course to the user schema of Instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    course:newCourse._id,
                }
               
            },
             {new:true},
        );

        //update the Tag ka schema
        //TODO:HW
        
        //return response
        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
        });


    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failde to create Course',
            error:error.message,
        })

    }
}

exports.showAllCourse = async(req,res)=>{
    try{
        
        const allCourse = await Course.find({},{courseName:true,
                                                price:true,
                                                thumbnail:true,
                                                instructor:true,
                                                ratingAndReviews:true,
                                                studentsEnrolled:true,})
                                                .populate("instructor")
                                                .exec();
                               return res.status(200).json({
                                success:true,
                                message:'Data for all course fetched successfully',
                                data:allCourse,  
                               })                 
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Cannot Fetch course data',
            error:error.message,
        })
    }
}