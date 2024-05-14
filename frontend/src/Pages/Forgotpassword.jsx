import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { getPasswordResetToken } from "../services/operations/authAPI";


function Forgotpassword() {
  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="  justify-center max-w-[430px] mx-auto flex gap-y-4  items-center h-[93.9vh]  flex-col text-richblack-5 ">
      {loading ? (
        <div>loading</div>
      ) : (
        <div>
          <div className="  my-2 text-2xl ">
            {!emailSent ? "Reset Your Password" : "Check Email"}
          </div>
          <div className="  my-2 text-md text-richblack-400 ">
            {!emailSent
              ? "Have no fear. We will email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </div>
          <form
            onSubmit={handleOnSubmit}
            className=" flex flex-col my-2 mt-8  "
            action=""
          >
            {!emailSent && (
              <label htmlFor="">
                <p className=" text-richblack-100 text-sm">
                  Email Address{" "}
                  <sup className="text-pink-200 text-lg top-1">*</sup>
                </p>

                <input
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                />
              </label>
            )}

            <button
              type="submit"
              className="  mt-7 mb-5 bg-yellow-50 text-richblack-900 rounded-md p-3 font-medium "
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          <Link className=" flex just items-center gap-x-2 " to="/login">
            <AiOutlineArrowLeft />
            <div className="  text-sm ">Back to login</div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Forgotpassword;
