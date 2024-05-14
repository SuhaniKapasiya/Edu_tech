import React from "react";
import { useEffect } from "react";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import Footer from "../Components/Common/Footer";
import CourseSlider from "../Components/Core/catalog/CourseSlider";
import CourseCard from "../Components/Core/catalog/CourseCard";

function Catalog() {
  const [categoryId, setCategoryId] = useState("");
  const [catalogPageData, setCatalogPageData] = useState(null);
  const { catalogName } = useParams();

  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const category_id = res?.data?.data?.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      setCategoryId(category_id);
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryId);
        console.log("PRinting res: ", res);
        setCatalogPageData(res);
      } catch (error) {
        console.log(error);
      }
    };
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  return (
    <div className=" overflow-x-hidden text-richblack-25 w-[100vw] mx-auto flex flex-col justify-between  h-[100vh] ">
      {/* headings */}
      <div className=" w-full py-14 px-[130px] flex flex-col h-fit bg-richblack-800 ">
        <p className="text-md text-richblack-300 ">
          {`Home / Catalog /`}
          <span className=" text-[#F9D423]">
            {" "}
            {catalogPageData?.data?.selectedCategory?.name}
          </span>
        </p>
        <p className="text-2xl text-richblack-50 ">
          {" "}
          {catalogPageData?.data?.selectedCategory?.name}{" "}
        </p>
        <p className="text-sm max-w-[40rem] text-richblack-300 ">
          {" "}
          {catalogPageData?.data?.selectedCategory?.description}
        </p>
      </div>

      {/* section 1 */}
      <div className="  px-[130px] ">
        <div className="text-2xl text-richblack-50 mt-14 ">
          Courses to get you started
        </div>
        <div className=" flex  ">
          <p>Most Popular</p>
          <p>New</p>
        </div>
        <CourseSlider
          courses={catalogPageData?.data?.selectedCategory?.courses}
        />
        {/* {console.log(catalogPageData?.data?.selectedCategory?.courses)} */}
      </div>

      {/* section 2 */}
      <div className="  px-[130px] ">
        <div className="text-2xl mt-16 mb-5 text-richblack-50 ">
          Top courses in{" "}
          <span> {catalogPageData?.data?.selectedCategory?.name}</span>{" "}
        </div>

        <CourseSlider
          courses={catalogPageData?.data?.differentCategory?.[0]?.courses}
        />
        {/* {console.log("asla : ",catalogPageData?.data?.differentCategory?.[0]?.courses)} */}
      </div>

      {/* section 3 */}
      <div className="  px-[130px] ">
        <div className="text-2xl mt-16 text-richblack-50 ">
          Frequently Bought Together
        </div>
        <div className=" py-8 ">
          <div className=" grid grid-cols-1 lg:grid-cols-2  items-center justify-center  ">
            {catalogPageData?.data?.differentCategory?.[0]?.courses
              ?.slice(0, 4)
              .map((course, index) => (
                <CourseCard course={course} key={index} Height={"h-[250px]"} />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Catalog;
