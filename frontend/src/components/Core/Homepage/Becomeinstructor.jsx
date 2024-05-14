import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import Highlightedtext from "./Highlightedtext";
import Button from "./Button";
import Reviewslider from "../../Common/Reviewslider";

function Becomeinstructor() {
  return (
    <div className=" flex flex-col ">
      <div className=" m-10 flex items-center text-center ">
        <div className=" w-[50%] ">
          <img
            className="shadow-[-22px_-22px_0px_10px_#f7fafc] w-[600px] m-16 "
            src={Instructor}
            alt=""
          />
        </div>
        <div className=" w-[50%] flex items-start ml-44 flex-col ">
          <div className="    font-semibold text-4xl   ">Become an</div>

          <div className=" text-4xl font-semibold ">
            <Highlightedtext text={"instructor"} />
          </div>
          <div className="text-lg text-start mt-2 items-start flex text-richblack-300">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </div>
          <div className=" mt-14 ">
            <Button
              children={"Start Teaching Today"}
              linkto={"/signup"}
              active={1}
              arrow={1}
            />
          </div>
        </div>
      </div>
      {/* slider  */}
      <div className=" flex flex-col text-center items-center ">
        <div className="    font-semibold text-4xl   ">Reviews from other learners</div>
        <Reviewslider/>
      </div>
    </div>
  );
}

export default Becomeinstructor;
