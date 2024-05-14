import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { toast } from "react-hot-toast";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../services/operations/courseDetailsAPI";
import ChipInput from "./ChipInput";
import Requirementfield from "./Requirementfield";
import Iconbtn from "../../../Common/Iconbtn";
import courseSlice, {
  setStep,
  setCourse,
  setEditCourse,
  // editCourse,
} from "../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../utils/constants";
import Upload from "./Upload";
import { useNavigate } from "react-router-dom";

function Courseinformation() {
  const { course, editCourse } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [courseCategories, setCourseCategories] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  console.log(register);
  useEffect(() => {
    const getCategories = async () => {
      setLoading(1);
      const categories = await fetchCourseCategories();

      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(0);
    };

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseImage !== course.thumbnail ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString()
    ) {
      return true;
    } else {
      return false;
    }
  };

  //handles next button click
  const onSubmit = async (data) => {
    // console.log(data);
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }

        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }

        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }

        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }

        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage);
        }

        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          setStep(2);
          dispatch(setCourse(result));
        }
      } else {
        toast.error("NO Changes made so far");
      }
      // console.log("PRINTING FORMDATA", formData);
      // console.log("PRINTING result", result);
      navigate("/dashboard/my-courses");
      return;
    }

    //create a new course
    const formData = new FormData();

    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("thumbnailImage", data.courseImage);

    setLoading(true);
    console.log("BEFORE add course API call");
    console.log("PRINTING FORMDATA", formData);
    const result = await addCourseDetails(formData, token);
    if (result) {
      setStep(2);
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
    console.log("PRINTING FORMDATA", formData);
    console.log("PRINTING result", result);
  };

  return (
    <form
      className="bg-richblack-700 space-y-4  rounded-md p-3 mt-6 border-richblack-600 border-[1px] "
      onSubmit={handleSubmit(onSubmit)}
      action=""
    >
      {/* title  */}
      <div>
        <label
          className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
          htmlFor="courseTitle"
        >
          Course Title<sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full mt-2 rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
        {errors.courseTitle && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Course Title is Required**
          </span>
        )}
      </div>

      {/* description  */}
      <div>
        <label
          className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
          htmlFor="courseShortDesc"
        >
          Course Short Description<sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full mt-2 rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 h-[150px]"
        />
        {errors.courseShortDesc && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Course Description is required**
          </span>
        )}
      </div>

      {/* price   */}
      <div className="relative">
        <label
          className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
          htmlFor="coursePrice"
        >
          Course Price<sup className="text-pink-200">*</sup>
        </label>
        <input
          type="number"
          id="coursePrice"
          placeholder="Enter Course Price"
          {...register("coursePrice", {
            required: true,
            valueAsNumber: true,
          })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full mt-2 pl-9  rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 "
        />
        <HiOutlineCurrencyRupee
          size={20}
          className="absolute  flex items-center justify-center top-[56%] left-2  text-richblack-400"
        />
        {errors.coursePrice && <span>Course Price is Required**</span>}
      </div>

      {/* ctegories dropdown  */}
      <div className=" flex flex-col ">
        <label
          className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
          htmlFor="courseCategory"
        >
          Course Category<sup className="text-pink-200">*</sup>
        </label>
        <select
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full mt-2 pl-9  rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 "
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
        >
          <option value="" disabled>
            Choose a Category
          </option>

          {!loading &&
            courseCategories.map((category, index) => (
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && <span>Course Category is Required</span>}
      </div>

      {/* tags ka component  */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* upload   */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/*     Benefits of the Course */}
      <div>
        <label
          className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
          htmlFor="courseCategory"
        >
          Benefits of the course<sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="coursebenefits"
          placeholder="Enter Benefits of the course"
          {...register("courseBenefits", { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full mt-2  h-[10rem]  rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 "
        />
        {errors.courseBenefits && (
          <span>Benefits of the course are required**</span>
        )}
      </div>

      {/* RequirementField  */}
      <Requirementfield
        name="courseRequirements"
        label="Requirements / Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* buttons */}
      <div>
        {editCourse && (
          <Iconbtn
            onClick={() => dispatch(setStep(2))}
            text={"Continue without saving"}
            style={1}
          />
        )}

        {/* <Iconbtn
          type={"submit"}
          // onClick={() => dispatch(setStep(2))}
          text={!editCourse ? "Next" : "Save Changes"}
          disabled={loading}
          onClick={onSubmit}
        /> */}
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default Courseinformation;
