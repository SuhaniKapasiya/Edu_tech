const SubSection =  require("../models/SubSection");
const Section = require("../model/Section");
// const SubSection = require("../models/SubSection");
const {uploadImageToCloudinary} = require("../utils/imageUploader")

//create SubSection

exports.createSubSection = async (req,res)=>{
    try{
        //fetch data from Req body
        const {sectionId,title,timeDuration,description} = req.body;
        //extract file/video
        const video = req.files.videoFile;
        //validation
        if(!sectionId || !title || !timeDuration || !description  || !video){
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            })
        }
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        //create a sub Section
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        //update section with this sub sectio ObjectId
        const updatedSection = await Section.findByIdAndUpdate(
          { _id: sectionId },
          {
            $push: {
              SubSection: subSectionDetails._id,
            },
          },
          { new: true }
        ).populate('SubSection').exec();
        console.log("Updated Section:", updatedSection);
        //HW log updated section here ,after adding populate query

        //return res
          return res.status(200).json({
            success:'Sub Section Created Successfully',
            updatedSection,
          })

    }catch(error){
       return res.status(500).json({
         success:false,
        message:"Internal Server Error",
        error :error.message,
       })
    }
}

// delete and upadte subsection code write ToDo

exports.updateSubsection = async (req, res) => {
  try {
    //data input
    const { SubsectionName, SubsectionId, title, timeDuration, description } = req.body;
    //data validation
    if (!SubsectionName || !SubsectionId || !title || !timeDuration || !description) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    //update data

    const section = await SubSection.findByIdAndUpdate(
      SubsectionId,
     {
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
     },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Subsection Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to Update SubSection, please try again",
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    //get ID - assuming that we are sending ID in prams
    const { SubsectionId } = req.params;
    // use findByIdAndDelete
    await SubSection.findByIdAndDelete(SubsectionId);
    //TODO do we need to delete the entry from the Section schema??
     await Section.updateMany(
       { SubSection: SubsectionId },
       { $pull: { SubSection: SubsectionId } }
     );

    //return response
    return res.status(200).json({
      success: true,
      message: "SubSection Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete SubSection, please try again",
      error: error.message,
    });
  }
};