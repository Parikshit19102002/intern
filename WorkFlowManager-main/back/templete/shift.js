const mongoose=require('mongoose');

const shiftSchema=new mongoose.Schema({
    shiftNumber : {type:String, require:true},
    date :{type : String },
    employeeId :{type : String },
})
shiftSchema.index({ date: 0, shiftNumber: 0,employeeId:0 });

module.exports=mongoose.model('Shift',shiftSchema);