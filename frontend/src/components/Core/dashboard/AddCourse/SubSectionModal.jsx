import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import Upload from "./Upload";
import {
  createSubSection,
  updateSubSection,
} from "../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../slices/courseSlice";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }

    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }

    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }

    setLoading(true);
    const result = await updateSubSection(formData, token);
    if (result) {
      // console.log("result", result)
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }

    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      if (!isFormUpdated) {
        toast.error("No changes made to the form");
      } else {
        //edit krdo store me
        handleEditSubSection();
      }
      return;
    }

    //ADD

    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);
    setLoading(true);

    const result = await createSubSection(formData, token);

    if (result) {
      //TODO: check for updation
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  return (
    <div>
      <div>
        <p>
          {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
        </p>
        <button onClick={() => (!loading ? setModalData(null) : {})}>
          <RxCross1 />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <Upload
          name="lectureVideo"
          label="Lecture Video"
          register={register}
          setValue={setValue}
          errors={errors}
          video={true}
          viewData={view ? modalData.videoUrl : null}
          editData={edit ? modalData.videoUrl : null}
        />
        <div>
          <label className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Lecture Title <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="lectureTitle"
            placeholder="Enter Lecture Title"
            {...register("lectureTitle", { required: true })}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full mt-2 rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
          {errors.lectureTitle && <span>Lecture Title is required</span>}
        </div>
        <div>
          <label className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5" >Lecture Description <sup className="text-pink-200">*</sup></label>
          <textarea
            id="lectureDesc"
            placeholder="Enter Lecture Description"
            {...register("lectureDesc", { required: true })}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full min-h-[8rem] mt-2 rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
          {errors.lectureDesc && <span>Lecture Description is required</span>}
        </div>

        {!view && (
          <div>
            {/* <button
              text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
            /> */}
            {
              <button type="submit">
                {loading ? "Loading..." : edit ? "Save Changes" : "Save"}
              </button>
            }
          </div>
        )}
      </form>
    </div>
  );
};

export default SubSectionModal;
