import React from "react";
import { useSelector } from "react-redux";
import Iconbtn from "../../../Common/Iconbtn";
import { useNavigate } from "react-router-dom";
import Changeprofilepicture from "./Changeprofilepicture";
import EditProfile from "./EditProfile";
import Changepassword from "./Changepassword";
import Deleteprofile from "./Deleteprofile";

function Settings() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <div className=" gap-y-8  w-[80vw] mx-auto flex  items-center flex-col ">
      <div className=" text-3xl flex w-[650px]   font-semibold text-richblack-25 ">
        Edit Profile
      </div>

      {/* section 1 */}
      <Changeprofilepicture />

      {/* section 2 */}
      <EditProfile />

      {/* section 3  */}
      <Changepassword />
      
      {/* section 4  */}
      <Deleteprofile />
    </div>
  );
}

export default Settings;
