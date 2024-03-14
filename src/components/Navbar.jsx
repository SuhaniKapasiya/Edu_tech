import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../data/Navbar-option";
import { useSelector } from "react-redux";
import { BsChevronDown } from "react-icons/bs"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropdown from "./Core/auth/ProfileDropdown";
import { ACCOUNT_TYPE } from "./utils/constants";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-500">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* logo */}
        <Link to="/">
          <img src={Logo} alt="ourlogo" width={160} height={32} />
        </Link>
        {/* navliks  home about us*/}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((item, index) => (
              <li key={index}>
                {item.title === "Catalog" ? (
                  <div className="flex">
                    <p>{item.title}</p>
                    <BsChevronDown />
                  </div>
                ) : (
                  <NavLink
                    className={({ isActive }) =>
                      `${isActive ? "text-yellow-25" : "text-richblack-25"}`
                    }
                    to={item.path}
                  >
                    {item.title}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
