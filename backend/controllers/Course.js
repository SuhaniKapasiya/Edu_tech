const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Function to create a new course
exports.createCourse = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id;
    //fetch data
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      tag,
      price,
      category,
      status,
      instructions,
    } = req.body;

    //get thumbnail image
   // const thumbnail = req.files.thumbnailImage;
     const thumbnail = req.files ? req.files.thumbnailImage : null;
     if (!thumbnail) {
       console.log("error Thumbnail", error);
       return res.status(400).json({
         success: false,
         message: "Thumbnail image is required",
       });
     }

    //validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !category ||
      !thumbnail
    ) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //check for instructor
    // const userId = req.user.id;
    // const instructorDetails = await User.findById(userId);
    // console.log("Instructor Details", instructorDetails);
    // //TODO : verify that userId and instructor._id are same or different?

    if (!status || status === undefined) {
      status = "Draft";
    }
    // Check if the user is an instructor
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    });

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details not found",
      });
    }
    const CategoryDetails = await Category.findById(category);
    if (!CategoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details not found",
      });
    }

    //upload Image to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    //CREATE an entry for new Course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails.id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag: tag,
      Category: CategoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions: instructions,
    });

    //add the new course to the user schema of Instructor
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          course: newCourse._id,
        },
      },
      { new: true }
    );

    //update the category ka schema
    //TODO:HW
    await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          course: newCourse._id,
        },
      },
      { new: true }
    );

    //return response
    return res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failde to create Course",
      error: error.message,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const allCourse = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();
    return res.status(200).json({
      success: true,
      message: "Data for all course fetched successfully",
      data: allCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot Fetch course data",
      error: error.message,
    });
  }
};

//getCourseDetails 
exports.getCourseDetails = async (req, res) => {
  try {
    //get id
    const { courseId } = req.body;
    console.log("course ID", courseId);
    //find course details
  const courseDetails = await Course.find({ _id: courseId })
     .populate({
      path: "instructor",
      populate: {
        path: "additionalDetails",
      },
    })
    .populate("category")
    //.populate("ratingAndreviews")
    .populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    })
    //.populate("courseContent")
    .exec();

    //validation
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`,
      });
    }
    console.log("data of course ", courseDetails);
    //return response
    return res.status(200).json({
      success: true,
      message: "Course Details fetched successfully",
      data: courseDetails,
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
