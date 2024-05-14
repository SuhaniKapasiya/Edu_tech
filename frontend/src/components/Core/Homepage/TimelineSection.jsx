import React from "react";
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineimg from "../../../assets/Images/TimelineImage.png";

function Timelinesection() {
  return (
    <div className=" flex  mx-24  w-11/12  items-center ">
      <div className=" flex flex-col w-[45%] ">
        <div className=" flex items-center my-2 ">
          <div className=" flex items-center justify-center h-14  w-14 rounded-full bg-white ">
            <img src={logo1} alt="" />
          </div>
          <div className=" flex flex-col ml-4 ">
            <div className=" font-semibold text-lg font-inter text-richblack-700 ">
              Leadership
            </div>
            <div className=" font-inter text-richblack-600 ">
              Fully committed to the success company
            </div>
          </div>
        </div>

        <div className=" border-dashed border-l-2 items-center  h-10 border-richblack-200 ml-6  "></div>

        <div className=" flex items-center my-2 ">
          <div className=" flex items-center justify-center h-14  w-14 rounded-full bg-white ">
            <img src={logo2} alt="" />
          </div>
          <div className=" flex flex-col ml-4 ">
            <div className=" text-lg font-inter font-semibold text-richblack-700 ">
              Responsibility
            </div>
            <div className=" font-inter text-richblack-600 ">
              Students will always be our top priority
            </div>
          </div>
        </div>

        <div className=" border-dashed border-l-2 items-center  h-10 border-richblack-200 ml-6  "></div>

        <div className=" flex items-center my-2 ">
          <div className=" flex items-center justify-center h-14  w-14 rounded-full bg-white ">
            <img src={logo3} alt="" />
          </div>
          <div className=" flex flex-col ml-4 ">
            <div className=" text-lg font-inter font-semibold text-richblack-700 ">
              Flexibility
            </div>
            <div className=" font-inter text-richblack-600 ">
              The ability to switch is an important skills
            </div>
          </div>
        </div>

        <div className=" border-dashed border-l-2 items-center  h-10 border-richblack-200 ml-6  "></div>

        <div className=" flex items-center my-2 ">
          <div className=" flex items-center justify-center h-14  w-14 rounded-full bg-white ">
            <img src={logo4} alt="" />
          </div>
          <div className=" flex flex-col ml-4 ">
            <div className=" text-lg font-semibold font-inter text-richblack-700 ">
              Solve the problem
            </div>
            <div className=" font-inter text-richblack-600 ">
              Code your way to a solution
            </div>
          </div>
        </div>
      </div>

      <div className=" p-14 mr-6 relative flex items-center justify-center shadow-blue-200 w-[55%]  ">
        <img src={timelineimg} className=" w-[600px] shadow-[20px_20px_0px_0px_#fff] " alt="" />
        {/* green vala box  */}
        <div className=" bottom-1 absolute bg-caribbeangreen-700 flex text-white uppercase">
          <div className=" flex items-center p-8 ">
            <div className=" font-inter text-4xl font-bold ">10</div>
            <div className=" flex flex-col ml-6 ">
              <div className=" text-sm text-caribbeangreen-400  ">YEARS</div>
              <div className=" text-sm text-caribbeangreen-400  ">
                Experince
              </div>
            </div>
          </div>
          {/* border line  */}
          <div className=" w-2 h-10 border-caribbeangreen-400 border-l-2 justify-center items-center flex mt-8 border-solid p-2 "></div>
          {/* <div></div> right  */}
          <div className=" flex items-center p-8 ">
            <div className=" font-inter text-4xl font-bold ">250</div>
            <div className=" flex flex-col ml-6 ">
              <div className=" text-sm text-caribbeangreen-400  ">types of</div>
              <div className=" text-sm text-caribbeangreen-400  ">courses</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timelinesection;
