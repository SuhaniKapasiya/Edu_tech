import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Iconbtn from "../../../Common/Iconbtn";
import { buyCourse } from "../../../../services/operations/studentFeatures";
import { useNavigate } from "react-router-dom";

function Rendertotalammount() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { total, cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlebuycourse = () => {
    // paymrnt par lekr jane ka logic
    const courses = cart.map((course) => course._id);
    buyCourse(token, courses, user, navigate, dispatch);
    console.log("Bought these couses : ", courses);
  };
  return (
    <div className=" bg-richblack-700 h-fit p-6 rounded-md  border-richblack-600 border-[1px]">
      <p>Total: </p>
      <div className="text-2xl font-medium text-yellow-100">₹. {total}</div>
      <Iconbtn onClick={handlebuycourse} text={"Buy Now"} />
    </div>
  );
}

export default Rendertotalammount;
