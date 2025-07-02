import logo from "../assets/assets_frontend/logo.svg";
import Button from "./Button";
import { assets } from "../assets/assets_frontend/assets";
import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query"
import { getPatients } from "../api/patients";
import Skeleton from "react-loading-skeleton";

const Nav = () => {
  const { isAuthenticated, logout } = useAuth();
  const [showDropDown, setShowDropDown] = useState(false);
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["user-data"],
    queryFn: getPatients,
  })

  const tabs = [
    {
      title: "HOME",
      path: "/",
    },
    {
      title: "ALL DOCTORS",
      path: "/doctors",
    },
    {
      title: "ABOUT",
      path: "/about",
    },
    {
      title: "CONTACT",
      path: "/contact",
    },
  ];

  return (
    <nav className="flex justify-between items-center border-b border-[#ADADAD] py-4 mb-10">
      <div>
        <Link to="/">
          <img src={logo} alt="Logo" className="object-contain" />
        </Link>
      </div>
      <div className="hidden md:block">
        <ul className="flex gap-6 text-[16px] text-[#1F2937] font-medium font-poppins">
          {tabs.map((tab) => (
            <li>
              <NavLink
                to={tab.path}
                className={({ isActive }) =>
                  `border-b-2 pb-2 ${isActive ? "border-b-primary" : "border-b-transparent"}`
                }
              >
                {tab.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      {
        isLoading ?
        <Skeleton width={20} height={20} /> :
        <div className="hidden md:block relative">
          <Link to="/register" className={`${isAuthenticated && "hidden"}`}>
            <Button text="Create Account" bgColor="primary" textColor="white" />
          </Link>
          <button
            className={`${!isAuthenticated && "hidden"} flex gap-3 items-center cursor-pointer`}
            onClick={() => setShowDropDown(!showDropDown)}
          >
            <img src={`${data.results[0].image}`} className="rounded-full size-12" />
            <img src={assets.dropdown_icon} />
          </button>
          <div
            className={`${!(showDropDown && isAuthenticated) && "hidden"} flex flex-col shadow-xl py-6 gap-3 w-52 px-4 justify-start bg-[#F8F8F8] text-[#4B5563] font-outfit text-lg absolute top-17 right-0`}
          >
            <Link to="/me" className="cursor-pointer">
              My Profile
            </Link>
            <Link to="/appointments" className="cursor-pointer w-full">
              My Appointments
            </Link>
            <button
              onClick={() => {
                logout();
                toast.success("You've been logged out successfully");
                navigate("/");
              }}
              className="text-start cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      }
      <div className="md:hidden">
        <button className="text-2xl text-[#1F2937]">
          <img src={assets.burger_menu} className="size-8" />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
