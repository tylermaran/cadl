const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://tylermaran:<password>@cluster0-5puio.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
