import React from "react";
import Iconbtn from "./Iconbtn";

function Confirmationmodal({ modalData }) {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10  backdrop-blur-sm   ">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <p className=" text-richblack-25 text-xl font-semibold ">
          {modalData.text1}
        </p>
        <p className=" text-richblack-300 ">{modalData.text2}</p>
        <div className=" flex mt-2 ">
          <Iconbtn
            onClick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />

          <button
            className=" py-3 mr-4 mt-2 px-5 hover:scale-95 transition-all rounded-md border-r-2  border-b-2  bg-richblack-500  font-normal   text-richblack-5  border-richblack-300 "
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmationmodal;
