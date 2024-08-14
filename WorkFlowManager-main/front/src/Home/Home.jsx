import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
// import Login from '../components/Login'

export default function Home( {islogin}) {
  return (
    <div>
      {/* <Navbar islogin={islogin} /> */}
      {/* <div
  className="hero min-h-screen bg-emerald-600"
 >
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
      <p className="mb-5">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <Link className="btn btn-primary" to='/login'>Get Started</Link>
    </div>
  </div>
</div> */}
  <div className="bg-[url('../public/nits2.jpg')] bg-no-repeat bg-cover bg-center text-white py-20 h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl text-emerald-900 font-bold sm:text-5xl lg:text-6xl  ">
          Welcome to Employee Management System
        </h1>
        <p className="mt-4 text-black text-lg font-semibold  sm:text-xl lg:text-2xl">
          Efficiently manage your employees, track performance, and boost productivity.
        </p>
        <div className="mt-8 flex justify-center ">
          <Link
             to={'/assign'}
            className="inline-block bg-white text-emerald-700 font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100"
          >
            Get Started
          </Link>
          <Link
            to={'/signup'}
            className="ml-4 inline-block bg-transparent border border-emerald-700 text-gray-700 font-semibold px-6 py-3 rounded-md shadow hover:bg-emerald-700"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
    {/* <Footer/> */}
    </div>
  )
}
