const Tag = require("../models/tags");


//create Tag ka handler functionn


exports.createTag = async (rea,res)=>{
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
exports.showAlltags = async (req,res)=>{
    try{
         
        const allTags = await Tag.find({}, { name: true ,description:true});

        res.status(200).json({
            success:true,
            message:"All tags return successfully",
            allTags,
        })
          

    }catch(error){
         return res.status(500).json({
           success: false,
           message: error.message,
         });
    }
}