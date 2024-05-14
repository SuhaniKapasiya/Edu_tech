import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Confirmationmodal from "../../../Common/Confirmationmodal";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI";

function Coursetable({ course, setCourse }) {
  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      console.log(result);
      setCourse(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  };
  // console.log(course?.length);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  return (
    <div className=" relative w-[90%]">
      <Table className="rounded-xl border border-richblack-800 ">
        <Thead className=" ">
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Courses
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Duration
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Price
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {course?.map((c) => (
            <Tr
              key={c._id}
              className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
            >
              <Td className="flex flex-1 gap-x-4">
                <img
                  src={c?.thumbnail}
                  alt={c?.courseName}
                  className="h-[148px] w-[220px] rounded-lg object-cover"
                />
                <div className="flex flex-col justify-between">
                  <p className="text-lg font-semibold text-richblack-5">
                    {c.courseName}
                  </p>
                  <p className="text-xs max-w-[30rem] text-richblack-300">
                    {c.courseDescription.split(" ").length > 30
                      ? c.courseDescription.split(" ").slice(0, 30).join(" ") +
                        "..."
                      : c.courseDescription}
                  </p>
                  <p className="text-[12px] text-white">
                    Created : {c.createdAt}
                  </p>
                  {c.status == "Draft" ? (
                    <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                      <HiClock size={14} />
                      Drafted
                    </p>
                  ) : (
                    <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                      <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                        <FaCheck size={8} />
                      </div>
                      Published
                    </p>
                  )}
                </div>
              </Td>
              <Td className="text-sm font-medium flex flex-col  justify-center text-richblack-100">
                2hr 30min
              </Td>
              <Td className="text-sm font-medium flex flex-col  justify-center text-richblack-100">
                ₹.{c.price}
              </Td>
              <Td>
                <button
                  disabled={loading}
                  onClick={() => navigate(`/dashboard/edit-course/${c._id}`)}
                  title="Edit"
                  className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                >
                  {" "}
                  <FiEdit2 size={20} />
                </button>
                <button
                  disabled={loading}
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Do you want to delete this course?",
                      text2:
                        "All the data related to this course will be deleted",
                      btn1Text: !loading ? "Delete" : "Loading...  ",
                      btn2Text: "Cancel",
                      btn1Handler: !loading
                        ? () => handleCourseDelete(c._id)
                        : () => {},
                      btn2Handler: !loading
                        ? () => setConfirmationModal(null)
                        : () => {},
                    })
                  }
                  title="Delete"
                  className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                >
                  <RiDeleteBin6Line size={20} />
                </button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {confirmationModal && (
        <Confirmationmodal
          className=" absolute h-[100vh] w-[100vw] mb-[100px] bg-richblack-50  "
          modalData={confirmationModal}
        />
      )}
    </div>
  );
}

export default Coursetable;
