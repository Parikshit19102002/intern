import React, { useEffect, useState } from 'react';
// import EmployeeList from './EmployeeList';
// import ShiftList from './ShiftList';
import AssignmentForm from './AssignmentForm.jsx';
import AssignmentList from './AssignmentList';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';



const Assign = ({islogin,assignments, setAssignments}) => {
  const [employees,setemployees] = useState([
    // { id: 1, username: 'Alice' },
    // { id: 2, username: 'Bob' },
    // { id: 3, username: 'Cat' },
    // { id: 4, username: 'Don' },
    // Add more employees as needed
  ]);

  const [shifts] = useState([
    { id: 1, name: 'Morning', time: '9 AM - 1 PM' },
    { id: 2, name: 'Afternoon', time: '1 PM - 5 PM' },
    { id: 3, name: 'Evening', time: '4 PM - 9 PM' },
    { id: 4, name: 'Night', time: '7 PM - 12 PM' },
    // Add more shifts as needed
  ]);

  const [days]=useState([
   { id:1,day:'Monday'},
   { id:2,day:'Tueday'},
   { id:3,day:'Wednesday'},
   { id:4,day:'Thursday'},
   { id:5,day:'Friday'},
   { id:6,day:'Saturday'},

  ])



  const handleAssign = (employee, shift,day) => {
    setAssignments([...assignments, { employee , shift,day }]);
    console.log("inside assign",assignments)
  };


  useEffect(() => {
    // Define an async function inside the effect
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:4000/allEmployees");
        console.log("all employees list in assign", response.data.employees);
        console.log("all shift list in assign", response.data.shifts);
        setemployees((prevEmployees) => [...prevEmployees, ...response.data.employees]);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
  
    // Call the async function
    fetchEmployees();
  }, []);
  
  
  return (
 


    <div>
      {/* <Navbar islogin={islogin} /> */}
      <div className='min-h-screen '>

     <u>
      <h1 className='font-semibold text-3xl text-center mt-6'>Employee Shift Assignment</h1>
      
      </u> 
      <AssignmentForm days={days} employees={employees} shifts={shifts} onAssign={handleAssign} />
      {/* <AssignmentList assignments={assignments} /> */}
      </div>
      {/* <Footer/> */}
    </div>

  );


};

export default Assign;
