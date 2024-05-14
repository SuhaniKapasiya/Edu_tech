import React from "react";
import Highlightedtext from "../Components/Core/homepage/Highlightedtext";
import img1 from "../assets/Images/aboutus1.webp";
import img2 from "../assets/Images/aboutus2.webp";
import img3 from "../assets/Images/aboutus3.webp";
import Foundingstoryimg from "../assets/Images/FoundingStory.png";
import Footer from "../Components/Common/Footer";
import Button from "../Components/Core/homepage/Button";
import Contactform from "../Components/Core/aboutpage/Contactform";

function About() {
  return (
    <div className=" overflow-x-hidden text-richblack-25 w-[100vw] mx-auto flex flex-col  text-center justify-between  h-[100vh] ">
      {/* section 1  */}
      <div className=" w-full flex flex-col h-fit bg-richblack-800 ">
        <div className="text-md text-richblack-300 mt-20">About Us</div>
        <div className="font-semibold text-3xl mt-8">
          Driving Innovation in Online Education for a <br />{" "}
          <Highlightedtext text="Brighter Future" />{" "}
        </div>
        <div className="text-lg text-richblack-300 w-[900px] mx-auto mt-6">
          Studynotion is at the forefront of driving innovation in online
          education. We're passionate about creating a brighter future by
          offering cutting-edge courses, leveraging emerging technologies, and
          nurturing a vibrant learning community.
        </div>
        <div className=" flex justify-center gap-x-3 mt-10 ">
          <img src={img1} className=" object-contain" alt="" />
          <img src={img2} className=" object-contain" alt="" />
          <img src={img3} className=" object-contain" alt="" />
        </div>
      </div>

      {/* section 2 */}
      <div className=" w-full max-w-[1100px] justify-center mx-auto flex flex-col h-fit bg-richblack-900 ">
        <div className="font-semibold text-3xl mt-16">
          "We are passionate about revolutionizing the way we learn. Our
          innovative platform <Highlightedtext text="combines technology" /> ,{" "}
          <span className=" text-[#FF512F] ">expertise</span> , and community to
          create an{" "}
          <span className=" text-[#F9D423] ">
            unparalleled educational experience
          </span>
          ."
        </div>
        <div className=" flex gap-x-72 mt-20 mx-auto justify-start  ">
          {" "}
          <div className=" flex flex-col justify-start text-left  ">
            {" "}
            <div className="font-semibold text-2xl justify-start text-[#FD1D1D]">
              Our Founding Story
            </div>
            <div className=" mt-6 justify-start text-sm flex ">
              Our e-learning platform was born out of a shared vision and
              passion for transforming education. It all began with a group of
              educators, technologists, and lifelong learners who recognized the
              need for accessible, flexible, and high-quality learning
              opportunities in a rapidly evolving digital world.
            </div>
            <div className="justify-start mt-2 text-sm flex">
              As experienced educators ourselves, we witnessed firsthand the
              limitations and challenges of traditional education systems. We
              believed that education should not be confined to the walls of a
              classroom or restricted by geographical boundaries. We envisioned
              a platform that could bridge these gaps and empower individuals
              from all walks of life to unlock their full potential.
            </div>{" "}
          </div>
          <img
            src={Foundingstoryimg}
            className=" w-[350px]  object-contain "
            alt=""
          />{" "}
        </div>
        {/* para 3 */}
        <div>
          <div className=" flex gap-x-72 mt-20 mx-auto justify-start  ">
            {" "}
            <div className=" flex flex-col justify-start text-left  ">
              {" "}
              <div className="font-semibold text-2xl justify-start text-[#E65C00]">
                Our Vision
              </div>
              <div className=" mt-6 justify-start text-sm flex ">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </div>
            </div>
            <div className=" flex flex-col justify-start text-left  ">
              {" "}
              <div className="font-semibold text-2xl justify-start text-[#1FA2FF]">
                Our Mission
              </div>
              <div className=" mt-6 justify-start text-sm flex ">
                our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* section 3 */}
      <div className=" w-full  mt-12 py-20 justify-around flex  h-fit bg-richblack-800 ">
        <div className=" flex flex-col ">
          <div className=" font-semibold text-richblack-100 text-2xl ">5K</div>
          <div className=" text-richblack-400 ">Active Students</div>
        </div>
        <div className=" flex flex-col ">
          <div className=" font-semibold text-richblack-100 text-2xl ">10+</div>
          <div className=" text-richblack-400 ">Mentors</div>
        </div>
        <div className=" flex flex-col ">
          <div className=" font-semibold text-richblack-100 text-2xl ">
            200+
          </div>
          <div className=" text-richblack-400 ">Courses</div>
        </div>
        <div className=" flex flex-col ">
          <div className=" font-semibold text-richblack-100 text-2xl ">50+</div>
          <div className=" text-richblack-400 ">Awards</div>
        </div>
      </div>

      {/* section 4 */}
      <div className=" w-full  max-w-[1100px] text-left my-20  flex flex-col  mx-auto  bg-richblack-900 ">
        <div className=" flex ">
          <div className=" flex flex-col items-start   ">
            {/* colourfull vala section */}
            <div className="font-semibold text-3xl items-start  ">
              World-Class Learning for <br />
              <Highlightedtext text="Anyone, Anywhere" />
            </div>
            <div className=" text-sm text-richblack-400 mt-4 mb-8 pr-10 ">
              Studynotion partners with more than 275+ leading universities and
              companies to bring flexible, affordable, job-relevant online
              learning to individuals and organizations worldwide.
            </div>
            <Button children={"Learn More"} active={1} linkto={"/signup"} />
          </div>
          {/* boxes  */}
          <div className=" flex ">
            {/* 2 boxes  */}
            <div className="w-[250px] p-6 bg-richblack-700 ">
              <div className=" text-richblack-5 font-semibold ">
                Curriculum Based on Industry Needs
              </div>
              <div className=" text-sm mt-4 text-richblack-300 ">
                Save time and money! The Belajar curriculum is made to be easier
                to understand and in line with industry needs.
              </div>
            </div>
            <div className="w-[250px] p-6 bg-richblack-800 ">
              <div className=" text-richblack-5 font-semibold ">
                Our Learning Methods
              </div>
              <div className=" text-sm mt-4 text-richblack-300 ">
                The learning process uses the namely online and offline.
              </div>
            </div>
          </div>
        </div>
        {/* bottom 3 box row  */}
        <div className=" flex ">
          {/* boxes  */}
          <div className=" flex  ">
            {/* 2 boxes  */}
            {/* -1 */}
            <div className="w-[350px] p-6 bg-richblack-900 "></div>
            {/* 1 */}
            <div className="w-[250px] p-6 bg-richblack-700 ">
              <div className=" text-richblack-5 font-semibold ">
                Curriculum Based on Industry Needs
              </div>

              <div className=" text-sm mt-4 text-richblack-300 ">
                Save time and money! The Belajar curriculum is made to be easier
                to understand and in line with industry needs.
              </div>
            </div>
            {/* 2 */}
            <div className="w-[250px] p-6 bg-richblack-800 ">
              <div className=" text-richblack-5 font-semibold ">
                Curriculum Based on Industry Needs
              </div>

              <div className=" text-sm mt-4 text-richblack-300 ">
                Save time and money! The Belajar curriculum is made to be easier
                to understand and in line with industry needs.
              </div>
            </div>
            {/* 3 */}
            <div className="w-[250px] p-6 bg-richblack-700 ">
              <div className=" text-richblack-5 font-semibold ">
                Our Learning Methods
              </div>
              <div className=" text-sm mt-4 text-richblack-300 ">
                The learning process uses the namely online and offline.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* section 5 contact form  */}
      <Contactform />
      {/* <section> 6 reviews </section> */}
      <div></div>
      <Footer />
    </div>
  );
}

export default About;
