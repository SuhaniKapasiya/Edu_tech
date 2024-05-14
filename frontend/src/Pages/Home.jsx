import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import Highlightedtext from "../Components/Core/homepage/Highlightedtext";
import Yellowbutton from "../Components/Core/homepage/Yellowbutton";
import Blackbutton from "../Components/Core/homepage/Blackbutton";
import Button from "../Components/Core/homepage/Button";
import Banner from "../assets/Images/banner.mp4";
import Codeblocks from "../Components/Core/homepage/Codeblocks";
import Timelinesection from "../Components/Core/homepage/Timelinesection";
import SwissKnife from "../Components/Core/homepage/SwissKnife";
import Becomeinstructor from "../Components/Core/homepage/Becomeinstructor";
import Exploremore from "../Components/Core/homepage/Exploremore";
import Footer from "../Components/Common/Footer";

function Home() {
  return (
    <div className=" relative w-screen  mx-auto flex flex-col items-center text-richblack-25 justify-between  ">
      {/* section 1  */}
      <div className="  bg-richblack-900">
        {/* main button uper vala  */}
        <Link to={"/signup"}>
          <div className="mx-auto mt-16  rounded-full hover:bg-richblack-800  bg-richblack-700 font-bold transition-all duration-200 hover:scale-95 w-fit ">
            <div className=" px-6 py-3 text-richblack-300 transition-all duration-200 group-hover:bg-richblack-800 ">
              <p className=" flex items-center ">
                Become An Instructor
                <AiOutlineArrowRight className=" ml-2 " />
              </p>
            </div>
          </div>
        </Link>

        {/* heading  */}
        <div className="mx-auto mt-6 font-semibold text-4xl  w-fit ">
          Empower Your Future with <Highlightedtext text={" Coding Skills"} />
        </div>

        {/* para graph  */}
        <div className=" text-center w-[90%] text-lg text-richblack-300  mx-auto mt-6 max-w-[1000px]   ">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        {/* 2 buttons  */}
        <div className=" text-center  text-lg mx-auto mt-6">
          <Button
            children={"Leran More"}
            linkto={"/signup"}
            arrow={1}
            active={1}
          />
          <Button children={"Book a Demo"} linkto={"/login"} />
        </div>

        {/* video  */}
        <div className=" mx-auto mt-14 my-12 shadow-[20px_20px_0px_0px_#f7fafc] items-center max-w-[1000px] h-full  ">
          <video src={Banner} muted autoPlay loop></video>
        </div>

        {/* code section 1  */}
        <div className=" flex ">
          <Codeblocks
            // ={``}
            heading={
              <>
                Unlock your <Highlightedtext text={"coding potential"} /> with
                our online courses.
              </>
            }
            active={1}
            subheading={`Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.`}
            btn1={"Try it Yourself"}
            btn2={"Learn More"}
            flexpos={"flex-row"}
            codeblock={`<!DOCTYPE html>
<html>
<head>
    <title>Example</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1><a href="/">Header</a></h1>
    <nav><a href="one/">One</a><a href="two/">Two</a></nav>
</body>
</html>`}
            codecolor={" text-yellow-25"}
          />
        </div>

        <div className="flex ">
          <Codeblocks
            heading={
              <>
                Start
                <Highlightedtext text={" coding in seconds"} />
              </>
            }
            active={1}
            subheading={`Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.`}
            btn1={"Continue Lesson"}
            btn2={"Learn More"}
            flexpos={"flex-row-reverse"}
            codeblock={`<!DOCTYPE html>
<html>
<head>
    <title>Example</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1><a href="/">Header</a></h1>
    <nav><a href="one/">One</a><a href="two/">Two</a></nav>
</body>
</html>`}
            codecolor={" text-yellow-25"}
          />
        </div>

        <Exploremore />
      </div>
      {/* section 2  */}

      <div className=" bg-pure-greys-5 text-richblack-700 w-full">
        <div className=" h-[333px] homegapebg   flex items-center justify-center">
          <Button
            active={1}
            arrow={1}
            children={"Explore Full Catalog"}
            linkto={"/signup"}
          />
          <Button children={"Learn More"} linkto={"/signup"} />
        </div>
        <div className=" flex mx-24 w-11/12 m-16">
          <div className="mx-auto  font-semibold text-4xl w-[50%]">
            Get the skills you need for a{" "}
            <Highlightedtext text={"job that is in demand."} />
          </div>
          <div className=" mx-24 flex flex-col   w-[50%]">
            <div className="text-lg text-richblack-300  ">
              The modern StudyNotion is the dictates its own terms. Today, to be
              a competitive specialist requires more than professional skills.
            </div>
            <div className=" mt-10 ">
              <Button children={"Learn More"} active={1} linkto={"/signup"} />
            </div>
          </div>
        </div>
      </div>
      <div className=" mx-auto   bg-pure-greys-5 text-richblack-700  w-full">
        <Timelinesection />
      </div>

      <div className=" mx-auto   bg-pure-greys-5 text-richblack-700  w-full">
        <SwissKnife />
      </div>

      {/* section 3 become a instrutor  */}
      <div className=" bg-richblack-900 w-screen  ">
        <Becomeinstructor />
      </div>

      {/* footer  */}
      <Footer />
    </div>
  );
}

export default Home;
