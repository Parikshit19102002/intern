const { unlink } = require('fs');
const mongoose=require('mongoose');

const contactSchema = new mongoose.Schema({
       shiftNumber: {
         type: String,
         required: true
       },
       date: {
         type: String,
         required: true
       }
     });


const EmployeeSchema=new mongoose.Schema({
       employeeId:{ type:String, require:true },
       username:{ type:String, require:true, unique: true },
       useremail:{type:String,require:true,unique:true},
       shifts:[contactSchema]
});

module.exports=mongoose.model("Employee",EmployeeSchema);