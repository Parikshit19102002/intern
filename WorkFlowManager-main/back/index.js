const mongoose = require('mongoose');
const express=require('express');
const User=require('./templete/login-register.js');
const Employee=require('./templete/employee.js');
const passport = require('passport');
const session=require('express-session');
const path=require('path');
const cors=require('cors')

// const express = require('express');
// const cors = require('cors');

const app = express();

// Enable CORS for all routes
const corsOptions = {
  origin: [
    'http://localhost:3000', // Your frontend origin (e.g., React app)
    'http://localhost:4000', // Another allowed origin (if needed)
  ],
  credentials: true, // Allow credentials (cookies, authentication)
};

app.use(cors(corsOptions));

const ejsMate=require('ejs-mate');
const LocalStrategy = require('passport-local');
const MongoStore=require('connect-mongo')
const bodyParser=require('body-parser');
const {isLoggedIn}=require('./midleWare.js');
const Shift=require('./templete/shift.js');
const employee = require('./templete/employee.js');
const { emphasize } = require('@mui/material');
// const app=express();
app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.json());
// app.use(express.json());
app.use(bodyParser.urlencoded({extended :true}));
app.use(session({secret:'hellow',resave:false,saveUninitialized:true,
  cookie:{
     httpOnly:true,
     expires:Date.now()+7*24*60*60*1000,
     maxAge:7*24*60*60*1000
}}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// added after

// app
//   .use(
//     cors({
//       origin: [
//         "http://localhost:3000",
//         "http://localhost:3000/",
//         "http://localhost:3000/login"
//       ],
//       credentials: true,
//       exposedHeaders: ["set-cookie"],
//     })
//   )
// mongoose.connect('mongodb://127.0.0.1:27017/ems');

try{

  mongoose.connect('mongodb://127.0.0.1:27017/test',{
      useNewUrlParser:true,
      useUnifiedTopology:true
  }).then(()=>{
    console.log("connected to mongoDB")
  }).catch(()=>{
    console.log("WTF");
  })
  
  }
  catch(e){
      console.log("error haii",e)
  }



app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    next();
 });


app.get('/',isLoggedIn,(req,res,next)=>{
    res.send("Hellow!!!");
})

app.get('/employee',isLoggedIn,(req,res,next)=>{
    res.send("Hellow!!!");
})

// for employee list 
app.get('/allEmployees', async (req, res, next) => {
  try {
    const employees = await Employee.find({});
    // console.log("in the back",JSON.stringify(employees, null, 2));
   

   



    const shifts= await Shift.find({});

    res.status(200).json({
      message: "Employees fetched successfully!",
      employees: employees,
      shifts:shifts
      
    });
  } catch (err) {
    console.error("Error fetching employees:", err);
    next(err); // Pass the error to error-handling middleware
  }
});
// app.get('/register',(req,res)=>{
//    res.render('register.ejs');
// })

// app.get('/login',(req,res)=>{
//     res.render('login.ejs');
// })

app.get('/logout',(req,res)=>{
        req.session.destroy((err) => {
            if (err) {
                return res.redirect('/');
            }
            res.clearCookie('connect.sid');
            res.redirect('/login');
        });
})

app.post('/register',async (req,res)=>{
    console.log("inside signup post",req.body)
      const {username,email,password}=req.body;
      const user=new User({username,email});
      console.log(user);
      const find_existing=await User.findOne({email});
      console.log(find_existing)

              if(find_existing)
            {
              console.log("already h bro!!")
                return res.status(400).json({message:"user aleady exist !!"})
            }

      // const h=await User.register(user,password);
      // req.login(h,(err)=>{
      //    if(err) return next(err);
      //   //  res.redirect('/');
      // })
      // res.status(201).json({
      //   message: "User created successfully!",
      //   user: {
      //     id: h.id,
      //     name: h.username,
      //     email: h.email,
      //   },
      // });
      try {
        const h = await User.register(user, password);
        req.login(h, (err) => {
            if (err) return next(err);
        });

        res.status(201).json({
            message: "User created successfully!",
            data: {
                userid: h.id,
                username: h.username,
                email: h.email,
            },
        });
    } catch (err) {
        if (err.name === 'UserExistsError') {
            // Catch UserExistsError thrown by passport-local-mongoose
            return res.status(400).json({ message: "A user with the given username is already registered" });
        }
        return next(err); // Handle other errors
    }
      // res.redirect('/');
})

