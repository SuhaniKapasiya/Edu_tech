import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
// import Navbar from "./Components/Core/Common/Navbar";
import Navbar from "./Components/Common/Navbar";
import OpenRoute from "./Components/Core/auth/OpenRoute";
// pages import
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Error from "./pages/Error";
import Forgotpassword from "./pages/Forgotpassword";
import Updatepassword from "./pages/Updatepassword";
import Varifyemail from "./pages/Varifyemail";
import About from "./pages/About";
import Contactus from "./pages/Contactus";
import Dashboard from "./pages/Dashboard";
import Myprofile from "./Components/Core/dashboard/Myprofile";
import Privateroute from "./Components/Core/auth/Privateroute";
import EnrolledCourses from "./Components/Core/dashboard/EnrolledCourses";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Components/Core/dashboard/cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import Settings from "./Components/Core/dashboard/settings/Settings";
import Addcourse from "./Components/Core/dashboard/addcourse";
import Mycourses from "./Components/Core/dashboard/Mycourses";
import Editcourse from "./Components/Core/dashboard/Editcourse/Index";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./Components/Core/viewcourse/VideoDetails";
import Instructor from "./Components/Core/dashboard/instructordashboard/Instructor";

function App() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.profile);
  return (
    <div className=" w-screen text-richblack-25 bg-richblack-900  flex flex-col font-inter ">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        {/* forgot passwrd  */}
        <Route path="forgotpassword" element={<Forgotpassword />} />
        {/* forgot passwrd  */}
        <Route path="updatepassword/:id" element={<Updatepassword />} />
        {/* forgot passwrd  */}
        <Route
          path="varifyemail"
          element={
            <OpenRoute>
              <Varifyemail />
            </OpenRoute>
          }
        />
       
        <Route path="about" element={<About />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path="contact" element={<Contactus />} />
        <Route
          element={
            <Privateroute>
              <Dashboard />
            </Privateroute>
          }
        >
          
          <Route path="dashboard/my-profile" element={<Myprofile />} />
          <Route path="dashboard/settings" element={<Settings />} />
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
            </>
          )}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/add-course" element={<Addcourse />} />
              <Route path="dashboard/my-courses" element={<Mycourses />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<Editcourse />}
              />
              <Route path="dashboard/instructor" element={<Instructor />} />
            </>
          )}
        </Route>

        <Route
          element={
            <Privateroute>
              <ViewCourse />
            </Privateroute>
          }
        >
          {user?.accountType == "Student" && (
            <>
              <Route
                path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
