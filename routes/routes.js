const express=require('express');
const router=express.Router();
const signUpTemplate= require('../modles/SignUpModle')
const cartTemplate= require('../modles/CartModle')
const orderTemplate= require('../modles/OrderModle')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken');
             router.post('/signup',async(req,res)=>
               {
               const salt=await bcrypt.genSalt(10);
               const encrypted=await bcrypt.hash(req.body.password,salt);
               const newUser= new signUpTemplate({
                   fullname:req.body.fullname,
                   username:req.body.username,
                   dateofbirth:new Date(req.body.dateofbirth),
                   email:req.body.email,
                   password:encrypted,
                   email:req.body.email
               })
               console.log(newUser);
               await newUser.save()
               .then((data)=>{console.log(data);res.json(data)})
               .catch((err)=>{res.json(err)})
            
            })


            router.post('/login',async(req,res)=>
            {
            let user= {

                username:req.body.username,
                password:req.body.password

            }
             signUpTemplate.find({username:user.username}).then(async(data)=>{
                if(data.length){
                        const match = await bcrypt.compare(user.password,data[0].password);
                        console.log(match);
                        if(match){
                            user.password= data[0].password;
                            res.json({user})
                        }
                        else{
                            res.json({error:"Incorrect password"})
                        }
                    }
                else{
                    res.json({error:"No such username exists"})

                }

            // jwt.sign({user:user},'secretkey',{expiresIn:'30s'},(err,token)=>{//asynchronous way
            //     res.json({token:token})
            // })
         
         })
         .catch((err)=>console.log(err))


        })

        router.post('/addtocart',async(req,res)=>
        {
        
        const newitem= new cartTemplate({
              username:req.body.username,
              itemId:req.body.itemId,
              itemName:req.body.itemName,
              itemQuantity:req.body.itemQuantity,
              itemNetPrice:req.body.itemNetPrice
        })
        
        await newitem.save()
        .then((data)=>{
            cartTemplate.find({username:req.body.username})
            .then((data)=>{
                // console.log(data);
                res.json(data)
            })
            .catch((err)=>{res.json(err)})

        })
        .catch((err)=>{res.json(err)})
     
     })
     router.get('/getfromcart',async(req,res)=>
        {

        cartTemplate.find({username:req.query.username})
        .then((data)=>{
            console.log(data);
            res.json(data)
        })
        .catch((err)=>{res.json(err)})
     
     })

     router.post('/deletefromcart',async(req,res)=>
     {
      
      if(!req.query.deleteall)
      {cartTemplate.findOneAndRemove({username:req.body.username,itemId:req.body.itemId},
                function (err, docs) {
                    console.log(docs)
                        if (err){
                        console.log(err)
                        res.json({error:err})
                        }
                        else{
                            cartTemplate.find({username:req.body.username})
                                        .then((data)=>{
                                            console.log(data);
                                            res.json(data)
                                        })
                                        .catch((err)=>{res.json(err)})
                            }
        }
        );}
        else{
            cartTemplate.deleteMany({username:req.body.username},
                function(err,doc){
                    if(err){
                        console.log(err)
                        res.json({error:err})
                    }
                    else{
                        cartTemplate.find({username:req.body.username})
                        .then((data)=>{
                            console.log(data);
                            res.json(data)
                        })
                        .catch((err)=>{res.json(err)})
                        }
                    
                })
        }
  })

  router.post('/order',async(req,res)=>
  {
      const neworder = new orderTemplate({
        username:req.body.username,
        products:req.body.products,
        orderTotal:req.body.orderTotal
      })
      
      console.log(neworder)
      await neworder.save()
      .then((data)=>{
          res.json({status:"successfull"})
      })
      .catch((err)=>res.json({error:err}))
  })


        
module.exports=router
