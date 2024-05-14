// const CourseProgress = require("../models/CourseProgress");
// const SubSection = require("../models/SubSection");

// exports.updateCourseProgress = async (req, res) => {
//   const { courseId, subSectionId } = req.body;
//   const userId = req.user.id;

//   try {
//     // check valod subsection
//     const subSection = await SubSection.findById(subSectionId);
//     if (!subSection) {
//       return res.status(404).json({ error: "invali subsection" });
//     }

//     // check for old entry
//     let courseProgress = await CourseProgress.findOne({
//       courseID: courseId,
//       userId: userId,
//     });

//     if (!courseProgress) {
//       return res.status(404).json({
//         success: false,
//         message: "course progress do not exist",
//       });
//     } else {
//       // check for already completed video
//       if (courseProgress.completedVideos.includes(subSectionId)) {
//         return res.status(404).json({
//           error: "subsection already completed",
//         });
//       }
//       // phle se completed nahi hai data ab push kar do progress me
//       courseProgress.completedVideos.push(subSectionId);
//     }
//     await courseProgress.save();
//   } catch (err) {
//     console.error(err);
//     return res.stat(500).json({
//       error: "internal server error",
//     });
//   }
// };

const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");
// const SubSection = require("../models/SubSection"); // Updated import statement

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subSectionId } = req.body;
  const userId = req.user.id;

  try {
    // check valid subsection
    // const subSection = await SubSection.findById(subSectionId);
    const subSection = await  SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({ error: "invalid subsection" });
    }

    // check for old entry
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "course progress does not exist",
      });
    } else {
      // check for already completed video
      if (courseProgress.completedVideos.includes(subSectionId)) {
        return res.status(404).json({
          error: "subsection already completed",
        });
      }
      // it's not completed yet, push it to the completedVideos array
      courseProgress.completedVideos.push(subSectionId);
    }
    await courseProgress.save();
    return res
      .status(200)
      .json({ success: true, message: "Course progress updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "internal server error",
    });
  }
};
