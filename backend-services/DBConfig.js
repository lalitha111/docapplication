//importing mongo client
const mc=require('mongodb').MongoClient;
const url="mongodb://raparthilalitha:Lalli1992@cluster0-shard-00-00-gpyko.mongodb.net:27017,cluster0-shard-00-01-gpyko.mongodb.net:27017,cluster0-shard-00-02-gpyko.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
var dbo;
function initdb(){
    mc.connect(url,{useNewUrlParser:true},
        (err,db)=>{
            if(err){
                console.log('error in connecting to db');
            }
            else{
                console.log('database connected...');
            dbo=db.db("docApp");
            }
            
        });
}
function getdb(){
    console.log("dbo intailized")
    return dbo;
}
module.exports={
    getdb,
    initdb
};