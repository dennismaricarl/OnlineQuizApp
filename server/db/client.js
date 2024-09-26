const {MongoClient} = require('mongodb')

const connectionString = "mongodb://localhost:27017/onlinequiz";
const client = new MongoClient(connectionString);


let db;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to db successfully");
    db = client.db("onlinequiz"); // .db is a predefined function 
  } catch (e) {
    console.error(e);
  }
  return db
}

connectToDatabase();


module.exports = {
  getDb: connectToDatabase
};