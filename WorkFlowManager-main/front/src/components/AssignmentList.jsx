import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
const AssignmentList = ({ assignments, islogin }) => {
  const [assigned, setAssigned] = useState([]);
  useEffect(() => {
    // Define an async function inside the effect
    const fetchAssignment = async () => {
      try {
        const response = await axios.get("http://localhost:4000/allAssigned");
        console.log("all assigned entries", response.data.data);
        setAssigned(response.data.data);
      } catch (error) {
        console.error("Error fetching assigned data:", error);
      }
    };

    // Call the async function
    fetchAssignment();
  }, []);

  function weekfunc(dateString) {
    const date = new Date(dateString);

    // Extract weekday and date
    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });

    return weekday;
  }
  function datefunc(dateString) {
    const date = new Date(dateString);

    // Extract weekday and date

    const dateOnly = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return dateOnly;
  }

  return (
    <div className=" flex flex-col justify-center items-center">
      {/* <Navbar islogin={islogin}/> */}
      <h3 className="text-2xl text-center font-semibold mt-4 mb-6">
        Assignments
      </h3>
      {console.log("inside ass list", assigned)}
      <ul className="min-h-[70vh] w-6/12 flex flex-col space-y-3">
        {assigned.map((assignment, index) => (
          <li className="px-3 py-2 bg-green-800 w-full text-white ">
            <div className="flex justify-between text-white">
              <span>
                {/* {assignment.employee.employeeId}. {" "} */}
                {index + 1}. {"  "}
                {assignment.username}
              </span>
              <span>{datefunc(assignment.date)}</span>
              <span>{weekfunc(assignment.date)}</span>
              <span>{assignment.shiftNumber}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* <Footer/> */}

      <button  class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800">Check validity</button>
    </div>
  );
};

export default AssignmentList;
