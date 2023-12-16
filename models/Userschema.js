const mongoose=require('mongoose');
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    position:{
        type:String,
        required:true,
    },
    salary:{
        type:Number,
        required:true,
    }
})
const userSchema=mongoose.model('userSchema',userschema);
module.exports=userSchema;