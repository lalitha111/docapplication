const exp=require('express');
//importing database object
const initdb=require('../DBConfig').initdb
const getdb=require('../DBConfig').getdb
initdb();
//importing checkAuthorization middleware
const checkAuthorization=require('../middleware/checkAuthorization');
var doctordashboardRoutes=exp.Router();

//doctordashboard viewprofile get handler
doctordashboardRoutes.get('/profile/:name',checkAuthorization,(req,res)=>{
    console.log("req.params",req.params);
    var dbo=getdb();
    dbo.collection('doctorcollection').find({name:{$eq:req.params.name}}).toArray((err,dataArray)=>{
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
doctordashboardRoutes.put('/profile',(req,res)=>{
    console.log("updated value is",req.body)
    var dbo=getdb();
        dbo.collection("doctorcollection").updateOne({name:{$eq:req.body.name}},{$set:{date:req.body.date,email:req.body.email,mobileno:req.body.mobileno,area:req.body.area,timings:req.body.timings,experience:req.body.experience,about:req.body.about,specialization:req.body.specialization}},(err,success)=>{
            if(err){
                console.log('error in saving data')
                console.log(err)
            }
            else{
                        res.json({"message": "updated successfully"})
                    }
        })
})

//get request from to view all doctors in doctor dashboard
doctordashboardRoutes.get('/viewrequests/:name',checkAuthorization,(req,res)=>{
    dbo=getdb();
    console.log(req.params.name);

    dbo.collection('bookappointments').find({doctorname:{$eq:req.params.name}}).toArray((err,dataArray)=>{
        
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
doctordashboardRoutes.get('/myappointments/:name',checkAuthorization,(req,res)=>{
    dbo=getdb();
    console.log(req.params.name);

    dbo.collection('acceptedappointments').find({doctorname:{$eq:req.params.name}}).toArray((err,dataArray)=>{
        
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


//Patient payment history
doctordashboardRoutes.get('/paymentstatus/:name',checkAuthorization,(req,res)=>{
    console.log("req.params:",req.params);
    var dbo=getdb();
    dbo.collection('payments').find({name:{$eq:req.params.name}}).toArray((err,dataArray)=>{
        if(err){
            console.log(err)
        }
        else
        {
            res.json({"message":dataArray})
        }
    })
})


// //get request from to view all doctors in doctor dashboard
// doctordashboardRoutes.get('/viewrequests/:name',(req,res)=>{
//     dbo=getdb();
//     console.log(req.params.name);

//     dbo.collection('bookappointments').find({doctorname:{$eq:req.params.name}}).toArray((err,dataArray)=>{
        
//         if(err){
//             console.log('error in saving data')
//             console.log(err)
//         }
//         else{
//                     res.json({message:dataArray})
//                     console.log("dataArray:",dataArray);
//                 }
//     })
// })


// //get request from to view all doctors in doctor dashboard
// doctordashboardRoutes.get('/viewrequests',(req,res)=>{
//     dbo=getdb();
    
//     dbo.collection('doctorcollection').updateOne({name:{$eq:req.body.name}},{}).toArray((err,dataArray)=>{
        
//         if(err){
//             console.log('error in saving data')
//             console.log(err)
//         }
//         else{
//                     res.json({message:dataArray})
//                     console.log("dataArray:",dataArray);
//                 }
//     })
// })

//update the request from doctor
// put method handler for update the doctor rqt 
doctordashboardRoutes.put('/viewrequests',(req,res)=>{
    console.log(req.body)
    var dbo=getdb();
        dbo.collection("bookappointments").updateOne({address:{$eq:req.body.address}},{$set:{reqstatus:req.body.reqstatus,name:req.body.doctorname}},(err,success)=>{
            if(err){
                console.log('error in saving data')
                console.log(err)
            }
            else{
                        res.json({"message": "request sent successfully"})
                    }
        })
})

//Patient make payment




doctordashboardRoutes.post('/viewrequests',(req,res)=>{
    console.log("req.body:",req.body)
    var dbo=getdb();
    dbo.collection("acceptedappointments").insertOne(req.body,(err,success)=>{
        if(err){
            console.log('error in saving data')
            next(err)
        }
        else{
           
            dbo.collection("bookappointments").findOneAndDelete({$and:[{patientname:{$eq:req.body.patientname}},{doctorname:{$eq:req.body.doctorname}}]},(err,result)=>{
                if(err)
                {
                    next(err);
                }
                else{
                    console.log("Deleted:", result);
                    res.json({'message':"request accepted ok"});
                    
                }
            })
        }
    })
})


doctordashboardRoutes.put('/viewdoctors',(req,res,next)=>{
    console.log("put view doctors:",req.body)
    dbo=getdb();
    dbo.collection("doctorcollection").updateOne({name:{$eq:req.body.doctorname}},{$addToSet:{patients:{$each:[req.body.patientname]}}}),((err,success)=>{
        if(err)
        {
            next(err)
        }
        else{
            res.json({'message':'updated'})
        }
    })
})


module.exports=doctordashboardRoutes