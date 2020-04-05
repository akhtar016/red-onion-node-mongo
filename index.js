const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true });

const foods = ["breakfast", "lunch", "dinner"];



app.get("/foods", (req, res) => {

    client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect((err) => {


        const collection = client.db("redOnionStore").collection("foods");
        collection.find().toArray((err, documents) => {
          if(err){
              console.log(err);
              res.status(500).send({message:err});
          } else{
            res.send(documents);
          }
          
        });
        client.close();
      });

  
});

app.get("/foods/:id", (req, res) => {
  const id = request.params.id;
  const foodType = foods[id];
  response.send({ id, foodType });
});

//Post

app.post("/addFood", (req, res) => {

  const food = req.body;
  client = new MongoClient(uri, { useNewUrlParser: true });

  client.connect((err) => {
    const collection = client.db("redOnionStore").collection("foods");
    collection.insert(food, (err, result) => {
      if(err){
          console.log(err);
          res.status(500).send({message:err});
      } else{
        res.send(result.ops[0]);
      }
      
    });
    client.close();
  });
});

const port = process.env.PORT || 4200;
app.listen(port, () => console.log("Listening to port 4200"));
