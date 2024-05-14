import React from "react";
import Highlightedtext from "./Highlightedtext";
import Know_your_progress from "../../../assets/Images/Know_your_progress.svg";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";
import Button from "./Button";

function SwissKnife() {
  return (
    <div className=" flex flex-col items-center my-16 ">
      {/* <div> </div> */}
      <div className="mx-auto  font-semibold text-4xl mb-6">
        Your swiss knife for <Highlightedtext text={"learning any language."} />
      </div>
      <div className="text-lg text-richblack-600 mb-6 max-w-[850px] flex items-center text-center  ">
        Using spin making learning multiple languages easy. with 20+ languages
        realistic voice-over, progress tracking, custom schedule and more.
      </div>
      <div className=" flex items-center justify-center mt-[280px]  ">
        <img
          src={Know_your_progress}
          alt=""
          className=" object-contain absolute mr-[700px]  "
        />
        <img
          src={Compare_with_others}
          alt=""
          className=" absolute object-contain  "
        />
        <img
          src={Plan_your_lessons}
          alt=""
          className=" absolute ml-[700px] object-contain  "
        />
      </div>
      <div className=" mt-[300px] ">
        <Button linkto={"/signup"} children={"Learn More"} active={1} />
      </div>
    </div>
  );
}

export default SwissKnife;
