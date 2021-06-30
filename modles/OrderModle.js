const mongoose = require('mongoose')

const items= new mongoose.Schema({
    itemId:{
        type:Number,
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
})
const orderSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    products:{
        type:[items],
        required:true
    },
    orderTotal:{
        type:Number,
        required:true
    }
    

},{ timestamps: true });

module.exports = mongoose.model('orders',orderSchema);