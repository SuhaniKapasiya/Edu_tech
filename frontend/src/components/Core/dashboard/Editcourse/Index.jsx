import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Rendersteps from "../addcourse/Rendersteps";
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";

function Editcourse() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const x = async () => {
      setLoading(true);
      const result = await getFullDetailsOfCourse(courseId, token);
      if (result?.courseDetails) {
        console.log(result);
        dispatch(setEditCourse(true));
        dispatch(setCourse(result?.courseDetails));
      }
      setLoading(false);
    };

    x();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" gap-y-8  w-[80vw] mx-auto flex  items-center flex-col ">
      <div className=" w-[50vw] ">
        <div className=" text-3xl flex w-[650px]   font-semibold text-richblack-25 ">
          Edit Course
        </div>
        <div>
          {course ? (
            <Rendersteps />
          ) : (
            <p className="mt-20 text-center text-3xl font-semibold text-richblack-100">
              Course not found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Editcourse;
