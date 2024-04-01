const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const {instance} = require("../config/razorpay");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");

//capture the payment and initiate the Razorpay order
exports.capturePayment = async (req,res)=>{
    //get courseID and UserID
    const {course_id} = req.body;
    const userId = req.user.id;
    //validation
    //valid courseID
    if(!course_id){
        return res.json({
            success:false,
            message:'Please provide valid course ID',
        })
    }
    let course
    try{
        course = await Course.findById(course_id);
        if(!course){
            return res.json({
                success:false,
                message:'Could not find the course'
            })
        }

       // user already pay for the same course
    //    const uid = new mongoose.Types.ObjectId(userId);
       const uid = mongoose.Types.ObjectId(userId);

    if(course.studentsEnrolled.includes(uid)){
        return res.status(200).json({
            success:false,
            message:'Student is already enrolled',
        });
       } 
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
    //order create 
const amount = course.price;
const currency = "INR";

const options ={
    amount : amount * 100,
    currency,
    receipt:Math.random(Date.now()).toString(),
    notes:{
        course_id,
        userId,
    }

};

try{
    //initiate the payment using razorpay
    const paymentResponse = await instance.order.create(options);
    console.log(paymentResponse);
    //return response
    return res.status(200).json({
        success:true,
        courseName:course.courseName,
        courseDescription :course.courseDescription,
        thumbnail:course.thumbnail,
        orderId :paymentResponse.id,
        currency:paymentResponse.currency,
        amount:paymentResponse.amount,
    })
 

}catch(error){
    console.log(error);
    res.json({
        success:false,
        message:"could not initiate order",
    });

}
};

//verify Signature of Razorypay and Server

exports.verifySignature = async (req,res)=>{
    const webhookSecret = "12345678";

    const Signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(Signature === digest){
         console.log("Payment is Authorised");

        const {courseId,userId}= req.body.payload.payment.entity.notes; 

         try{
            //fulfill the action

           //find the course nad enroll the student in it
           const enrlledCourse = await Course.findByIdAndUpdate(
             { id: courseId },
             { $push: { studentsEnrolled: userId } }, // Corrected syntax
             { new: true }
           );

           if(!enrlledCourse){
               return res.status(500).json({
                success:false,
                message:'Course not Found',
               })
           }
           console.log(enrlledCourse);
         //find the student added the course to their list enrolled courses me
         const enrlledStudent = await User.findOneAndUpdate(
                                          {_id:userId},
                                          {$push:{course:courseId}},
                                          {new:true},
         );
         console.log(enrlledStudent);   

         //mail send krdo confirmation wala
         const emailResponse = await mailSender(
                                enrlledStudent.email,
                                "Congratulations from CodeHelp",
                                "Congratulations, you are onboarded into new codeHelp Course ",
         );
         console.log(emailResponse);
         return res.status(200).json({
            success:true,
            message:"Signature verified and Course Added",
         })

         }catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            })


         }
    }
    else{
        return res.status(400).json({
            success:false,
            message:'Invalid request',
        })
    }
}
