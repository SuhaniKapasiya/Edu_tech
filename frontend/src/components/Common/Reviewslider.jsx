import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css/bundle";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { apiConnector } from "../../services/apiconnector";

function Reviewslider() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const res = await apiConnector(
          "GET",
          "http://localhost:4000/api/v1/course/getReviews"
        );

        if (res?.data?.success) {
          setReviews(res?.data?.data || []);
          console.log(res?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
    };

    fetchAllReviews();
  }, []);

  return (
    <div className="h-[200px] max-w-maxContent w-[80vw]  text-richblack-50">
      <Swiper
        slidesPerView={4}
        spaceBetween={24}
        loop={true}
        freeMode={true}
        pagination={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper items-center"
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index} className="p-6  flex flex-col items-start mb-10">
            <img
              src={
                review?.user?.image
                  ? review?.user?.image
                  : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
              }
              alt="Profile Pic"
              className="h-9 w-9 object-cover rounded-full"
            />
            <p className=" text-richblack-5 font-semibold ">
              {review?.user?.firstName} {review?.user?.lastName}
            </p>
            <p className=" text-sm  text-richblack-50 ">
              {review?.course?.courseName}
            </p>
            <p className=" text-sm flex text-left  text-richblack-300 ">
              {review?.review}
            </p>
            
            {/* <ReactStars
              count={5}
              value={review.rating}
              size={20}
              edit={false}
              activeColor="#ffd700"
              emptyIcon={<FaStar />}
              fullIcon={<FaStar />}
            /> */}
            
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Reviewslider;
