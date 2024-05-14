import React from "react";
import Contactusform from "../../Common/Contactusform";

function Contactform() {
  return (
    <div className=" mx-auto flex my-6 flex-col ">
      <div className=" text-richblack-5 text-2xl font-semibold ">Get in Touch</div>
      <div className=" text-sm mt-4 text-richblack-300 ">
        We’d love to here for you, Please fill out this form.
      </div>
      <Contactusform />
    </div>
  );
}

export default Contactform;
