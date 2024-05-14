import React from "react";
import { useSelector } from "react-redux";
import RatingStars from "../../Common/RatingStars";
import { useForm } from "react-hook-form";
import { createRating } from "../../../services/operations/courseDetailsAPI";
import Iconbtn from "../../Common/Iconbtn";
import { useEffect } from "react";
import ReactStars from "react-rating-stars-component";

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);
  console.log(user);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, []);

  const ratingChanged = (x) => {
    setValue("courseRating", x);
  };

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setReviewModal(false);
  };
  return (
    <div className=" text-pure-greys-25 ">
      {/* Modal header */}
      <div>
        <p>Add Review</p>
        <button onClick={()=>setReviewModal(false)}>Close</button>
      </div>
      {/* Modal Body */}
      <div>
        <div>
          <img
            src={user?.image}
            alt="user Image"
            className="aspect-square  w-[50px] rounded-full object-cover"
          />
          <div>
            <p>
              {user?.firstName} {user?.lastName}
            </p>
            <p>Posting Publicly</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 flex flex-col items-center"
        >
          <ReactStars
            // Review_Count, Star_Size
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
          />

          {/* textarea  */}
          <div>
            <label htmlFor="courseExperience">Add Your Experience*</label>
            <textarea
              id="courseExperience"
              placeholder="Add Your Experience here"
              {...register("courseExperience", { required: true })}
              className="form-style min-h-[130px] w-full"
            />
            {errors.courseExperience && <span>Please add your experience</span>}
          </div>

          {/* Cancel and Save button */}
          <div>
            <button onClick={() => setReviewModal(false)}>Cancel</button>
            <Iconbtn text="save" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseReviewModal;
