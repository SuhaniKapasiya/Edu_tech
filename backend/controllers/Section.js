const Section = require("../models/Section");
const Course  = require("../models/Course");

 
exports.createSection = async (req, res) => {
      try {
        //data fetch
        const { sectionName, courseId } = req.body;
        //data validation
        if (!sectionName || !courseId) {
          return res.status(400).json({
            success: false,
            message: "Missing Properties",
          });
        }
        //create section
        const newSection = await Section.create({ sectionName });

        //update course with section ObjectId
        const updateCourseDetails = await Course.findByIdAndUpdate(
          courseId,
          {
            $push: {
              courseContent: newSection._id,
            },
          },
          { new: true }
        )
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          })
          .exec();

        //HW : use populate to replace section/sub-section both in updatedCourseDetails
        //return response
        return res.status(200).json({
          success: true,
          message: "Section created successfully",
          updateCourseDetails,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Unable to create Section, please try again",
          error: error.message,
        });
      }
    };
//UPDATE a Section
exports.updateSection = async (req, res) => {
  try {
    //data input
    const { sectionName, sectionId } = req.body;
    //data validation
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    //update data

    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Section Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to Update Section, please try again",
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    //get ID - assuming that we are sending ID in prams
    const { sectionId } = req.params;
    // use findByIdAndDelete
    await Section.findByIdAndDelete(sectionId);
    //TODO do we need to delete the entry from the course schema??
    await Course.updateMany(
      { courseContent: sectionId },
      { $pull: { courseContent: sectionId } }
    );

    //return response
    return res.status(200).json({
      success: true,
      message: "Section Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete Section, please try again",
      error: error.message,
    });
  }
};