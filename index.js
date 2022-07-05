const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://ramKumar:334300@cluster0.2mwsr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
function getCollection(){
    return new Promise((resolve,reject)=>{
        client.connect(async(err)=>{
            if(!err){
                console.log("DB connection successful")
                const collection = client.db("test").collection("devices");
                resolve(collection)
            }else{
                reject(err)
            }
        })
    })
}
const express = require('express')
const app = express()
const port = 8080
app.use(express.json())
app.get("/getUser",async(req,res)=>{
    let collection = await getCollection()
    let userData = await collection.find().toArray()
    res.json(userData)
})
app.post("/registerUser",async(req,res)=>{
    let collection = await getCollection()
    let result = collection.insertOne(req.body)
    res.json(result)
})
app.put("/updateUser/:userID",async(req,res)=>{
    let collection = await getCollection()
    let result = await collection.updateOne({_id:ObjectId(req.params.userID)}, {$set : req.body})
    res.json(result)
})
app.delete("/deleteUser/:userId",async(req,res)=>{
    let collection = await getCollection()
    let result = await collection.deleteOne({_id: ObjectId(req.params.userId)})
    res.send(result)
})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})