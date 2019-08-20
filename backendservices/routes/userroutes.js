const exp=require('express');
//importing database object
const initdb=require('../DBConfig').initdb
const getdb=require('../DBConfig').getdb
const secret='secret'
//importing jwt
const jwt=require('jsonwebtoken')
//intailizing dbo
initdb();
//importing bcrypt
const bcrypt=require('bcrypt')
var userRoutes=exp.Router();

// //userRoutes handler
// userRoutes.post('/register',(req,res,next)=>{
//     console.log(req.body)
//     //hashing the password using 
//     bcrypt.hash(req.body.password,5,(err,hashedPassword)=>{
//         if(err)
//         {
//             console.log(err)
//         }
//         else{
//             req.body.password=hashedPassword
//             console.log(req.body)
//             var dbo=getdb();
//             if(req.body.usertype==='owner')
//             {
//                 dbo.collection("owner").find({name:{$eq:req.body.name}}).toArray((err,dataArray)=>{
//                     if (dataArray.length==0)
//                     {
//                         dbo.collection("owner").insertOne(req.body,(err,success)=>{
//                             if(err){
//                                next(err)
//                             }
//                             else{
//                                 res.json({message:"registered successfully"})
//                             }
//                         })
//                     }
//                     else{
//                         res.json({message:"name exists"})
//                     }
//                 })
    
               
//             }
//             else{
//                 dbo.collection("vendor").find({name:{$eq:req.body.name}}).toArray((err,dataArray)=>{
//                     if (dataArray.length==0)
//                     {
//                         dbo.collection("vendor").insertOne(req.body,(err,success)=>{
//                             if(err){
//                                next(err)
//                             }
//                             else{
//                                 res.json({message:"registered successfully"})
//                             }
//                         })
//                     }
//                     else{
//                         res.json({message:"name exists"})
//                     }
//                 })
//             }
//         }
//     })
   
        
// })
//userRoutes handler patient registration

userRoutes.post('/register/patient',(req,res,next)=>{
    console.log(req.body);
    dbo=getdb();
    dbo.collection("patientcollection").find({name:{$eq:req.body.name}}).toArray((err,result)=>
    
    {
        if(result=="")
        {
            bcrypt.hash(req.body.password,4,(err,hashedpwd)=>{
                if(err)
                {
                    next(err);
                }
                else{
                    //replace the plain text with hashed password
                    req.body.password=hashedpwd;
                    dbo.collection("patientcollection").insertOne(req.body,(err,success)=>{
                        if(err)
                        {
                            console.log('error in patient register')
                        }
                        else{
                            res.json({message:"registration success"})
                        }
                    })
                }
            })
            console.log("Unique Value");    
        }
        else {
            res.json({message:"Duplicate name"})
            console.log("Duplicate name");
           
        }
    
    })
    
})



//userRoutes handler doctor registration
userRoutes.post('/register/doctor',(req,res,next)=>{
    console.log(req.body);
    dbo=getdb();
    if(req.body.name==""){
        res.json({"message":"empty name"})
        console.log("empty name")
    }
    else{

    
    dbo.collection("doctorcollection").find({duname:{$eq:req.body.duname}}).toArray((err,result)=>
    
    {
        if(result=="")
        {
            bcrypt.hash(req.body.password,4,(err,hashedpwd)=>{
                if(err)
                {
                    next(err);
                }
                else{
                    //replace the plain text with hashed password
                    
                    
                    req.body.password=hashedpwd;
                    
                    dbo.collection("doctorcollection").insertOne(req.body,(err,success)=>{
                        if(err)
                        {
                            console.log('error in patient register')
                        }
                        else{
                            res.json({message:"registration success"})
                        }
                    })
                }
            })
            console.log("Unique Value");

            
        }
        else {
            res.json({"message":"Duplicate name"})
            console.log("Duplicate name");
           
        }
    
    })
}
})

        

