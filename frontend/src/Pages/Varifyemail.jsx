import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GiBackwardTime } from "react-icons/gi";
import { sendOtp, signUp } from "../services/operations/authAPI";

function Varifyemail() {
  const { loading, signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const containerStyle = "flex justify-between w-48 mx-auto";

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div>
      <div className="justify-center max-w-[430px] mx-auto flex gap-y-4 items-center h-[93.9vh] flex-col text-richblack-5">
        {loading ? (
          <div>Loading ...</div>
        ) : (
          <div>
            <div className="my-2 text-2xl">Verify email</div>
            <div className="my-2 text-md text-richblack-400">
              A verification code has been sent to you. Enter the code below
            </div>

            <form
              action=""
              className=" text-richblack-5 "
              onSubmit={handleOnSubmit}
            >
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                placeholder={"-"}
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="-"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                  />
                )}
                containerStyle={{
                  justifyContent: "space-between",
                  gap: "0 6px",
                }}
              />

              <button
                type="submit"
                className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
              >
                Varify Email
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between">
              <Link
                className="text-richblack-5 flex items-center gap-x-2"
                to="/signup"
              >
                <AiOutlineArrowLeft />
                <div className="text-sm">Back to Signup</div>
              </Link>

              <button
                onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                className="flex items-center text-blue-100 gap-x-2"
              >
                <GiBackwardTime className="   text-xl " />
                Resend it
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Varifyemail;
