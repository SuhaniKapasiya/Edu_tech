import React from "react";
import { useForm } from "react-hook-form";
import Iconbtn from "../../../Common/Iconbtn";
import { useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BiRightArrow } from "react-icons/bi";
import { toast } from "react-hot-toast";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../slices/courseSlice";
import {
  createSection,
  updateSection,
} from "../../../../services/operations/courseDetailsAPI";
import Nestedview from "./Nestedview";

function Coursebuilder() {
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  // const goToNext = () => {
  //   // empty section
  //   if (course.courseContent.length === 0) {
  //     toast.error("Please add atleast one Section");
  //     return;

  //     // empty sub section
  //   }
  //   if (
  //     course.courseContent.some((section) => section.subSection.length === 0)
  //   ) {
  //     toast.error("Please add atleast one lecture in each section");
  //     return;
  //   }

  //   //if everything is good
  //   dispatch(setStep(3));
  // };
  const goToNext = () => {
    console.log("inside go next function");
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    dispatch(setStep(3));
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    let result;
    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }

    //update values
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    //loading false
    setLoading(false);
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div>
      <div className="bg-richblack-800  space-y-10  rounded-md p-3 mt-6 border-richblack-600 border-[1px] ">
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <div className="text-xl flex   font-semibold text-richblack-25">
            Course Builder
          </div>
          <div className=" mt-6 ">
            <label
              className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
              htmlFor="sectionName"
            >
              Section Name<sup className="text-pink-200">*</sup>
            </label>
            <input
              id="sectionName"
              placeholder="Add section name"
              {...register("sectionName", { required: true })}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full mt-2 rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
            />
            {errors.sectionName && (
              <span className="-mt-1 text-[12px] text-yellow-100">
                Section Name is required
              </span>
            )}
          </div>
          <div className=" flex mt-6 ">
            <Iconbtn
              type={"Submit"}
              text={editSectionName ? "Edit Section Name" : "Create Section"}
            >
              {" "}
              <MdAddCircleOutline className=" text-richblack-800 " size={20} />
            </Iconbtn>
            {editSectionName && (
              <button
                type="button"
                onClick={cancelEdit}
                className="text-sm text-richblack-300 underline ml-10"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
        {/* nested content is here  */}
        {course?.courseContent?.length > 0 && (
          <Nestedview
            handleChangeEditSectionName={handleChangeEditSectionName}
          />
        )}
      </div>

      <div className="flex  items-center justify-end gap-x-4   mt-10">
        <button
          onClick={goBack}
          className=" bg-richblack-600 px-2 rounded-md py-1 mt-auto items-center  hover:scale-95 transition-all border-r-[1px]  border-b-[1px]   cursor-pointer flex   "
        >
          Back
        </button>
        <Iconbtn text="Next" onClick={goToNext}>
          <BiRightArrow />
        </Iconbtn>
        {/* <button onClick={goToNext}>Next</button> */}
      </div>
    </div>
  );
}

export default Coursebuilder;
