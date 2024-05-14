import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../services/operations/studentFeatures";
import { useEffect } from "react";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import toast from "react-hot-toast";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";
import Confirmationmodal from "../Components/Common/Confirmationmodal";
import RatingStars from "../Components/Common/RatingStars";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { formattedDate } from "../utils/dateFormatter";
import { BsGlobe } from "react-icons/bs";
import CourseCard from "../Components/Core/catalog/CourseCard";
import CourseDetailsCard from "../Components/Core/course/CourseDetailsCard";
import CourseAccordionBar from "../Components/Core/course/CourseAccordionBar";

function CourseDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isActive, setIsActive] = useState(Array(0));

  useEffect(() => {
    const getCourseFullDetails = async () => {
      try {
        const result = await fetchCourseDetails(courseId);
        // console.log("Printing CourseData-> ", result);
        setCourseData(result);
      } catch (error) {
        console.log("Could not fetch coursse details");
        toast.error("Error while fetching details");
      }
    };
    getCourseFullDetails();
  }, [courseId]);

  const [avgReviewCount, setAverageReviewCount] = useState(0);
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat(id)
        : isActive.filter((e) => e != id)
    );
  };

  useEffect(() => {
    const count = async () => {
      try {
        const result = await GetAvgRating(
          courseData?.data[0]?.ratingAndReviews
        );
        setAverageReviewCount(count);
      } catch (error) {
        console.log("Error while fetching review count");
      }
    };
  }, [courseData]);

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    let lectures = 0;
    courseData?.data[0]?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
    console.log(lectures);
    console.log("main data-------->", courseData?.data[0]);
  }, [courseData]);

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }

    setConfirmationModal({
      text1: "you are not Logged in",
      text2: "Please login to purchase the course",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  if (loading || !courseData) {
    return (
      <div className=" overflow-x-hidden my-auto text-richblack-25 w-[100vw] mx-auto flex flex-col justify-between  h-[100vh] ">
        Loading...
      </div>
    );
  }

  if (!courseData.success) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  return (
    <div className=" overflow-x-hidden text-richblack-25 w-[100vw] mx-auto flex flex-col justify-between  h-[100vh] ">
      {/* section 1 */}
      <div className=" w-full  relative py-14 px-[130px] flex  h-fit bg-richblack-800 ">
        <div className="flex flex-col">
          {" "}
          <p className="text-md my-1 text-richblack-300 ">
            {`Home / Learning /`}
            <span className=" text-[#F9D423]">
              {" "}
              {courseData?.data[0]?.category?.name}
            </span>
          </p>
          <div className="text-2xl my-1 text-richblack-50 font-bold ">
            {courseData?.data[0]?.courseName}
          </div>
          <div className="text-md my-1 max-w-[35rem] text-richblack-300 ">
            {courseData?.data[0]?.courseDescription}
          </div>
          <div className=" my-1 ">
            <div className="flex gap-x-2">
              <span className=" text-[#F9D423]">{avgReviewCount}</span>
              <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
              <span>{`(${courseData?.data[0]?.ratingAndReviews.length} reviews) `}</span>
              <span>{`(${courseData?.data[0]?.studentsEnrolled.length} students enrolled)`}</span>
            </div>
          </div>
          <div className="text-md my-1 text-richblack-300 ">
            {`Created by ${courseData?.data[0]?.instructor?.firstName} ${courseData?.data[0]?.instructor?.lastName}`}
          </div>
          <div className=" flex items-center gap-x-3 ">
            <AiOutlineInfoCircle />
            <p>
              Last updated - {formattedDate(courseData?.data[0]?.updatedAt)}
            </p>
            <p className=" flex gap-x-2 items-center ">
              {" "}
              <BsGlobe /> English
            </p>
          </div>
        </div>
        {/* image and buttons  */}
        <div className=" absolute  right-[10rem] ">
          <CourseDetailsCard
            course={courseData?.data[0]}
            setConfirmationModal={setConfirmationModal}
            handleBuyCourse={handleBuyCourse}
          />
        </div>
      </div>
      <div className=" m-8 w-[550px] border mx-[130px] border-pure-greys-400 p-5 ">
        <div className="text-2xl  my-1 text-richblack-100 font-bold ">
          What you'll learn
        </div>
        <div className=" text-richblack-200 ">
          {courseData?.data[0]?.whatYouWillLearn}
        </div>
      </div>

      {/* section 2  */}
      <div className="mt-[8rem] w-full  relative  px-[130px]    text-richblack-25">
        <div>
          <p className="  font-semibold text-lg ">Course Content</p>
          <div className="flex gap-x-3 justify-between">
            <div className=" text-sm ">
              <span>
                {courseData?.data[0]?.courseContent.length} section(s)
              </span>

              <span>{courseData.data[0]?.totalDuration} total length</span>
            </div>

            <div className=" mr-6  text-[#F9D423]">
              <button onClick={() => setIsActive([])}>
                Collapse all Sections
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Details Accordion */}
      <div className="py-4 w-[850px] rounded-md px-[130px]">
        {courseData?.data[0]?.courseContent?.map((course, index) => (
          <CourseAccordionBar
            course={course}
            key={index}
            isActive={isActive}
            handleActive={handleActive}
          />
        ))}
      </div>

      {/* Author Details */}
      <div className="py-4 flex flex-col w-[850px] rounded-md px-[130px]">
        <p className="text-[28px] font-semibold">Author</p>
        <div className="flex items-center gap-4 py-4">
          <img
            className=" w-[50px] rounded-full h-[50px] object-cover "
            src={courseData?.data[0]?.instructor?.image}
            alt=""
          />
          <p className="text-lg">
            {courseData?.data[0]?.instructor?.firstName}{" "}
            {courseData?.data[0]?.instructor?.lastName}
          </p>
        </div>
        <div className=" text-sm ">{courseData?.data[0]?.instructor?.additionalDetails?.about}</div>
      </div>

      {confirmationModal && <Confirmationmodal modalData={confirmationModal} />}
    </div>
  );
}

export default CourseDetails;
