const mongoose = require('mongoose')

const cartSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    itemId:{
        type:Number,
        required:true
    },
    itemName:{
        type:String,
        required:true
    },
    itemQuantity:{
        type:Number,
        required:true
    },
    itemNetPrice:{
        type:Number,
        required:true
    },
    

},{ timestamps: true });

module.exports = mongoose.model('cart',cartSchema);
