const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors")
require('dotenv').config();

// MIDDLEWARE 
app.use(express());
app.use(cors());

app.get("/", (req, res)=>{
    res.send("task management server is running")
});

app.listen(port, ()=>{
    console.log(`the server is running on port${port}`);
})


