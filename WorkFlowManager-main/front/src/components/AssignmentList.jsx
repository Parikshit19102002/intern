import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const AssignmentList = ({ assignments, islogin }) => {
  const navigate = useNavigate();
  const [assigned, setAssigned] = useState([]);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get("http://localhost:4000/allAssigned"); // Updated URL
        console.log("all assigned entries", response.data.data);
        setAssigned(response.data.data);
      } catch (error) {
        console.error("Error fetching assigned data:", error);
        toast.error("Failed to fetch assignments ☠️");
      }
    };

    fetchAssignment();
  }, []);

  const sendEmail = async (assignment) => {
    try {
      const response = await axios.post("http://localhost:5000/sendEmail", { // Updated URL
        to: assignment.useremail,
        username: assignment.username,
        date: datefunc(assignment.date),
        shiftNumber: assignment.shiftNumber,
      });
      toast.success(`Email sent to ${assignment.username} 📨`);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error(`Failed to send email to ${assignment.username} ☠️`);
    }
  };

  const validityHandler = async () => {
    try {
      const response = await axios.get("http://localhost:4000/checkAssignment"); // Updated URL
      console.log("validity of assignment", response.data.validity);

      if (!response.data.validity) {
        falseHandler();
      } else {
        toast.success("Congratulations 🐳");

        // Send an email to each assignment after successful validation
        for (const assignment of assigned) {
          await sendEmail(assignment);
        }
      }
    } catch (error) {
      console.error("Error checking validity:", error);
      toast.error("Error checking validity ☠️");
    }
  };

  const falseHandler = async () => {
    try {
      const response = await axios.get("http://localhost:4000/deleteAssigned"); // Updated URL
      console.log("Successful deletion !!");
      console.log(response.data);
      toast.success(response.data + "🐳");
      navigate('/assign');
    } catch (error) {
      console.error("Error during deletion", error);
      toast.error("Error during deletion ☠️");
    }
  };

  function weekfunc(dateString) {
    const date = new Date(dateString);
    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
    return weekday;
  }

  function datefunc(dateString) {
    const date = new Date(dateString);
    const dateOnly = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return dateOnly;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-2xl text-center font-semibold mt-4 mb-6">
        Assignments
      </h3>
      <ul className="min-h-[70vh] w-6/12 flex flex-col space-y-3">
        {assigned.map((assignment, index) => (
          <li className="px-3 py-2 bg-green-800 w-full text-white" key={index}>
            <div className="flex justify-between text-white">
              <span>{index + 1}. {"  "}{assignment.username}</span>
              <span>{datefunc(assignment.date)}</span>
              <span>{weekfunc(assignment.date)}</span>
              <span>{assignment.shiftNumber}</span>
            </div>
          </li>
        ))}
      </ul>
      <button
        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800"
        onClick={validityHandler}
      >
        Check validity
      </button>
    </div>
  );
};

export default AssignmentList;
