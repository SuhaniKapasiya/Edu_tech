import React from "react";
import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import Courseinformation from "./Courseinformation";
import Coursebuilder from "./Coursebuilder";
import Publishcourse from "./Publishcourse";

const Rendersteps = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course info",
    },
    {
      id: 2,
      title: "Course builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <div className=" flex flex-col   ">
      <div className=" flex flex-col ">
        <div className=" flex  mt-10 ">
          {steps.map((item) => (
            <div
              className={` ${
                step === item.id
                  ? " bg-yellow-900 border-yellow-50 text-yellow-50 rounded-full border-[1px] w-[25px] h-[25px] flex items-center justify-center  "
                  : " border-richblack-700 bg-richblack-800 text-richblack-300 rounded-full border-[1px] w-[25px] h-[25px] flex items-center justify-center"
              } mx-14 `}
            >
              {step > item.id ? (
                <FaCheckCircle size={25} />
              ) : (
                <div className=" ">{item.id}</div>
              )}
            </div>
          ))}
        </div>
        <div className=" gap-x-10 flex ">
          {steps.map((item) => (
            <div className=" ">{item.title}</div>
          ))}
        </div>
      </div>

      <div>
        {step === 1 && <Courseinformation />}
        {step === 2 && <Coursebuilder />}
        {step === 3 && <Publishcourse />}
      </div>
    </div>
  );
};

export default Rendersteps;
