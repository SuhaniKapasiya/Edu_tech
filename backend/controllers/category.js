const { response } = require("express");
const Category = require("../models/Category");


//create createCategory ka handler functionn


exports.createCategory = async (req,res)=>{
    try{
        //fetch data
         const {name, description} =req.body
         //validation
         if(!name || !description){
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            })
         }

         //create entry in db
         const tagsDetails = await Tag.create({
                name:name,
                description:description,
         });
         console.log(tagsDetails);
         
         //return response
           
         return res.status(200).json({
            success:true,
            message:"Tags Created Successfully",
         })


    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })

    }
}

//getAlltags handler function
exports.showAllCategory = async (req, res) => {
  try {
    const allTags = await Tag.find({}, { name: true, description: true });

    res.status(200).json({
      success: true,
      message: "All tags return successfully",
      allTags,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//categoryPageDetails

exports.categoryPageDetails = async(req,res)=>{
  try{
        //get categoryID
        const {categoryID} = req.body;
        //get course for specified categoryId
        const selectedCategory = await Category.findById(categoryID)
                                  .populate("courses")
                                  .exec();
        //validation
        if(!selectedCategory){
            return res.status(404).json({
              success:false,
              message:'Data Not Found',
            })
        }                          
      //get coursesfor different categories
      const differentCategories = await Category.find({
        _id: { $ne: categoryID },//ne means not equal
      })
        .populate("courses")
        .exec(); 


        //get top selling courses
        //HW - write it on your on

       // return response

       return res.status(200).json({
        success:true,
        data:{
           selectedCategory,
           differentCategories,
        },
       })
      
      
    }catch(error){
      console.log(error);
      return res.status(500).json({
        success:false,
        message:error.message,
      })
  }
}