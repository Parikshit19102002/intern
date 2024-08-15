import React, { useState ,useEffect} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
// import toast, { Toaster } from 'react-hot-toast';
import { useForm } from "react-hook-form"
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function AddEmployee({islogin,setlogin}) {
  useEffect(()=>
    {
      const storedUser = localStorage.getItem("user");
      console.log("inside login ",storedUser)
    })
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = async(data) => {
    console.log(data)
    const userinfo={
      username:data.username,
      employeeId:data.employeeId,
      useremail:data.email
      
    }

  // fetch('http://localhost:4000/login', {
  //   method: 'POST',
  //   // mode: 'no-cors'
  //   credentials: 'include'
  //   // Other request options...
  // })
  await  axios.post("http://localhost:4000/addEmployee",userinfo).then((res)=>{
      console.log("login then prr",res.data)
      // console.log(res.data)
        if(res.data){
        navigate('/assign');
        toast.success('added successfully!!')
 // Store user details in localStorage
 console.log(res.data.data);

        // toast('login successfully!!')
        // window.location.href = '/';
        // alert("login successfully!!")
      }
    }).catch((err)=>{
      // alert("login error",  err)
      console.log("login error: "+ err)
      toast.error("some error occured " + err)
    })


  }



  return (
<>


    <div className=' flex flex-col items-center justify-center min-h-[90vh]'>

      <div className='border border-emerald-500 rounded-md px-5 py-5'>
       <form action="" onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-3xl mb-4 text-center'>New Employee</h1>
        <hr className=" border-emerald-500 my-4"/>
        <div  className='space-y-4 mt-5'>
      
  <input type="text" className="input input-bordered flex items-center gap-2" placeholder="Employee Id"
     {...register("employeeId", { required: true })}  />
  <input type="text" className="input input-bordered flex items-center gap-2" placeholder="Username" 
     {...register("username", { required: true })} />
     <input type="email" className="input input-bordered flex items-center gap-2" placeholder="Email" 
     {...register("email", { required: true })} />


    </div>
    <div className='w-full flex justify-around items-center'>
    <button className='btn btn-success mt-6'> Submit</button>
     {/* <Link to={'/signup'} > Not a user <div className=' text-emerald-500'> Signup </div></Link> */}

    </div>
    </form> 
      </div>

    </div>


    </>  
  )
}
