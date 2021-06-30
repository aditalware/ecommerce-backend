const mongoose= require('mongoose')

const signUpTemplate= new mongoose.Schema({
   fullname:{
       type:String,
       required:true
   },
   username:{
       type:String,
       required:true,
       unique:true
   },
   email:{
       type:String,
       required:true,
       unique:true
   },
   password:{
    type:String,
    required:true
   },
    dateofbirth:{
        type:Date,
        required:true
    },
   datejoined:{
       type:Date,
       default: Date.now
   }

})

module.exports = mongoose.model('customers',signUpTemplate);