import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../../services/operations/settingsAPI";
import Iconbtn from "../../../Common/Iconbtn";
import { useForm } from "react-hook-form";
const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

function EditProfile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
   console.log(user);
   
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = async (formData) => {
    // console.log("Form Data - ", data)
    try {
      dispatch(updateProfile(token, formData));
      console.log("edit page se success" + token);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <form
      className="  flex flex-col p-6 w-[650px] items-start gap-x-3 justify-start rounded-md bg-richblack-700 "
      action=""
      onSubmit={handleSubmit(submitProfileForm)}
    >
      {/* a  */}
      <div className=" text-lg ">Profile Information</div>
      {/* b  */}
      <div className=" flex gap-x-2 mt-3 ">
        {/* 1 */}
        <div>
          <label
            htmlFor="firstname"
            className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
          >
            First Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Enter first name"
            {...register("firstName", { required: true })}
            defaultValue={user?.firstName}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
          {errors.firstName && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your first name.
            </span>
          )}
        </div>
        {/* 2 */}
        <div>
          <label
            htmlFor="firstname"
            className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
          >
            Last Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Enter first name"
            {...register("lastName", { required: true })}
            defaultValue={user?.lastName}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
          {errors.lastName && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your last name.
            </span>
          )}
        </div>
      </div>
      {/* c */}
      <div className=" flex gap-x-2 mt-3 ">
        {/* 1  */}
        <div className=" flex flex-col w-full ">
          <label
            htmlFor="dateOfBirth"
            className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
          >
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            className="w-[295px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            {...register("dateOfBirth", {
              required: {
                value: true,
                message: "Please enter your Date of Birth.",
              },
              max: {
                value: new Date().toISOString().split("T")[0],
                message: "Date of Birth cannot be in the future.",
              },
            })}
            defaultValue={user?.additionalDetails?.dateOfBirth}
          />
          {errors.dateOfBirth && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              {errors.dateOfBirth.message}
            </span>
          )}
        </div>
        {/* 2 */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="gender"
            className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
          >
            Gender
          </label>
          <select
            type="text"
            name="gender"
            id="gender"
            className="w-[295px] py-4 rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            {...register("gender", { required: true })}
            defaultValue={user?.additionalDetails?.gender}
          >
            {genders.map((ele, i) => {
              return (
                <option key={i} value={ele}>
                  {ele}
                </option>
              );
            })}
          </select>
          {errors.gender && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your Date of Birth.
            </span>
          )}
        </div>
      </div>
      {/* d  */}
      <div className=" flex gap-x-2 mt-3 ">
        {/* 1  */}
        <div className=" flex flex-col w-full ">
          <label
            htmlFor="contactNumber"
            className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
          >
            Contact Number
          </label>
          <input
            type="tel"
            name="contactNumber"
            id="contactNumber"
            placeholder="Enter Contact Number"
            className="w-[295px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            {...register("contactNumber", {
              required: {
                value: true,
                message: "Please enter your Contact Number.",
              },
              maxLength: { value: 12, message: "Invalid Contact Number" },
              minLength: { value: 10, message: "Invalid Contact Number" },
            })}
            defaultValue={user?.additionalDetails?.contactNumber}
          />
          {errors.contactNumber && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              {errors.contactNumber.message}
            </span>
          )}
        </div>
        {/* 2 */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="about"
            className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
          >
            About
          </label>
          <input
            type="text"
            name="about"
            id="about"
            placeholder="Enter Bio Details"
            className="w-[295px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            {...register("about", { required: true })}
            defaultValue={user?.additionalDetails?.about}
          />
          {errors.about && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your About.
            </span>
          )}
        </div>
      </div>
      {/* buttons  */}
      <div className="flex  ml-auto  mt-6 gap-2">
        <Iconbtn
          style={1}
          onClick={() => {
            navigate("/dashboard/my-profile");
          }}
          text="Cancel"
        />
        <Iconbtn type="submit" text="Save" />
      </div>
    </form>
  );
}

export default EditProfile;
