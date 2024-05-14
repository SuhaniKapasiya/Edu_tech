import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="  justify-center gap-y-5 items-center h-[93.9vh] flex flex-col text-richblack-5 w-screen text-3xl ">
      <div> Error - 404 Not Found</div>
      <div className=" flex bg-yellow-50 cursor-pointer text-richblack-900 rounded-md text-lg p-3 ">
        <Link to="/">Go Back Home</Link>
      </div>
    </div>
  );
}

export default Error;
