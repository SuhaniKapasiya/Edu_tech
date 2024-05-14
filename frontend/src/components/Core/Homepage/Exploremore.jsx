import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import Highlightedtext from "./Highlightedtext";
import { AiTwotoneNotification } from "react-icons/ai";
import { BsFillJournalBookmarkFill } from "react-icons/bs";

const tabsname = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

function Exploremore() {
  const [currrtab, setcurrtab] = useState(tabsname[0]);
  const [courses, setcourses] = useState(HomePageExplore[0].courses);
  const [currcard, setcurrcard] = useState(
    HomePageExplore[0].courses[0]
  );

  const setcard = (val) => {
    setcurrtab(val);

    const res = HomePageExplore.filter((courses) => courses.tag === val);

    setcourses(res[0].courses);
    setcurrcard(res.courses[0]);
  };

  return (
    <div className=" mx-auto text-center flex flex-col ">
      <div className="mx-auto  font-semibold text-4xl mb-6">
        Unlock the <Highlightedtext text={"Power of Code"} />{" "}
      </div>
      <div className=" text-center  text-md text-richblack-300  mx-auto font-inter max-w-[1000px]   ">
        Learn to build anything you can imagin
      </div>
      <div className=" flex flex-row mt-4 text-center bg-richblack-500 items-center w-fit justify-center mx-auto p-1 rounded-full  ">
        {tabsname.map((tab) => (
          <div
            onClick={() => setcard(tab)}
            className={`mx-2 transition-all duration-200 rounded-full px-2 py-1 cursor-pointer   ${
              currrtab == tab
                ? " bg-richblack-700 hover:bg-richblack-600  text-white font-medium "
                : " bg-richblack-500 text-richblack-200 hover:text-richblack-100 "
            }`}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className="  flex ]  mt-20 text-center  items-center justify-center  ">
        {courses.map((acourse) => (
          <div
            onClick={() => setcurrcard(acourse)}
            className={` mx-10 flex  flex-col w-[220px] h-[180px]  justify-around   p-4 hover:scale-95 transition-all duration-200 cursor-pointer   ${
              currcard == acourse ? "   bg-white shadow-richblue-25   " : "  bg-richblack-800  "
            } `}
          >
            <div
              className={` flex items-start font-semibold ${
                currcard == acourse ? "  text-black " : " text-richblack-100 "
              } `}
            >
              {acourse.heading}
            </div>
            <div
              className={` flex text-xs text-start  justify-center  items-start  ${
                currcard == acourse
                  ? "   text-richblack-600 "
                  : "  text-richblack-200  "
              }   `}
            >
              {acourse.description}
            </div>
            <div
              className={` flex justify-around mt-7 ${
                currcard == acourse
                  ? "   text-blue-200 "
                  : "  text-richblack-200  "
              } `}
            >
              <div className=" flex text-sm  justify-center items-center mr-2 ">
                <AiTwotoneNotification />
                {acourse.level}
              </div>
              <div className={` flex justify-center items-center  `}>
                <BsFillJournalBookmarkFill />
                {acourse.lessionNumber} Lessons
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Exploremore;
