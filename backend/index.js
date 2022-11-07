const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");

const app = express();
app.use(cors);
app.use(express.json());


const Port = process.env.PORT || 5000

mongoose.connect("mongodb+srv://jairajpratapsingh:jai123456@cluster0.af1plyg.mongodb.net/api-web-tech-assignment?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology:true}, 
).then(()=>{
    console.log("db connection sucessfull")
}).catch((e)=>{
    console.log("no connection")
});

//Schema

const UserSchema = new mongoose.Schema({
    customerId:String,
    customerName:String,
    email:String,
    balance:Number,
    productId:String,
    productType:String,
    productName:String,
    productPrice:Number,
    availableQuentity:Number,
    quantity:Number
});

const User = new mongoose.model('User', UserSchema);

// Routes

app.post("/user", async(req, res)=>{
    try{
        const user = new User(req.body);
     const createUser = await user.save().then(()=>{
        res.send(user);
    }).catch((e)=>{
        res.send(e);
    })
    }catch(err){
        res.send(err);
    }
    
    
    
});

app.get("/producttable/", async(req, res)=>{
    try{
        const userdata =await User.find({productId, productType,productName, productPrice, availableQuentity});
res.send(userdata);
    }catch(err){
        res.send(err);
    }

});

app.get("/customertable", async(req, res)=>{
    try{
        const userdata =await User.find({customerId, customerName, email, balance});
res.send(userdata);
    }catch(err){
        res.send(err);
    }
});

app.get("/ordertable", async(req, res)=>{
    try{
        const userdata =await User.find({customerId, productId, productName, quantity});
res.send(userdata);
    }catch(err){
        res.send(err);
    }
});


app.listen(Port, ()=>{
    console.log(`server is running on port number ${Port}`)
} );
