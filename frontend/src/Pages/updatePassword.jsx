import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useState } from "react";
import { resetPassword } from "../services/operations/authAPI";

function Updatepassword() {
  const loading = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmpassword: "",
  });

  const { password, confirmpassword } = formData;
  const token = location.pathname.split("/").at(-1);

  const handleOnChange = (e) => {
    setFormData((prevdata) => ({
      ...prevdata,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleOnSubmit = (e) => {
  //   e.preventDefault, dispatch(resetPassword(password, confirmpassword, token));
  // };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(password, confirmpassword, token, navigate('/login')));
  };

  return (
    <div>
      <div className="justify-center max-w-[430px] mx-auto flex gap-y-4 items-center h-[93.9vh] flex-col text-richblack-5">
        {!loading ? (
          <div>Loading ...</div>
        ) : (
          <div>
            <div className="my-2 text-2xl">Choose new password</div>
            <div className="my-2 text-md text-richblack-400">
              Almost done. Enter your new password and you're all set.
            </div>
            <form
              onSubmit={handleOnSubmit}
              className="flex flex-col my-2 mt-8"
              action=""
            >
              <label className="relative" htmlFor="">
                <p className="text-richblack-100 text-sm">
                  New Password{" "}
                  <sup className="text-pink-200 text-lg top-1">*</sup>
                </p>

                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleOnChange}
                  name="password"
                  placeholder="Enter Your New Password"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </label>
              <label className="relative" htmlFor="">
                <p className="text-richblack-100 text-sm">
                  Confirm New Password{" "}
                  <sup className="text-pink-200 text-lg top-1">*</sup>
                </p>

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  name="confirmpassword"
                  value={formData.confirmpassword}
                  onChange={handleOnChange}
                  placeholder="Confirm Your New Password"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                />
                <span
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </label>

              <button
                type="submit"
                className="mt-7 mb-5 bg-yellow-50 text-richblack-900 rounded-md p-3 font-medium"
              >
                Reset Password
              </button>
            </form>

            <Link className="flex just items-center gap-x-2" to="/login">
              <AiOutlineArrowLeft />
              <div className="text-sm">Back to login</div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Updatepassword;
