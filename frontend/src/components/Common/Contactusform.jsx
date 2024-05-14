import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";
import countrycode from "../../data/countrycode.json";
import { contactUs } from "../../services/operations/contactUsAPI";

function Contactusform() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactFoem = async (data) => {
    // console.log(data);
    try {
      setLoading(1);
      // const responce = await apiConnector(
      //   "POST",
      //   contactusEndpoint.CONTACT_US_API,
      //   data
      // );
      const responce = await contactUs(data);

      setLoading(0);
    } catch (err) {
      console.log(err);
      setLoading(0);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstName: "",
        lastName: "",
        message: "",
        contactNumber: "",
      });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form onSubmit={handleSubmit(submitContactFoem)} action="">
      <div className="  text-left max-w-[500px] mt-11 gap-6  ">
        <div className=" flex gap-6 ">
          {/* first name  */}
          <div>
            <label
              htmlFor="firstname"
              className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
            >
              First Name <sup className="text-pink-200">*</sup>
            </label>
            <input
              required
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              {...register("firstName", { required: true })}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            {errors.firstName && <span>Plese enter your first name</span>}
          </div>
          {/* lastname  */}
          <div>
            <label
              htmlFor="lastname"
              className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
            >
              Last Name
            </label>
            <input
              required
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter last name"
              {...register("lastName")}
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </div>
        </div>
      </div>
      {/* email  */}
      <div className=" text-left mt-5 ">
        <label
          htmlFor="email"
          className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
        >
          Email <sup className="text-pink-200">*</sup>
        </label>
        <input
          required
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          {...register("email", { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
        {errors.email && <span>Plese enter your email</span>}
      </div>

      {/* phone  */}
      <div className=" text-left mt-5 ">
        <label
          htmlFor="email"
          className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
        >
          Phone Number <sup className="text-pink-200">*</sup>
        </label>
        <div className=" flex gap-x-2 ">
          <select
            placeholder="hi"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="  pl-4 flex w-[80px]  rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            name="dropdown"
            id="dropdown"
            // {...register("countrycode", { required: true })}
          >
            {countrycode.map((element, index) => {
              return (
                <option key={index} value={element.code}>
                  {element.code} - {element.country}
                </option>
              );
            })}
          </select>
          <input
            required
            type="number"
            name="contactNumber"
            id="contactNumber"
            placeholder="12345 67890"
            {...register("contactNumber", {
              required: { value: true, message: "plese enter phone number" },
              maxLength: { value: 10, message: "invalid phone number" },
              minLength: { value: 8, message: "invalid phone number" },
            })}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </div>
      </div>
      {/* message */}
      <div className=" text-left mt-5 ">
        <label
          htmlFor="message"
          className="w-full mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
        >
          Message
        </label>
        <textarea
          type="text"
          name="message"
          id="message"
          cols="30"
          rows="5"
          placeholder="Enter your message here.."
          {...register("message", { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
        {errors.message && <span>Plese enter your message</span>}
      </div>

      {/* button  */}
      <button
        type="submit"
        className="py-3 w-full mr-4 mt-2 px-5 hover:scale-95 transition-all rounded-md border-r-2  border-b-2 bg-yellow-50 text-richblack-700 font-semibold border-richblack-5"
      >
        Send Message
      </button>
    </form>
  );
}

export default Contactusform;
