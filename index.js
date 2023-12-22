const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors")
require('dotenv').config();

// MIDDLEWARE 
app.use(express.json());
app.use(cors());

// https://www.youtube.com/watch?v=THpPGezCAGs
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mqi55mg.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const taskCollection = client.db("taskManagementDB").collection("allTask")

    app.get("/singleuserdata", async (req, res) => {
      console.log(req.query.email);
      let query = {};
      if (req.query?.email) {
        query = { email: req.query.email }
      }
      const result = await taskCollection.find(query).toArray();
      res.send(result)
    })

    app.post("/task", async (req, res) => {
      const task = req.body;
      const result = await taskCollection.insertOne(task)
      console.log(task);
      res.send(result)
    })
    app.delete("/delete/:id", async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await taskCollection.deleteOne(query);
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
// app.get("/addedtask", async(req, res)=>{
//   const 
// })
app.get("/", (req, res) => {
  res.send("task management server is running")
});

app.listen(port, () => {
  console.log(`the server is running on port${port}`);
})


