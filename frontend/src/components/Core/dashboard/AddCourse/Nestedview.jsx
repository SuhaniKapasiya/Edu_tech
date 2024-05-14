import React from "react";
import Confirmationmodal from "../../../Common/Confirmationmodal";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import SubSectionModal from "./SubSectionModal";
import { setCourse } from "../../../../slices/courseSlice";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../services/operations/courseDetailsAPI";
// import { deleteSection } from "../../../../../server/controllers/Section";

function Nestedview({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async (sectionId) => {
    console.log("nested view se call ho gyi hai bhai ");
    const result = await deleteSection(
      {
        sectionId,
        courseId: course._id,
      },
      token
    );

    console.log("PRINTING AFTER DELETE SECTIOn", result);
    if (result) {
      // const updatedCourseContent = course.courseContent.map((section) =>
      //   section._id == sectionId ? result : section
      // );
      // const updatedCourse = { ...course, courseContent: updatedCourseContent };
      // dispatch(setCourse(updatedCourse));
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token });
    // if (result) {
    //   //TODO: extra kya kar skte h yaha pr
    //   const updatedCourseContent = course.courseContent.map((section) =>
    //     section._id == sectionId ? result : section
    //   );
    //   const updatedCourse = { ...course, courseContent: updatedCourseContent };
    //   dispatch(setCourse(updatedCourse));
    // }
    if (result) {
      // update the structure of course
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
  };

  return (
    <div
      style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
      }}
      className={`w-full relative  rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5`}
    >
      <div>
        {course?.courseContent?.map((section) => (
          <details key={section._id} open>
            <summary className="flex text-richblack-50  items-center justify-between gap-x-3 border-b-[1px] border-richblack-300">
              <div className="flex items-center justify-center space-y-3 gap-x-3">
                <RxDropdownMenu className=" flex items-center " size={25} />
                <p className=" flex items-center ">{section.sectionName}</p>
              </div>
              <div className=" flex items-center gap-x-3">
                {/* edit  */}
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <MdEdit />
                </button>

                {/* delete  */}
                <button
                  onClick={() => {
                    setConfirmationModal({
                      text1: "Delete this Section",
                      text2: "All the lectures in this section wil be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    });
                  }}
                >
                  <RiDeleteBin6Line />
                </button>

                {/* danda |  */}
                <span>|</span>
                {/* dropdown icon  */}
                <BiSolidDownArrow className={`text-xl text-richblack-300`} />
              </div>
            </summary>

            <div className=" ml-6 ">
              {section?.subSection?.map((data) => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubSection(data)}
                  className="flex items-center justify-between gap-x-3 border-b-2"
                >
                  {/* 1 */}
                  <div className="flex items-center gap-x-3">
                    <RxDropdownMenu />
                    <p>{data.title}</p>
                  </div>
                  {/* 2 */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-3"
                  >
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub Section",
                          text2: "selected Lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setAddSubSection(section._id)}
                className="mt-4 flex items-center gap-x-2 text-yellow-50"
              >
                <AiOutlinePlus />
                <p>Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>

      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <div></div>
      )}

      <div className=" absolute flex backdrop-blur-sm   -top-[7rem] left-[25rem] items-center justify-center   ">
        {confirmationModal ? (
          <Confirmationmodal modalData={confirmationModal} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Nestedview;
