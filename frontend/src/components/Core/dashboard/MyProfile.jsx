import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Iconbtn from "../../Common/Iconbtn";
import { BiEdit } from "react-icons/bi";

function Myprofile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  console.log(user);
  return (
    <div className=" gap-y-8  w-[80vw] mx-auto flex  items-center flex-col ">
      <div className=" text-3xl flex w-[650px]   font-semibold text-richblack-25 ">
        My Profile
      </div>

      {/* section 1 */}
      <div className="  flex p-6 w-[650px] items-start justify-between rounded-md bg-richblack-700 ">
        <div className=" flex gap-x-3 items-center ">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[50px] rounded-full object-cover"
          />
          <div className=" flex flex-col ">
            <div className="  font-semibold ">
              {user?.firstName + " " + user?.lastName}
            </div>
            <div className=" text-richblack-500 ">{user?.email}</div>
          </div>
        </div>

        <Iconbtn
          text={"Edit"}
          children={<BiEdit />}
          onClick={() => navigate("/dashboard/settings")}
        />
      </div>

      {/* section 2 */}
      <div className="  flex p-6 w-[650px] items-start justify-between rounded-md bg-richblack-700 ">
        <div className=" flex flex-col ">
          <div className="  font-semibold ">About</div>
          <div className=" text-richblack-300 max-w-[400px] mt-8 ">
            {user?.additionalDetails?.about
              ? `${user.additionalDetails?.about}`
              : "Write something about yourself"}
          </div>
        </div>

        <Iconbtn
          className=" "
          text={"Edit"}
          children={<BiEdit />}
          onClick={() => navigate("/dashboard/settings")}
        />
      </div>

      {/* section 3  */}
      <div className="  flex p-6 w-[650px] items-start justify-between rounded-md bg-richblack-700 ">
        <div className=" flex flex-col ">
          <div className="  font-semibold ">Personal Details</div>
          <div className=" text-richblack-300 gap-x-16 max-w-[400px] flex mt-8 ">
            {/* left  */}
            <div className=" ">
              <div className=" flex flex-col ">
                <div className=" text-sm ">First Name</div>
                <div className="  font-semibold  text-richblack-25">
                  {user?.firstName}
                </div>
              </div>
              <div className=" flex flex-col my-2 ">
                <div className=" text-sm ">Email</div>
                <div className="   font-semibold  text-richblack-25">
                  {user?.email}
                </div>
              </div>
              <div className=" flex flex-col ">
                <div className=" text-sm ">Gender</div>
                <div className="   font-semibold  text-richblack-25">
                  {user?.additionalDetails?.gender
                    ? `${user.additionalDetails?.gender}`
                    : "Add gender"}
                </div>
              </div>
            </div>
            {/* right */}
            <div className=" ">
              <div className=" flex flex-col ">
                <div className=" text-sm ">Last Name</div>
                <div className="  font-semibold  text-richblack-25">
                  {user?.lastName}
                </div>
              </div>
              <div className=" flex flex-col my-2 ">
                <div className=" text-sm ">Contact Number</div>
                <div className="   font-semibold  text-richblack-25">
                  {user?.additionalDetails?.contactNumber
                    ? `${user.additionalDetails?.contactNumber}`
                    : "Add Contact Number"}
                </div>
              </div>
              <div className=" flex flex-col ">
                <div className=" text-sm ">Date of Birth</div>
                <div className="   font-semibold  text-richblack-25">
                  {user?.additionalDetails?.dateOfBirth
                    ? `${user.additionalDetails?.dateOfBirth}`
                    : "Add Date of Birth"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Iconbtn
          className=" "
          text={"Edit"}
          children={<BiEdit />}
          onClick={() => navigate("/dashboard/settings")}
        />
      </div>
    </div>
  );
}

export default Myprofile;
