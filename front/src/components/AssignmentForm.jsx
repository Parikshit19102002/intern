import React, { useState } from 'react';
import EmployeeList from './EmployeeList';
import ShiftList from './ShiftList';
import AssignmentList from './AssignmentList';
import Day from './Day';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
// import { AppContext } from "../context";
const AssignmentForm = ({ days,employees, shifts, onAssign }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleAssign = async() => {
    if (selectedEmployee && selectedShift && selectedDay) {
      console.log("assign form",selectedEmployee, selectedShift,selectedDay);
      onAssign(selectedEmployee, selectedShift,selectedDay);


const userinfo={
  employeeId:selectedEmployee._id,
  day:selectedDay.fullDate,
  shift:selectedShift.time


};
console.log("just before request ",userinfo)
      await  axios.post("http://localhost:4000/addAssigned",userinfo)
      .then((res)=>{
        console.log("login then prr",res.data)
        // console.log(res.data)
        if(res.data){
          // navigate('/');
          toast.success(res.data.message)
   // Store user details in localStorage
  //  console.log(res.data.data);
  
          // toast('login successfully!!')
          // window.location.href = '/';
          // alert("login successfully!!")
        }
      }).catch((err)=>{
        // alert("login error",  err)
        console.log("error in adding assign: "+ err)
        toast.error("not assigned " + err)
      })
  





    }
  };

  return (
    <div>
      {/* <h3>Assign Employee to Shift</h3> */}
      <div className='flex  justify-around  items-baseline mt-8'>
       {
        // console.log("wrker",employees)
       }
      <EmployeeList employees={employees} onSelect={setSelectedEmployee} />
      <Day  days={days} onSelect={setSelectedDay} />
      <ShiftList shifts={shifts} onSelect={setSelectedShift} />
      </div>
      <div className='w-screen flex items-center justify-center mt-2'>
      <button  className='btn btn-error mt-5 text-white'  onClick={handleAssign}>Assign</button>

      </div>

      <div>
        {/* <AssignmentList assignments={assignments} islogin={islogin}/> */}
      </div>
    </div>
  );
};

export default AssignmentForm;
