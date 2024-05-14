import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import GetAvgRating from "../../../utils/avgRating";
import RatingStars from "../../Common/RatingStars";

function CourseCard({ course, Height }) {
  // console.log("courses in card  : ", course);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <div>
      <Link className=" m-y-3 " to={`/courses/${course._id}`}>
        <div className=" gap-y-3 ">
          <img
            className={`${Height}     rounded-xl object-contain`}
            src={course.thumbnail}
            alt="course ka thumbnail"
          />
          <div className="  text-lg  mt-4 text-richblack-50 ">
            {course.courseName.toUpperCase()}
          </div>
          <div className=" text-richblack-200 text-sm ">{`Instructor - ${course.instructor.firstName} ${course.instructor.lastName}`}</div>
          <div className=" flex gap-x-4 ">
            <div className=" text-richblack-400 my-1  flex ">
              <span className=" text-yellow-100 text-sm mr-1 items-baseline">
                4.2
              </span>
              <RatingStars Review_Count={4} />
              <span className=" ml-2 text-xs flex items-center justify-center ">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
          </div>

          <div className=" text-richblack-200 ">{`Rs. ${course.price}`}</div>
        </div>
      </Link>
    </div>
  );
}

export default CourseCard;
