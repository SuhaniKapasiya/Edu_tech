import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Iconbtn from "../../Common/Iconbtn";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const { sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  // console.log("gsdd", courseSectionData);
  useEffect(() => {
    const setActiveFlags = () => {
      if (!courseSectionData.length) return;
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      // console.log("currentSectionIndex : ", currentSectionIndex);
      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);
      // console.log("currentSubSectionIndex : ", currentSubSectionIndex);
      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;
      // console.log("activeSubSectionId : ", activeSubSectionId);
      //set current section here
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      //set current sub-section here
      setVideoBarActive(activeSubSectionId);
    };
    setActiveFlags();
  }, [courseSectionData, courseEntireData, location.pathname]);
  return (
    <div className=" flex flex-col   bg-richblack-800 py-10 h-auto min-w-[222px] border-r-[1px] border-richblack-700 ">
      {/* for buttons and headings */}
      <div>
        {/* for buttons */}
        <div>
          <div
            onClick={() => {
              navigate("/dashboard/enrolled-courses");
            }}
          >
            Back
          </div>

          <div>
            <Iconbtn text="Add Review" onClick={() => setReviewModal(true)} />
          </div>
        </div>
        {/* for heading or title */}
        <div>
          <p>{courseEntireData?.courseName}</p>
          <p>
            {completedLectures?.length} / {totalNoOfLectures}
          </p>
        </div>

        {/* for sections and subSections */}
        <div>
          {courseSectionData.map((section, index) => (
            <div onClick={() => setActiveStatus(section?._id)} key={index}>
              {/* section */}
              <div>
                <div>{section?.sectionName}</div>
                {/* HW- add icon here and handle rotate 180 logic */}
              </div>
              {/* subSections */}
              <div>
                {activeStatus === section?._id && (
                  <div>
                    {section.subSection.map((topic, index) => (
                      <div
                        onClick={() => {
                          navigate(
                            `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                          );
                          setVideoBarActive(topic?._id);
                        }}
                        className={`flex gap-5 p-5 ${
                          videoBarActive === topic._id
                            ? "bg-yellow-200 text-richblack-900"
                            : "bg-richblack-900 text-white"
                        }`}
                        key={index}
                      >
                        <input
                          type="checkbox"
                          checked={completedLectures.includes(topic?._id)}
                          onChange={() => {}}
                        />
                        <span>{topic?.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;
