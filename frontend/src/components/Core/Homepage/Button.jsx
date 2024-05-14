import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

function Button({ children, active, linkto, arrow }) {
  return (
    <Link to={linkto}>
      <button
        className={`py-3 mr-4 mt-2 px-5 hover:scale-95 transition-all rounded-md border-r-2  border-b-2  bg-richblack-700  font-normal ${
          active
            ? " bg-yellow-50 text-richblack-700 font-semibold border-richblack-5  "
            : " bg-richblack-700 text-richblack-5  border-richblack-300  "
        }`}
      >
        <div className=" flex items-center ">
          {children}

          {arrow && <AiOutlineArrowRight className=" ml-2 " />}
        </div>
      </button>
    </Link>
  );
}

export default Button;