app.post('/login',passport.authenticate('local',{failureFlash:false,failureRedirect:'/login'}),(req,res)=>{
   console.log("login back prr",req.body) 
  const url=req.session.returnTo || '/';
    const userdata=req.body;
    delete req.session.returnTo;
    res.status(201).json({
      message:"user login successfully!",
       data:userdata

  })
    // res.redirect(url);
})



// app.get('/employee',async (req,res)=>{
//     const employees=await Employee.find({}).populate('shifts');

//     console.log(employees[0].shifts)
//     res.render('viewEmployee.ejs',{employees});
//   })
  
  // app.get('/addEmployee',isLoggedIn,(req,res)=>{
  //    res.render('employee.ejs');
  // })
  
  app.post('/addEmployee',async (req,res)=>{
  //    const {employeeId,usename}=req.body;
     const employee=new Employee(req.body);
     await employee.save();
     const userdata=req.body;
     res.status(201).json({
      message:"user added successfully!",
       data:userdata

  })
    //  res.redirect('/');

  })

  // app.get('/shift',(req,res)=>{
  //   res.render('shift.ejs')
  // })

  // app.post('/shift',async (req,res)=>{
  //   console.log(req.body);
  //   const shift=new Shift(req.body);
  //   await shift.save();

  //   res.send("hellow!!!")
    
  // })

  // app.get('/allShift',async (req,res)=>{
  //   const employees=await Employee.find({});
  //   const shifts=await Shift.find();
  //   res.render('allShift.ejs',{employees,shifts});
  // })

  app.get('/allAssigned',async(req,res)=>{
    const employees=await Employee.find({});
    console.log(employees)
    const full_details = employees;
console.log("pura details",full_details);
    

    // const shiftsWithUsername = full_details.map(employee =>
    //   employee.shifts.map(shift => ({
    //     username: employee.username,
    //     shiftNumber: shift.shiftNumber,
    //     date: shift.date,
    //     shiftId: shift._id
    //   }))
    // );

    const shiftsWithUsername  = employees.flatMap(employee =>
      employee.shifts.map(shift => ({
        username: employee.username,
        shiftNumber: shift.shiftNumber,
        date: shift.date,
        useremail:employee.useremail
      }))
    );
    
    console.log("final array to return ",shiftsWithUsername);
    if(employees)
    {
      res.status(201).json({
         message:"Successfully fetched data!",
         data:shiftsWithUsername
  
    })
    }
    else
    {
      return res.status(404).json({ message: "problem getting assigned shifts" });
    }
  })


// app.post('/addAssigned',async(req, res) => {
//   console.log("inside back assign",req.body);
//   // const [employeeId,day,shift]=req.body;
//   console.log("inside assign back");
//   // const selections = req.body.selections;
//   const employee=await Employee.findById(req.body.employeeId)
//   employee.shifts.push({date:req.body.day, shiftNumber:req.body.shift});
//   await employee.save();
//   res.status(201).json({
//     message:"user added successfully!",
    

// })
// });
app.post('/addAssigned', async (req, res) => {
  console.log("inside back assign", req.body);

  try {
      // Find the employee by ID
      const employee = await Employee.findById(req.body.employeeId);
      if (!employee) {
          return res.status(404).json({ message: "Employee not found" });
      }

      // Create a new Shift document
      const newShift = new Shift({
          date: req.body.day,
          shiftNumber: req.body.shift,
      });

      // Save the Shift document
      // await newShift.save();
    // const found_shift=Shift.find({ date: req.body.day, shiftNumber: req.body.shift})

    // if (found_shift.length === 0) {
    //   // No shift was found
    //   console.log("No shift found for the specified date and shift number.");
    //   // You can handle the case here, like returning a response to the client
    // } else {
    //   // Shifts were found
    //   console.log("Shift(s) found:", found_shift);
    //   // Proceed with your logic for the found shifts
    // }
      // Push the new Shift's _id into the employee's shifts array

      employee.shifts.push(newShift);

      // Save the updated employee document
      await employee.save();

      // Send a success response
      res.status(201).json({
          message: "Shift assigned successfully!"
      });
      
  } catch (err) {
      console.error("Error assigning shift:", err);
      res.status(500).json({
          message: "Error assigning shift",
          error: err.message
      });
  }
});

