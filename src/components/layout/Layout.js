import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import "./layout.css";

function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();

  const navigate = useNavigate();
  const getData = async () => {
    toast.loading();
    try {
      const token = localStorage.getItem("user");
      const response = await axios.get("/api/user/get-user-info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.dismiss();
      if (response.data.success) {
        setUserInfo(response.data.data);
        console.log(response.data.data);
      } else {
        localStorage.removeItem("user");
        navigate("/login");
        toast.error("Something went wrong");
      }
    } catch (error) {
      localStorage.removeItem("user");
      navigate("/login");
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (userInfo == null) {
      getData();
    }
  }, [userInfo]);

  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Mechanic",
      path: "/apply-doctor",
      icon: "ri-tools-fill",
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctorslist",
      icon: "ri-user-star-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
  ];
  const user = userInfo?._doc;

  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;
  // const menuToBeRendered = userMenu;
  // console.log(userInfo._doc.isAdmin);
  return (
    <div className="menu-all">
      <header className="flex justify-between items-center bg-blue-300 p-4">
        <div className="flex">
          <i
            className="ri-close-fill  hover:bg-blue-400 cursor-pointer"
            onClick={() =>
              collapsed ? setCollapsed(false) : setCollapsed(true)
            }
          ></i>
          {}
        </div>
        <div className="flex ">
          <i className="ri-notification-4-line pr-2"></i>
          <a href="/profile">
            <u>{user?.name}</u>
          </a>
        </div>
      </header>
      <div className="flex">
        <div
          className={`${
            collapsed
              ? "flex flex-col w-20 h-screen px-4 py-8  overflow-y-auto border-r "
              : "flex flex-col w-50 h-screen px-4 py-8 overflow-y-auto border-r"
          }`}
        >
          {collapsed ? (
            <h2 className="text-3xl font-semibold text-center text-black">
              <i className="ri-motorbike-fill"> </i>
            </h2>
          ) : (
            <h2 className="text-3xl font-semibold text-center text-black">
              <i className="ri-motorbike-line"> Service</i>
            </h2>
          )}

          {menuToBeRendered.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <div
                className={`flex flex-col justify-between mt-6 ${
                  isActive && "active-menu-item"
                }`}
              >
                {collapsed ? (
                  <div className="flex items-center  py-3 text-gray-700 rounded-md hover:bg-gray-200 ">
                    <span className="mx-4 font-medium">
                      <Link to={menu.path}>
                        <i className={`pr-2 ${menu.icon}`}></i>
                      </Link>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center  py-3 text-gray-700 rounded-md hover:bg-gray-200 ">
                    <span className="mx-4 font-medium">
                      <i className={`pr-2 ${menu.icon}`}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </span>
                  </div>
                )}
              </div>
            );
          })}
          <div
            className={`flex flex-col justify-between mt-6`}
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            {collapsed ? (
              <div className="flex items-center  py-3 text-gray-700 rounded-md hover:bg-gray-200 ">
                <span className="mx-4 font-medium">
                  <i className={`pr-2 ri-logout-box-line`}></i>
                </span>
              </div>
            ) : (
              <div className="flex items-center  py-3 text-gray-700 rounded-md hover:bg-gray-200 ">
                <span className="mx-4 font-medium">
                  <i className="flex justify-center items-center pr-2 ri-logout-box-line "></i>
                  <h1 text-xl> Logout</h1>
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="w-full h-full p-4 m-8 overflow-y-auto">
          <div className="text-4xl "></div>
        </div>
      </div>
    </div>
  );
}

export default Layout;

{
  /* <div>
<header className="flex justify-between items-center bg-blue-300 p-4">
  <div class="flex">Left</div>
  <div class="flex">Right</div>
</header>
<div class="flex">
  <div class="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto border-r">
    <h2 class="text-3xl font-semibold text-center text-blue-800">Logo</h2>

    <div class="flex flex-col justify-between mt-6">
      <aside>
        <ul>
          <li>
            <a
              class="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md "
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>

              <span class="mx-4 font-medium">Dashboard</span>
            </a>
          </li>

          <li>
            <a
              class="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200"
              href="/check"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <span class="mx-4 font-medium">Settings</span>
            </a>
          </li>
        </ul>
      </aside>
    </div>
  </div>
  <div class="w-full h-full p-4 m-8 overflow-y-auto">
    <div class="flex items-center justify-center p-40 border-4 border-dotted">
      {children}
    </div>
  </div>
</div>
</div> */
}
