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
            res.json({message:"Duplicate Username"})
            console.log("Duplicate Username");
           
        }
    
    })
    
})



//userRoutes handler doctor registration
userRoutes.post('/register/doctor',(req,res,next)=>{
    console.log(req.body);
    dbo=getdb();
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
            res.json({"message":"Duplicate Username"})
            console.log("Duplicate Username");
           
        }
    
    })
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
                                currentUserName=data[0].name
                                //create and send JSON token
                                const signedToken=jwt.sign({name:data[0].name},secret,{expiresIn: "7d"})
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
        else{
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
                            currentUserName=data[0].name
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
        
})

userRoutes.get('/doctors',(req,res)=>{
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
//error handling callback function
userRoutes.use((err,req,res,next)=>{
    console.log(err)
})
module.exports=userRoutes