function getNext(beforeShift){
  if(beforeShift==="9 AM - 1 PM") return "1 PM - 5 PM";
  else if(beforeShift==="1 PM - 5 PM") return "4 PM - 9 PM";
  else if(beforeShift==="4 PM - 9 PM") return "7 PM - 12 PM";
  else return "No Problem";
}


app.get('/checkAssignment',async (req,res)=>{

  const employees=await Employee.find({});
  let isValid=true;
  const len=employees[0].shifts.length;

  let count=0;

  for(let employee of employees){ 
      count+=employee.shifts.length;
  }

  let n=employees.length;

  count=Math.floor(count/n);

  console.log("count",count);

  
  for(let employee of employees){

    if(employee.shifts.length!==count && employee.shifts.length!==count+1){
      isValid=false;
      break;
    }

    let mp = new Map();

    for(let shift of employee.shifts){
      mp.set(shift.shiftNumber,shift.date);
    }

    let mp1 = new Map();

    for(let shift of employee.shifts){
      mp1.set(shift.shiftNumber, []);
    }

    for(let shift of employee.shifts){
      mp1.get(shift.shiftNumber).push(shift.date);
    }

    for(let shift of employee.shifts){
      console.log("x",mp1.get(shift.shiftNumber).length);

      if((mp.has(getNext(shift.shiftNumber)) || mp.has(shift.shiftNumber)) && mp.get(getNext(shift.shiftNumber))===mp.get(shift.shiftNumber) || mp1.get(shift.shiftNumber).length>1){
        isValid=false;
        break;
      }
    }

    if(isValid===false) 
      break;
  }

  return res.status(201).json({
    validity:isValid
  })
  
})

app.get('/deleteAssigned', async (req, res) => {
  try {
      const employees = await Employee.find({});
      console.log("Employees from delete::", employees);

      for (let employee of employees) {
          await Employee.updateOne(
              { employeeId: employee.employeeId },  // Correctly reference the employeeId
              { $set: { shifts: [] } }              // Clear the shifts array
          );
      }

      res.status(200).send('All employee shifts have been cleared.');
  } catch (error) {
      console.error('Error clearing shifts:', error);
      res.status(500).send('An error occurred while clearing shifts.');
  }
});


app.get('/adminLogout',(req,res)=>{
  req.session.destroy((err) => {
      if (err) {
          return res.redirect('/');
      }
      res.clearCookie('connect.sid');
      res.redirect('/adminLogin');
  });
})

app.post('/adminRegister',async (req,res)=>{
// console.log("inside signup post",req.body)
const {adminId,username,password}=req.body;
const user=new User({username,adminId});
console.log(user);
const find_existing=await User.findOne({email});
console.log(find_existing)

        if(find_existing)
      {
        console.log("already h bro!!")
          return res.status(400).json({message:"user aleady exist !!"})
      }

// const h=await User.register(user,password);
// req.login(h,(err)=>{
//    if(err) return next(err);
//   //  res.redirect('/');
// })
// res.status(201).json({
//   message: "User created successfully!",
//   user: {
//     id: h.id,
//     name: h.username,
//     email: h.email,
//   },
// });
try {
  const h = await User.register(user, password);
  req.login(h, (err) => {
      if (err) return next(err);
  });

  res.status(201).json({
      message: "User created successfully!",
      data: {
          userid: h.id,
          username: h.username,
          email: h.email,
      },
  });
} catch (err) {
  if (err.name === 'UserExistsError') {
      // Catch UserExistsError thrown by passport-local-mongoose
      return res.status(400).json({ message: "A user with the given username is already registered" });
  }
  return next(err); // Handle other errors
}
// res.redirect('/');
})

app.post('/adminLogin',passport.authenticate('local',{failureFlash:false,failureRedirect:'/login'}),(req,res)=>{
console.log("login back prr",req.body) 
const url=req.session.returnTo || '/';
const userdata=req.body;
delete req.session.returnTo;
res.status(201).json({
message:"user login successfully!",
 data:userdata

})
// res.redirect(url);
})



app.listen(4000,()=>{
    console.log("Connected To Port 4000!!!!!");
})







