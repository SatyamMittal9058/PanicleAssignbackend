const express=require('express');
const bodyParser = require('body-parser');
const cors=require("cors");
const mongoose=require('mongoose');
require('dotenv').config();
const crudOperation=require("./apimethodRoutes/crudRoutes");
const server=express();
server.use(bodyParser.json());
server.use(cors());
mongoose.connect(process.env.MONGO_URL);
const database=mongoose.connection;
database.on("connected",()=>{
    console.log("MongoDB connected");
});

server.use('/api',crudOperation);


server.listen(4000);