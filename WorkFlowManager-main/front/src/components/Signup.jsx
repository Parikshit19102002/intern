import React from 'react'
import {Link} from 'react-router-dom'
// import Login from './login'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = async(data) => {
    console.log("onsubmit data",data)
    const userinfo={
      username:data.username,
      password:data.password,
      email:data.email
    }
  await  axios.post("http://localhost:4000/register",userinfo)
    .then((res)=>{
      console.log("response ",res.data)
      if(res.data){
        console.log(res.data.data);
        localStorage.setItem("user", JSON.stringify(res.data.data));
       
        // You can also store a token if your backend provides one
        localStorage.setItem("token", res.data.token);
        navigate('/');
        toast.success('signup successfully!!')
        // window.location.href = '/';
      }
    }).catch((err) => {
      if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("Error response data: ", err.response.data);
          console.log("Error response status: ", err.response.status);
          console.log("Error response headers: ", err.response.headers);

          // Here you can handle the error response and show a message to the user
          // Example using toast
          toast.error("Error: " + err.response.data.message);

          // Or alert
          // alert("Error: " + err.response.data.message);
      } else {
          // Something happened in setting up the request that triggered an Error
          toast.error("Error message: ", err.message);
      }
  });


  }
  return (
    <div className='flex min-h-[100vh] items-center justify-center '>
      <form action="" 
      onSubmit={handleSubmit(onSubmit)}
      className='relative bg-slate-200 text-black dark:bg-slate-800 dark:text-white p-10 flex flex-col space-y-4 rounded-md'>
      <Link to={'/'} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
      <h3 className="font-bold text-lg">Sign Up!</h3>
     
     <div>
<label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input type="email" className="grow" placeholder="Email"
    {...register("email", { required: true })}  />
</label>

{errors.email && <span  className='text-xs text-red-500 mt-5'>*This field is required</span>}
</div>

<div>
<label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
  </svg>
  <input type="text" className="grow" placeholder="Username" 
    {...register("username", { required: true })} />
</label>
{errors.username && <span  className='text-xs text-red-500 mt-5'>*This field is required</span>}
</div>

<div>
<label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg>
  <input type="password" className="grow" placeholder='password' 
    {...register("password", { required: true })} />
</label>

{errors.password && <span  className='text-xs text-red-500 mt-5'>*This field is required</span>}
</div>
<div className='flex justify-between  items-center'>
        <button className='btn btn-success'>SignUp</button>
        <p>Already user?  
           <Link to={'/login'}
               >   <span className='underline cursor-pointer text-blue-500'>Login</span> 
           
           </Link>
           
             </p>
        </div>
      </form>
    </div>
  )
}
