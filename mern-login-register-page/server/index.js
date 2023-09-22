const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
 

//cors is a middleware
app.use(cors());
//we want to let express know that we are using json(parsing the body into json)
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/mern-stack-authentication')

// a default route 
// app.get('/',(req,res)=>{
//     res.send('hello world');
// })

app.post('/api/register', async (req,res)=>{
    console.log(req.body)  //undefined : not receiving the body : route does not know that we are passing a json
    // res.json({status:'ok'})
    try{
        const newPassword = await bcrypt.hash(req.body.password,10)
        await User.create({
            name : req.body.name,
            email: req.body.email,
            password: newPassword,
        });
        res.json({status:'ok'})

    }catch(error){
        res.json({status:'error',message:error})
    }
})

app.post('/api/login', async (req,res)=>{
    const user = await User.findOne({
            email: req.body.email,
            // password: req.body.password,
    });

    if(!user){
        return {status:'error',error:'invalid login'}
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    //if user exists we can send jwt
    if (user){

        const token = jwt.sign(
            {
            name : user.name,
            email : user.email,
           },
           'secret123'
        )
        return res.json({status:'ok',user:token});

    }
    else{
        return res.json({status:'error',user:false});
    }
})


app.listen(3333, ()=>{
    console.log("The server has started running")
})