import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../data/Navbar-option";

function Navbar() {
  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-500">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to="/">
          <img src={Logo} alt="ourlogo" width={160} height={32} />
        </Link>
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((item, index) => (
              <li key={index}>
                {item.title === "Catalog" ? (
                  <div></div>
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
      </div>
    </div>
  );
}

export default Navbar;
