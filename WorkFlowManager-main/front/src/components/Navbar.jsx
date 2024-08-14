import React from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
export default function Navbar({ islogin }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    // Optionally clear state and redirect to login page
    window.location.href = "/";
    toast.success("logged out successfully");
    // window.location.href = '/login';
  };
  // const user = JSON.parse(localStorage.getItem("user"));
  const user = localStorage.getItem("user");
  let parsedUser = null;
  if (user) {
    try {
      parsedUser = JSON.parse(user);
      // Now you can use parsedUser safely
    } catch (error) {
      console.error("Error parsing user data:", error);
      // Handle parsing error, if necessary
    }
  } else {
    // Handle case where there is no user data in localStorage
    console.log("No user data found in localStorage.");
  }

  console.log("inside navbar", user, parsedUser);
  return (
    <div className=" shadow-md sticky top-0 z-50">
      <nav className="navbar bg-base-100 flex justify-center items-center ">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" to={"/"}>
            EMS
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 space-x-4">
            {user && (
              <li>
                <button class="text-white   focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400  ">
                  welcome {parsedUser.username}{" "}
                </button>
              </li>
            )}
            {!user && (
              <li>
                <Link
                  to={"/signup"}
                  class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800"
                >
                  Signup
                </Link>
              </li>
            )}
            {user && (
              <li>
                <Link to={"/addEmployee"} class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
                  Add Employee
                </Link>
              </li>
            )}
            {user ? (
              <li>
                <button onClick={handleLogout}  class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800">
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link
                  to={"/login"}
                  class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                >
                  Login
                </Link>
              </li>
            )}
            {user && (
              <li>
                <Link to={"/assign"} class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
                  Start
                </Link>
              </li>
            )}
            {user && (
              <li>
                <Link to={"/assignments"} class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">
                  View Assignments
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
