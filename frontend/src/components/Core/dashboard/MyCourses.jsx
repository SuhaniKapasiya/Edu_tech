import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GrAddCircle } from "react-icons/gr";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import Iconbtn from "../../Common/Iconbtn";
import Coursetable from "./Instructorcourses/Coursetable";
import { setEditCourse } from "../../../slices/courseSlice";

function Mycourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourse(result);
        // console.log("result is -------- ", result)
      }
    };
    fetchCourses();
  }, []);

  const clickHandler = () => {
    navigate("/dashboard/add-course");
    dispatch(setEditCourse(false));
  };

  return (
    <div className=" gap-y-8 pt-5 ml-5   w-[80vw] mx-auto flex  items-center flex-col ">
      <div className=" flex  ">
        <div className=" text-3xl flex w-[650px]   font-semibold text-richblack-25 ">
          My Courses
        </div>

        <Iconbtn onClick={clickHandler} text={"New"}>
          <GrAddCircle size={18} />
        </Iconbtn>
      </div>
      {course.length === 0 && (
        <div className=" text-3xl flex w-[650px]   font-semibold text-richblack-25 ">
          No courses found
        </div>
      )}
      {course.length >= 1 && (
        <Coursetable course={course} setCourse={setCourse} />
      )}
    </div>
  );
}

export default Mycourses;
