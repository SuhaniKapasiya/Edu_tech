import React from "react";

function Iconbtn({
  text,
  onClick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
  style,
}) {
  return (
    <button
      className={`${
        style
          ? " bg-richblack-500 text-richblack-5  border-richblack-300"
          : "  bg-yellow-50 text-richblack-700 font-semibold border-richblack-5"
      } py-1  mr-4 mt-2 px-5 hover:scale-95 transition-all rounded-md border-r-[1px]  border-b-[1px]  font-semibold border-richblack-5`}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children ? (
        <div className=" flex items-center gap-x-2 ">
          <div>{text}</div>
          <div> {children}</div>
        </div>
      ) : (
        text
      )}
    </button>
  );
}

export default Iconbtn;
