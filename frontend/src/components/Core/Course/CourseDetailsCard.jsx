import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../slices/cartSlice";
import {
  AiOutlineClockCircle,
  AiFillCarryOut,
  AiFillDatabase,
  AiOutlineFileDone,
} from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import copy from "copy-to-clipboard";
// import { GrCertificate } from "react-icons/gr";

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("user is -------->", user);

  const handleAddToCart = () => {
    if (user && user.accountType === "Instructor") {
      toast.error("You are an Instructor, you cant buy a course");
      return;
    }

    if (token) {
      console.log("dispatching add to cart", course);
      dispatch(addToCart(course));
    }
  };

  const handleShare = () => {
    console.log("shared");
    copy(window.location.href);
    if (copy) {
      toast.success("Copied to clipboard");
    }
  };

  return (
    <div className="  p-2 flex flex-col bg-richblack-700 rounded-xl">
      <img
        src={course?.thumbnail}
        alt="Thumbnail Image"
        className="max-h-[300px]  min-h-[180px] w-[400px] rounded-xl"
      />
      <div className="text-2xl my-1 text-richblack-50 p-4 font-bold ">
        Rs. {course?.price}
      </div>

      <button
        className=" bg-yellow-50 text-richblack-700 font-semibold border-richblack-5  py-2 mx-4 my-2 px-5 hover:scale-95 transition-all rounded-md border-r-[1px]  border-b-[1px]"
        onClick={
          user && course?.studentsEnrolled.includes(user?._id)
            ? () => navigate("/dashboard/enrolled-courses")
            : handleBuyCourse
        }
      >
        {user && course?.studentsEnrolled.includes(user?._id)
          ? "Go to Course"
          : "Buy Now"}
      </button>

      {!course?.studentsEnrolled.includes(user?._id) && (
        <button
          className=" bg-richblack-500 text-richblack-5  border-richblack-300 font-semibold  py-2 mx-4 my-2 px-5 hover:scale-95 transition-all rounded-md border-r-[1px]  border-b-[1px]"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      )}
      <div className="text-md my-1 max-w-[35rem] text-richblack-300 text-center ">
        30-Day Money-Back Guarantee
      </div>
      <ul className=" ml-5 mt-2 ">
        <li className=" font-bold ">This course includes:</li>
        {course?.instructions?.map((i) => (
          <li className=" flex gap-x-2 items-center  text-[#06D6A0]">
            <AiOutlineClockCircle /> {i}
          </li>
        ))}

        <li className="flex gap-x-2 items-center  text-[#06D6A0]">
          <AiFillCarryOut />
          Full Lifetime access
        </li>
        <li className="flex gap-x-2 items-center  text-[#06D6A0]">
          <AiFillDatabase />
          Access on Mobile and TV
        </li>
        <li className="flex gap-x-2 items-center  text-[#06D6A0]">
          <AiOutlineFileDone />
          Certificate of completion
        </li>
      </ul>
      <button
        onClick={handleShare}
        className=" mt-3 flex gap-x-2 items-center justify-center w-fit mx-auto   text-yellow-25 "
      >
        Share <FaShare />
      </button>
    </div>
  );
}

export default CourseDetailsCard;
