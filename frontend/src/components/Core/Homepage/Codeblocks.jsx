import React from "react";
import Button from "./Button";
import { AiOutlineArrowRight } from "react-icons/ai";
// import button from
import { TypeAnimation } from "react-type-animation";
import Highlightedtext from "./Highlightedtext";

function Codeblocks({
  position,
  heading,
  subheading,
  btn1,
  btn2,
  code,
  shadow,
  codecolor,
  flexpos,
  active,
  codeblock,
}) {
  return (
    <div
      className={`flex ${flexpos} ${position} my-20 mx-24 justify-between gap-10 `}
    >
      {/* section 1 */}
      <div className=" flex flex-col  w-[50%] ">
        <div className=" mt-6 items-start font-semibold text-4xl  w-fit ">
          {heading}
        </div>
        <div className="text-lg text-richblack-300 mt-6">{subheading}</div>
        <div className="  text-lg mt-6">
          <Button linkto={"/signup"} arrow={1} active={active} className="flex">
            {btn1}
            {/* <AiOutlineArrowRight /> */}
          </Button>

          <Button children={btn2} linkto={"/login"} />
        </div>
      </div>

      {/* section 2  */}
      <div className=" w-[50%] flex border-richblack-500 bg-richblack-800 border-2 p-2 ">
        <div className=" text-center flex flex-col w-[10%] text-richblack-400 font-inter font-semibold ">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>
        <div className={` w-[90%] flex flex-col ${codecolor} `}>
          <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            style={{ whiteSpace: "pre-line", display: "block" }}
            omitDeletionAnimation={1}
          />
          {/* {codeblock} */}
        </div>
      </div>
    </div>
  );
}

export default Codeblocks;
