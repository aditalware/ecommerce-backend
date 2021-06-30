const express =require('express');
const app= express();
const mongoose =require('mongoose');
const routeUrls= require('./routes/routes');
const cors=require("cors");



const db="mongodb://onboard:onboard@onboard-shard-00-00.n4f0d.mongodb.net:27017,onboard-shard-00-01.n4f0d.mongodb.net:27017,onboard-shard-00-02.n4f0d.mongodb.net:27017/shopcart?replicaSet=atlas-10kwwl-shard-0&ssl=true&authSource=admin";

mongoose.connect(db,{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
  }).then((data)=>console.log('Connected to MongoDb'))
  .catch((err)=>console.log(err));



app.use(express.json())//bodyparser
app.use(cors())
app.use('/api',routeUrls);
const port = process.env.PORT || 8080
app.listen(port,()=>{console.log("server is running on", port)});