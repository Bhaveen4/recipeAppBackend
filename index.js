const express = require("express");
const app = new express();


const path = require('path');

app.use(express.static(path.join(__dirname,'/build')));




// fixing "413 Request Entity Too Large" errors
app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))

const recipeInfo = require('./db');

// cors
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type ");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})

app.get('/',(req,res)=> {
    res.send("Server Up");
})


app.post('/api/create',(req,res)=>{
 try{
    console.log(req.body);
    let recipe = new recipeInfo(req.body);
    recipe.save();
    res.send("data Added");
 }
 catch (error) {
    res.status(500).send(error);
 }
})

app.get('/api/view', async (req,res)=>{
    try {
        let result = await recipeInfo.find();
        res.json(result);
        
    } catch (error) {
        res.status(500).send(error);
    }
})


app.put('/api/update', async (req,res)=>{
    try {
         await recipeInfo.findByIdAndUpdate(req.body._id,req.body);
         res.send("Data Updated");
    } catch (error) {
        res.status(500).send(error);
    }
})

app.delete('/api/delete', async (req,res)=> {
    
    try {
     await recipeInfo.findByIdAndDelete(req.body._id);
    res.send("Data Deleted")
     } catch (error) {
        res.status(500).send(error);
    }
})


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/build/index.html')); });







app.listen(5000,()=>{
    console.log("server is up");
})