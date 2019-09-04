const exp=require('express')
const app=exp();
//installing and importing path
const path=require('path')
//connecting angular app with server
app.use(exp.static(path.join(__dirname,'../dist/docApp')));
//installing and importing body-parser
const bodyParser=require('body-parser')
//using body-parser
app.use(bodyParser.json())

//importing userRoutes
const userRoutes=require('./routes/userroutes');
//using userRoutes
app.use('/nav',userRoutes)
//importing patientdashboardroutes
const patientdashboardRoutes=require('./routes/patientdashboardroutes');
//using patientdashboardroutes
app.use('/patientdashboard',patientdashboardRoutes)
//importing vendordashboardroutes
const doctordashboardRoutes=require('./routes/doctordashboardroutes');
//using vendordashboardroutes
app.use('/doctordashboard',doctordashboardRoutes)
//using jwtwebtoken
const jwt=require('jsonwebtoken');

app.listen(process.env.PORT || 8080,()=>{console.log('server running at portno 8080')})