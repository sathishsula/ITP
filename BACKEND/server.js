const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express("");
require("dotenv").config();

const PORT= process.env.PORT|| 8070;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

const URL= process.env.MONGODB_URL;

mongoose.connect(URL,{
    
    useNewUrlParser:true,
    useUnifiedTopology:true,
   
    
});

const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("mongodb Connection success!");
});

const stockRouter = require("./routes/stock.js");

http://localhost:8070/stock

app.use("/stock", stockRouter);

app.use("/images", express.static("images"));



app.listen(PORT,()=>{
    console.log(`Server is up and running on port ${PORT}`);
});