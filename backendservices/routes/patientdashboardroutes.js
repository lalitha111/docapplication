const exp=require('express');
//importing database object
const initdb=require('../DBConfig').initdb
const getdb=require('../DBConfig').getdb
initdb();
//importing checkAuthorization middleware
const checkAuthorization=require('../middleware/checkAuthorization');
var patientdashboardRoutes=exp.Router();

//patientdashboard viewprofile get handler
patientdashboardRoutes.get('/profile/:name',checkAuthorization,(req,res)=>{
    console.log("req.params",req.params);
    var dbo=getdb();
    dbo.collection('patientcollection').find({name:{$eq:req.params.name}}).toArray((err,dataArray)=>{
        if(err){
            console.log(err)
        }
        else
        {
            res.json({"message":dataArray})
        }
    })
})

// put method handler for update the patient 
patientdashboardRoutes.put('/profile',(req,res)=>{
    console.log("updated value is",req.body)
    var dbo=getdb();
        dbo.collection("patientcollection").updateOne({name:{$eq:req.body.name}},{$set:{date:req.body.date,email:req.body.email,mobileno:req.body.mobileno,area:req.body.area}},(err,success)=>{
            if(err){
                console.log('error in saving data')
                console.log(err)
            }
            else{
                        res.json({"message": "updated successfully"})
                    }
        })
})

//get request from to view all doctors in patient dashboard
patientdashboardRoutes.get('/viewdoctors',checkAuthorization,(req,res)=>{
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

//patient booked appointments 
patientdashboardRoutes.post('/viewdoctors',(req,res)=>{
    console.log(req.body)
    var dbo=getdb();
    if (req.body.length==0)
    {
        res.json({message:"no data recieved"})
    }
    else{
        dbo.collection("bookappointments").insertOne(req.body,(err,success)=>{
            if(err){
                console.log('error in saving data')
                console.log(err)
            }
            else{
                res.json({"message":"request sent  successfully"})
            }
        })
    }
})

//get request from to view all doctors in doctor dashboard
patientdashboardRoutes.get('/bookingstatus',checkAuthorization,(req,res)=>{
    dbo=getdb();

    dbo.collection('bookappointments').find().toArray((err,dataArray)=>{
        
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

//get request from to view all doctors in doctor dashboard
patientdashboardRoutes.get('/mybookings/:name',checkAuthorization,(req,res)=>{
    dbo=getdb();
    console.log(req.params.name);

    dbo.collection('acceptedappointments').find({patientname:{$eq:req.params.name}}).toArray((err,dataArray)=>{
        
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

//Patient make payment
patientdashboardRoutes.post('/makepayment',(req,res)=>{
    console.log(req.body)
    var dbo=getdb();
    if (req.body.length==0)
    {
        res.json({message:"no data get found"})
    }
    else{
        dbo.collection("payments").insertOne(req.body,(err,success)=>{
            if(err){
                console.log('error in saving data')
                console.log(err)
            }
            else{
                res.json({"message":"payment success"})
            }
        })
    }
})

//Patient payment history
patientdashboardRoutes.get('/paymenthistory/:name',checkAuthorization,(req,res)=>{
    console.log("req.params:",req.params);
    var dbo=getdb();
    dbo.collection('payments').find({patientname:{$eq:req.params.name}}).toArray((err,dataArray)=>{
        if(err){
            console.log(err)
        }
        else
        {
            res.json({"message":dataArray})
            console.log(dataArray)
        }
    })
})




module.exports=patientdashboardRoutes