import React from "react";
import Footer from "../Components/Common/Footer";
import { AiFillWechat, AiFillGoogleCircle, AiFillPhone } from "react-icons/ai";
import Contactform from "../Components/Core/aboutpage/Contactform";
//

function Contactus() {
  return (
    <div className=" overflow-x-hidden py-16 text-richblack-25 w-[100vw] mx-auto flex flex-col  text-center justify-between  h-[100vh] ">
      <div className=" flex w-full justify-around items-centee bg-richblack-900 ">
        {/* left  */}
        <div className=" flex justify-center items-start mt-36 ml-8  ">
          <div className="flex-col  bg-richblack-700  py-6 pl-6 pr-12 h-fit rounded-md flex ">
            {/* 3 paras */}
            {/* 1 */}
            <div className=" flex flex-col   text-left ">
              <div className=" flex gap-x-2 ">
                <div>
                  <AiFillWechat size={25} />
                </div>
                <div>Chat on us</div>
              </div>
              <div>Our friendly team is here to help.</div>
              <div>2130109@sliet.ac.in</div>
            </div>
            {/* 2 */}
            <div className=" my-6 flex flex-col   text-left ">
              <div className=" flex gap-x-2 ">
                <div>
                  <AiFillGoogleCircle size={25} />
                </div>
                <div>Visit us</div>
              </div>
              <div>Come and say hello at our office HQ.</div>
              <div>sliet longowal</div>
            </div>
            {/* 3 */}
            <div className=" flex flex-col   text-left ">
              <div className=" flex gap-x-2 ">
                <div>
                  <AiFillPhone size={25} />
                </div>
                <div>Call us</div>
              </div>
              <div>Mon - Fri From 8am to 5pm</div>
              <div>12345 67890</div>
            </div>
          </div>
        </div>
        {/* contact form  */}
        <div className="  flex max-w-[500px] p-4 rounded-md border-2 border-richblack-600 flex-col text-left ">
          <div className=" text-richblack-5 text-2xl font-semibold ">
            Got a Idea? We’ve got the skills. Let’s team up
          </div>
          <div className=" text-sm mt-4 text-richblack-300 ">
            Tall us more about yourself and what you’re got in mind.
          </div>
          <Contactform />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contactus;
