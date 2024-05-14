import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Iconbtn from "../../../Common/Iconbtn";
import { MdPublishedWithChanges } from "react-icons/md";
import {
  resetCourseState,
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../slices/courseSlice";
import { useEffect } from "react";
import { COURSE_STATUS } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../../services/operations/courseDetailsAPI";
import toast from "react-hot-toast";

function Publishcourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const goBack = () => {
    dispatch(setStep(2));
  };

  useEffect(() => {
    if (course.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };

  const handleCoursePublish = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // form has not been updated
      // no need to make api call
      goToCourses();
      return;
    }

    const courrseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;

    const formdata = new FormData();
    formdata.append("courseId", course._id);
    formdata.append("status", courrseStatus);

    setLoading(true);
    const result = await editCourseDetails(formdata, token);
    if (result) {
      goToCourses();
    } else {
      // toast.error("Error while publishing course..");
    }
    setLoading(0);
  };

  const onSubmit = () => {
    handleCoursePublish();
  };

  return (
    <div className="bg-richblack-800  space-y-10  rounded-md p-3 mt-6 border-richblack-600 border-[1px] ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-xl flex   font-semibold text-richblack-25">
          Publish Settings
        </div>
        <label
          htmlFor="public"
          className="inline-flex my-8 ml-3 cursor-pointer select-none items-center text-lg"
        >
          <input
            type="checkbox"
            id="public"
            {...register("public")}
            className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
          />
          <span className="ml-2 text-richblack-400">
            Make this course as public
          </span>
        </label>

        <div className="flex  items-center justify-end gap-x-4   mt-6">
          <button
            onClick={goBack}
            type="button"
            className=" bg-richblack-600 px-2 rounded-md py-1 mt-auto items-center  hover:scale-95 transition-all border-r-[1px]  border-b-[1px]   cursor-pointer flex   "
            disabled={loading}
          >
            Back
          </button>
          {/* <Iconbtn type={"submit"} disabled={loading} text="Publish">
            <MdPublishedWithChanges />
          </Iconbtn> */}
          <button type="submit">Publish</button>
        </div>
      </form>
    </div>
  );
}

export default Publishcourse;