//login validation user
userRoutes.post('/login',(req,res,next)=>{
    console.log(req.body)
    var dbo=getdb();
        if(req.body.usertype==='patient')           
        {

            dbo.collection("patientcollection").find({name:{$eq:req.body.name}}).toArray((err,data)=>{
                if(err){
                   next(err)
                }
                else{
                    if (data.length==0)
                    {
                        res.json({message:'patient name invalid'})
                    }
                
                   else {
                    bcrypt.compare(req.body.password,data[0].password,(err,result)=>{
                            if (result==true)
                            {
                                //intailizing varaible
                                currentname=data[0].name
                                //create and send JSON token
                                const signedToken=jwt.sign({name:data[0].name},secret,{expiresIn: "1d"})
                                res.json({message:'patient logged in successfully',userdata:data,token:signedToken})
                            }
                            else{
                                res.json({message:'patient password invalid'})
                            }
                    })
                      
                   }
                }
            })
        }
        else if(req.body.usertype==='doctor')   {
            dbo.collection("doctorcollection").find({name:{$eq:req.body.name}}).toArray((err,data)=>{
                if(err){
                   next(err)
                }
                else{
                    if (data.length==0)
                    {
                        res.json({message:'doctor name invalid'})
                    }
                    
                   else {
                    bcrypt.compare(req.body.password,data[0].password,(err,result)=>{
                        if (result==true)
                        {
                            //intailizing varaible
                            currentname=data[0].name
                            //create and send JSON token
                            const signedToken=jwt.sign({name:data[0].name},secret,{expiresIn: "7d"})
                            res.json({message:'doctor logged in successfully',userdata:data,token:signedToken})
                        }
                        else{
                            res.json({message:'doctor password invalid'})
                        }
                    })
                      
                   }
                }
            })
        }
        else{
            res.json({message:"Select either Patient or Doctor"})
        }
        
})

userRoutes.get('/doctors',(req,res,next)=>{
    dbo=getdb();
    dbo.collection('doctorcollection').find().toArray((err,dataArray)=>{
        if(err){
            console.log('error in saving data')
            console.log(err)
        }
        else{
                    res.json({"message":dataArray})
                    console.log("dataArray:",dataArray);
                }
    })
})


const accountSid = 'ACa186cd6223e30ccd47f42c2a6aaf4bf4';
const authToken = '8812fe026480c3726389c876579d2325';
const client = require('twilio')(accountSid, authToken);


userRoutes.post('/resetpwd',(req,res,next)=>{
    dbo=getdb();
    console.log(req.body)
    // dbo.collection("patientcollection").find({name:{$eq:req.body.name}}).toArray((err,data)=>{
    dbo.collection('patientcollection').find({name:{$eq:req.body.name}}).toArray((err,userArray)=>{
        if(err){
            next(err)
            console.log(error)
        }
        else{
            console.log(userArray)
            if(userArray.length===0){
                res.json({message:"user not found"})
            }
            else{
                jwt.sign({name:userArray[0].name},secret,{expiresIn:10000},(err,token)=>{
                    if(err){
                     next(err);
                    }
                    else{
                        var OTP=Math.floor(Math.random()*99999)+11111;
                        console.log(OTP)
                        
                        client.messages.create({
                            body: 'hiii, your project works',
                            from: '+12029155184',
                            to: '+918790052438'
  
                        })
                        .then((message) => {
                            dbo.collection('OTPCollection').insertOne({
                                OTP:OTP,
                                name:userArray[0].name,
                                OTPGeneratedTime:new Date().getTime()+15000
                        },(err,success)=>{
                            if(err){
                                next(err)
                            }
                            else{                                        
                                res.json({"message":"user found",
                                    "token":token,
                                    "OTP":OTP,
                                    "name":userArray[0].name
                                })
                            }
                        })
                        });

                    }
                    
                })
            }
        }
    })
})

//verify OTP
userRoutes.post('/verifyotp',(req,res,next)=>{
    console.log(req.body)
    console.log(new Date().getTime())
    var currentTime=new Date().getTime()
    dbc.collection('OTPCollection').find({"OTP":req.body.OTP}).toArray((err,OTPArray)=>{
        if(err){
            next(err)
        }
        else if(OTPArray.length===0){
            res.json({"message":"invalidOTP"})
        }
        else if(OTPArray[0].OTPGeneratedTime < req.body.currentTime){
            res.json({"message":"invalidOTP"})
        }
        else{
            
            dbc.collection('OTPCollection').deleteOne({OTP:req.body.OTP},(err,success)=>{
                if(err){
                    next(err);
                }
                else{
                    console.log(OTPArray)
                    res.json({"message":"verifiedOTP"})
                }
            })
        }
    })
})



//changing password
userRoutes.put('/changepassword',(req,res,next)=>{
    console.log(req.body)
    bcrypt.hash(req.body.password,6,(err,hashedPassword)=>{
        if (err) {
            next(err)
        } else {
            console.log(hashedPassword)
            collectionObject.updateOne({name:req.body.name},{$set:{
                password:hashedPassword
            }},(err,success)=>{
                if(err){
                    next(err)
                }
                else{
                    res.json({"message":"password changed"})
                }
            }) 
        }
    })
    
})


userRoutes.get('*', (req, res, next)=> {
    let err = new Error('Page Not Found');
    err.statusCode = 404;
    next(err);
  });

  userRoutes.use((err, req, res, next)=>{
    res.status(404).json({errorCode:404, errorMessage:"requested resources not found"});
})

//error handling callback function
// userRoutes.use((err,req,res,next)=>{
//     console.log(err)
// })
module.exports=userRoutes