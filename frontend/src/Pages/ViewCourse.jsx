import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";

import VideoDetailsSidebar from "../Components/Core/viewcourse/VideoDetailsSidebar";
import CourseReviewModal from "../Components/Core/viewcourse/CourseReviewModal";

function ViewCourse() {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      // console.log(courseData);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));
      let lectures = 0;
      courseData?.courseDetails?.courseContent?.forEach(
        (sec) => (lectures += sec?.subSection.length)
      );
      dispatch(setTotalNoOfLectures(lectures));
    };
    setCourseSpecificDetails();
  }, []);

  return (
    <div className=" w-[100vw] flex relative min-h-[calc(100vh-2.5rem)] text-richblack-25 ">
      <VideoDetailsSidebar setReviewModal={setReviewModal} />
      <div className="min-h-[100vh] w-[80vw] overflow-x-hidden ">
        <div className=" mx-auto py-10 ">
          <Outlet />
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  );
}

export default ViewCourse;
