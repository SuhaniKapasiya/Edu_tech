import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper";
import "swiper/css/bundle";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import CourseCard from "./CourseCard";

function CourseSlider({ courses }) {
  return (
    <div className=" ">
      {courses?.length ? (
        <Swiper
                    slidesPerView={2}
                    loop={true}
                    spaceBetween={100}
                    pagination={true}
                    modules={[Autoplay,Pagination,Navigation]}
                    className="mySwiper items-center"
                    autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    }}
                    // navigation={true}
                    // breakpoints={{
                    //     1024:{slidesPerView:3,}
                    // }}
                >
          {courses?.map((course, index) => (
            <SwiperSlide key={index}>
              <CourseCard course={course}  Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>No Course Found</p>
      )}
    </div>
  );
}

export default CourseSlider;
