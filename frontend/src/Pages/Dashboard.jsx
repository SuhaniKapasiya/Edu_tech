import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Core/dashboard/Sidebar";

function Dashboard() {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);
  
  if (profileLoading || authLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className=" flex relative min-h-[calc(100vh-2.5rem)] text-richblack-25 ">
      <Sidebar />
      <div className="min-h-[100vh]  overflow-x-hidden w-full px-40">
        <div className=" mx-auto py-10 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;