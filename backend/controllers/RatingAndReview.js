const RatingAndReviews = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");


//createRating
exports.createRating = async (req,res)=>{
    try{
       //get user Id
       const userId = req.user.id;
       //fetchdata from req body
       const {rating, review, courseId}= req.body;
       //check is user is enrolled or not
       const courseDetails = await Course.findOne({
         _id: courseId,
         studentsEnrolled: { $elMatch: { $: userId } },
         // samne as above line ->studentsEnrolled: userId
       }); 
       if(!courseDetails){
         return res.status(404).json({
             success:false,
             message:'Student is not enrolled in the course',
         })
       }

      //check if user already reviewed the course
      const alreadyReviewed = await RatingAndReviews.findOne({
                                    user:userId,
                                    Course:courseId,
      });
      if(alreadyReviewed){
        return res.status(403).json({
            success:false,
            message:'Course is already reviewed by the User',
        });
      }
      //create rating and review
      const ratingReview = await RatingAndReviews.create({
                        rating,review,
                        course:courseId,
                        user:userId,
      })
      //update course with this rating/review
      const udateCourseDetails = await Course.findByIdAndUpdate(
        { _id: courseId },
        {
          $push: {
            ratingAndReviews: ratingReview._id,
          },
        },
        { new: true }
      );
      console.log(udateCourseDetails);
      //return response 
      return res.status(200).json({
         success:true,
         message:"Rating and Review created Successfully",
         ratingReview,
        
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
            
        })
    }
}


//getAveragerating

exports.getAverageRating = async(req,res)=>{
     
    try{
        //get course ID
        const courseID = req.body.courseID;
        //calulate avg rating
        
        const result = await RatingAndReview.aggregate([
             {
                $match:{
                     course :new mongoose.Types.ObjectId(courseID),
                },
             },
             {
                 $group:{
                     _id:null,
                     averageRating:{$avg:"$rating"},
                 }  
             }
        ])

        //return rating
        if(result.lenght > 0){

            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }

        //if not reating/Review exist
        return res.status(200).json({
            success:true,
            message:'Average Rating is 0, no rating geven till now',
            averageRating:0,
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }

}



//getAllrating

exports.getAllRating = async(req,res)=>{
    try{
       const allReviews = await RatingAndReviews.find({})
                          .sort({rating:"desc"})
                          .populate({
                               path:"user",
                               select:"firstName lastName email image"
                          })
                          .populate({
                              path:"course",
                              select:"courseName",
                          })
                          .exec();
        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data:allReviews,
        });                  
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })

    }
}
