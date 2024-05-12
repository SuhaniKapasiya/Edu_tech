
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
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
          console.log(video);
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
              console.log(uploadDetails);
        //create a sub Section
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:`${uploadDetails.duration}`,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        //update section with this sub sectio ObjectId
        const updatedSection = await Section.findByIdAndUpdate(
          { _id: sectionId },
          {
            $push: {
              subSection: subSectionDetails._id,
            },
          },
          { new: true }
        ).populate("subSection");
        console.log("Updated Section:", updatedSection);
        //HW log updated section here ,after adding populate query

        //return res
          return res.status(200).json({
            success:'Sub Section Created Successfully',
             data :updatedSection,
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

// exports.updateSubsection = async (req, res) => {
//   try {
//     //data input
//     const { SubsectionName, SubsectionId, title, timeDuration, description } = req.body;
//     //data validation
//     if (!SubsectionName || !SubsectionId || !title || !timeDuration || !description) {
//       return res.status(400).json({
//         success: false,
//         message: "Missing Properties",
//       });
//     }

//     //update data

//     const section = await SubSection.findByIdAndUpdate(
//       SubsectionId,
//      {
//             title:title,
//             timeDuration:timeDuration,
//             description:description,
//             videoUrl:uploadDetails.secure_url,
//      },
//       { new: true }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Subsection Updated Successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Unable to Update SubSection, please try again",
//       error: error.message,
//     });
//   }
// };


  exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId, subSectionId, title, description } = req.body;
      console.log("updateSubSection mai req ");
      const subSection = await SubSection.findById(subSectionId);
      console.log("subSection", subSectionId);

      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        });
      }

      if (title !== undefined) {
        subSection.title = title;
      }

      if (description !== undefined) {
        subSection.description = description;
      }
      if (req.files && req.files.videoFile !== undefined) {
        const video = req.files.videoFile;
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        );
        subSection.videoUrl = uploadDetails.secure_url;
        subSection.timeDuration = `${uploadDetails.duration}`;
      }

      await subSection.save();
      const updatedSection = await Section.findById(sectionId).populate(
            "subSection"
          );

      return res.json({
        success: true,
        message: "Subsection updated successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      });
    }
  };
  ;

exports.deleteSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId } = req.body;
     console.log("subsectionId", req.subSectionId);
     console.log("sectionId", req.sectionId);
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: sectionId,
        },
      }
    );

    const subsection = await SubSection.findByIdAndDelete({
      _id:subSectionId ,
    });
    if (!subsection) {
      return res.status(400).json({
        success: false,
        message: "SubSection not found",
      });
    }

    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );

    //return response
    return res.status(200).json({
      success: true,
      data: updatedSection,
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