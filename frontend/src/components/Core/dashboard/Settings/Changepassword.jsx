import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { changePassword } from "../../../../services/operations/settingsAPI";
import Iconbtn from "../../../Common/Iconbtn";

function Changepassword() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const pdata = {
  //   oldPassword: oldPassword,
  //   newPassword: newPassword,
  //   confirmNewPassword: newPassword,
  // };
  // console.log(pdata);

  const submitPasswordForm = async (data) => {
    const pdata = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
      confirmNewPassword: data.newPassword,
    };
    // console.log("i am pdata - ", pdata);
    try {
      // console.log(data);
      await changePassword(token, pdata);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitPasswordForm)}
      className="  flex flex-col p-6 w-[650px] items-start gap-x-3 justify-start rounded-md bg-richblack-700 "
      action=""
    >
      {/* heading  */}
      <div className=" text-lg ">Password</div>
      <div className=" gap-x-3 flex mt-4 w-full ">
        {/* 1 */}
        <div className="relative flex flex-col lg:w-[48%] gap-2 ">
          <label
            htmlFor="oldPassword"
            className="w-full  text-[0.875rem] leading-[1.375rem] text-richblack-5"
          >
            Current Password
          </label>
          <input
            type={showOldPassword ? "text" : "password"}
            name="oldPassword"
            id="oldPassword"
            placeholder="Enter Current Password"
            className="w-full rounded-[0.5rem] flex items-center justify-center bg-richblack-800 p-[12px] text-richblack-5"
            {...register("oldPassword", { required: true })}
          />
          <span
            onClick={() => setShowOldPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showOldPassword ? (
              <AiOutlineEyeInvisible
                className=" flex mt-1 items-center justify-center "
                fontSize={24}
                fill="#AFB2BF"
              />
            ) : (
              <AiOutlineEye
                className=" flex mt-1 items-center justify-center "
                fontSize={24}
                fill="#AFB2BF"
              />
            )}
          </span>
          {errors.oldPassword && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your Current Password.
            </span>
          )}
        </div>
        {/* 2 */}
        <div className="relative flex flex-col gap-2 lg:w-[48%]">
          <label
            htmlFor="newPassword"
            className="w-full  text-[0.875rem] leading-[1.375rem] text-richblack-5"
          >
            New Password
          </label>
          <input
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            id="newPassword"
            placeholder="Enter New Password"
            className="w-full rounded-[0.5rem] flex items-center justify-center bg-richblack-800 p-[12px] text-richblack-5"
            {...register("newPassword", { required: true })}
            // {...register("confirmNewPassword")}
          />
          <span
            onClick={() => setShowNewPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showNewPassword ? (
              <AiOutlineEyeInvisible
                className=" flex mt-1 items-center justify-center "
                fontSize={24}
                fill="#AFB2BF"
              />
            ) : (
              <AiOutlineEye
                className=" flex mt-1 items-center justify-center "
                fontSize={24}
                fill="#AFB2BF"
              />
            )}
          </span>
          {errors.newPassword && console.log(errors.newPassword) && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your New Password.
            </span>
          )}
        </div>
      </div>
      {/* button  */}
      <div className="flex justify-end text-right items-end ml-auto mt-4 gap-2">
        <Iconbtn
          style={1}
          onClick={() => {
            navigate("/dashboard/my-profile");
          }}
          text="Cancel"
        />
        <Iconbtn type="submit" text="Update" />
      </div>
    </form>
  );
}

export default Changepassword;
