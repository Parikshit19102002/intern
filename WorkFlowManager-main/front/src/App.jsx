import React, { useState ,useEffect} from 'react'
import Home from './Home/Home'
import toast, { Toaster } from 'react-hot-toast';
import {Routes,Route} from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import Assign from './components/Assign';
import AssignmentList from './components/AssignmentList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AddEmployee from './components/AddEmployee';




export default function App() {
  const [islogin,setlogin]= useState(false);
 
   const [assignments, setAssignments] = useState([]);


 

   useEffect(() => {
       // Check if user is logged in by looking in localStorage
       const storedUser = localStorage.getItem("user");
       console.log("inside useeffect",storedUser)
       if (storedUser) {
         try {
            setlogin(true);
            const user = JSON.parse(storedUser);
            // Proceed with using `user`
        } catch (error) {
            console.error("Error parsing user data from localStorage", error);
            // Handle the error or reset localStorage if needed
        }
    }
   });
   
  return (
  <div>
  <div >
    {/* {console.log(currentUser)} */}
        <Navbar islogin={islogin} />
        <Routes>
          <Route index path='/' element={<Home islogin={islogin}/> }/>
          <Route path='/login' element={<Login islogin={islogin} setlogin={setlogin} />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/addEmployee'  element={islogin? <AddEmployee /> :<Login islogin={islogin} setlogin={setlogin} />} />
          <Route path='/assign'  element={islogin? <Assign islogin={islogin} assignments={assignments} setAssignments={setAssignments} /> :<Login islogin={islogin} setlogin={setlogin} />} />
          <Route path='/assignments'  element={ islogin?  <AssignmentList assignments={assignments} islogin={islogin} />:<Login islogin={islogin} setlogin={setlogin} />} />

        
        </Routes>

        <Footer/>
     
    </div>
 
  </div>

    
  )
}
