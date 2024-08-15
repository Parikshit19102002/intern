const mongoose=require('mongoose');
const passport=require('passport');
const passport_local_mongoose=require('passport-local-mongoose');
const passport_local=require('passport-local');


const Schema=mongoose.Schema;

const UserSchema=new Schema({
    adminId : { type:String, require:true, unique: true },
    username : { type:String, require:true, unique: true }
})

UserSchema.plugin(passport_local_mongoose);

module.exports = mongoose.model("User", UserSchema);






