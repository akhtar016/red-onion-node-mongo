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

app.get("/food", (req, res) => {
  client = new MongoClient(uri, { useNewUrlParser: true });

  client.connect((err) => {
    const collection = client.db("redOnionStore").collection("foods");
    collection.find().toArray((err, documents) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(documents);
      }
    });
    client.close();
  });
});

app.get("/food/:key", (req, res) => {
  const key = req.params.key;

  client = new MongoClient(uri, { useNewUrlParser: true });

  client.connect((err) => {
    const collection = client.db("redOnionStore").collection("foods");
    collection.find({ key }).toArray((err, documents) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(documents[0]);
      }
    });
    client.close();
  });
});

//Post

app.post("/addFood", (req, res) => {
  const food = req.body;
  client = new MongoClient(uri, { useNewUrlParser: true });

  client.connect((err) => {
    const collection = client.db("redOnionStore").collection("foods");
    collection.insert(food, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(result.ops[0]);
      }
    });
    client.close();
  });
});

const port = process.env.PORT || 4200;
app.listen(port, () => console.log("Listening to port 4200"));
