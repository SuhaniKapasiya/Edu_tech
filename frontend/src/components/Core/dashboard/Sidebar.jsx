import React from "react";
import { sidebarLinks } from "../../../data/dashboard_links";
import { logout } from "../../../service/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import Sidebarlinks from "./SidebarLink";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Confirmationmodal from "../../ConfirmationModal";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfermationModal] = useState(null);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  if (profileLoading || authLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className=" flex flex-col   bg-richblack-800 py-10 h-auto min-w-[222px] border-r-[1px] border-richblack-700 ">
      <div className="flex flex-col">
        {sidebarLinks.map((link) => {
          if (link.type && user?.accountType !== link.type) return null;
          return (
            <Sidebarlinks key={link.id} link={link} iconName={link.icon} />
          );
        })}
      </div>
      <div className="  mx-auto my-6 h-[1px] w-10/12 bg-richblack-600 "></div>
      <div className=" flex flex-col gap-y-2 ">
        <Sidebarlinks
          link={{
            name: "Settings",
            path: "/dashboard/Settings",
          }}
          iconName={"VscSettingsGear"}
        />
        <button
          onClick={() => {
            setConfermationModal({
              text1: "Are You Sure.?",
              text2: "You will be logged out of your account",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfermationModal(null),
            });
          }}
        >
          <div className="px-8  text-sm font-medium flex justify-left items-center gap-x-2 ">
            <BiLogOut size={20} />
            Logout
          </div>
        </button>
      </div>
      {confirmationModal && <Confirmationmodal modalData={confirmationModal} />}
    </div>
  );
}

export default Sidebar;