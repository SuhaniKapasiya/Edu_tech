import React from "react";
import Rendersteps from "./Rendersteps";

function Addcourse() {
  return (
    <div className=" flex justify-around ml-5  w-[68rem]">
      <div className=" flex flex-col w-[40rem]  ">
        {/* main heading  */}

        <div className=" text-3xl flex   font-semibold text-richblack-25 ">
          Add Course
        </div>
        <Rendersteps />
      </div>
      <div className=" bg-richblack-700 h-[30rem]  border-richblack-600 border-[1px] rounded-md p-6 text-left max-w-[300px] ">
        <div className=" font-semibold ">⚡ Course Upload Tips</div>
        <ul className=" text-sm mt-3 mb-2   ">
          <li>• Set the Course Price option or make it free.</li>
          <li className="  my-2 ">
            • Standard size for the course thumbnail is 1024x576.
          </li>
          <li className="  my-2 ">
            • Video section controls the course overview video.
          </li>
          <li className="  my-2 ">
            • Course Builder is where you create & organize a course.
          </li>
          <li className="  my-2 ">
            • Add Topics in the Course Builder section to create lessons,
            quizzes, and assignments.
          </li>
          <li className="  my-2 ">
            • Information from the Additional Data section shows up on the
            course single page.
          </li>
          <li className="  my-2 ">
            • Make Announcements to notify any important
          </li>
          <li>• Notes to all enrolled students at once.</li>
        </ul>
      </div>
    </div>
  );
}

export default Addcourse;
