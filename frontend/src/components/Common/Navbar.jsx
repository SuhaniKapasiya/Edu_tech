import React from "react";
import { NavbarLinks } from "../../../src/data/navbar-links";
import { Link, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart, AiOutlineDown } from "react-icons/ai";
import Profiledropdown from "../Core/auth/Profiledropdown";
import { useState } from "react";
import { useEffect } from "react";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import ProfileDropdown from "../Core/auth/Profiledropdown";
// require("dotenv").config();

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [subLinks, setSubLinks] = useState([]);

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      // console.log("Printing Sublinks result:", result);
      setSubLinks(result.data.data);
      // console.log(result.data.data);
    } catch (error) {
      console.log("Could not fetch the category list");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  const location = useLocation();
  const matchroute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="border-b-[1px]   z-50 h-10 border-richblack-400 justify-center items-center max-w-full flex">
      <div className=" flex items-center text-center w-[80%]  justify-between  bg-richblack-900 text-white  ">
        {/* logo  */}
        <Link to="/" className=" w-32 ">
          <img src={logo} alt="" />
        </Link>

        {/* nav links  */}
        <nav>
          <ul className=" flex gap-x-6 ">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className=" flex relative items-center  justify-center gap-x-2 group">
                    <p>{link.title}</p>
                    <AiOutlineDown />

                    {/* hover karne pr aaega ye  */}
                    <div className=" absolute invisible  left-[50%] flex flex-col rounded-md bg-richblack-5 p-3 text-richblack-900 transition-all duration-200 opacity-0 group-hover:visible group-hover:opacity-100 w-[250px] top-10 z-10 translate-x-[-50%] ">
                      {subLinks.length ? (
                        <div>
                          {subLinks.map((subLink, index) => (
                            <Link
                              to={`catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              key={index}
                            >
                              <p>{subLink.name}</p>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div> data not found</div>
                      )}
                      <div className=" absolute invisible  left-[50%] bg-richblack-5 w-[25px] translate-x-4 rotate-45 h-[25px] transition-all duration-200 opacity-0 group-hover:visible group-hover:opacity-100  z-10 -top-2 rounded-sm "></div>
                    </div>
                  </div>
                ) : (
                  <p
                    className={`${
                      matchroute(link?.path)
                        ? " text-yellow-25 "
                        : " text-richblack-25 "
                    }`}
                  >
                    <Link to={link?.path}>{link.title}</Link>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* login signup dashboard  */}
        <div className=" flex  gap-x-4  ">
          {/* cart  */}
          {user && user?.accountType !== "Instructor" && (
            <Link className=" relative items-center justify-center   " to="/dashboard/cart">
              <AiOutlineShoppingCart
                size={25}
                className=" text-white z-20 mt-2 "
              />
              {totalItems > 0 && <span className=" text-xs  bg-richblack-5 text-richblack-800 w-4  rounded-full absolute left-2  top-1 z-10 ">{totalItems}</span>}
            </Link>
          )}

          {token !== null && <ProfileDropdown />}

          {/* login btn  */}
          {token === null && (
            <Link to="/login">
              {" "}
              <div className=" border-[1px] text-richblack-300 border-richblack-400 px-2 bg-richblack-800 py-1 rounded-md ">
                {" "}
                Log in
              </div>
            </Link>
          )}

          {/* signup button  */}
          {token === null && (
            <Link to="/signup">
              {" "}
              <div className=" border-[1px] bg-richblack-800 text-richblack-300 border-richblack-400 px-2 py-1 rounded-md ">
                {" "}
                Sign up
              </div>
            </Link>
          )}

          {/* token null nahi hai  */}
          {/* {token !== null && <Profiledropdown />} */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
