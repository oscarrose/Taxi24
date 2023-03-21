const mongoClient=require("mongoose");
const MONGODB_URI=process.env.MONGODB_URI;

//connection to database via mongoose

//mongoClient.set('strictQuery', true);
mongoClient.connect(MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("[db] Successful connection")
}).catch((error)=>console.log("Connection fallied: ", error))
