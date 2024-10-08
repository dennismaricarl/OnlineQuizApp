const {MongoClient} = require('mongodb')    //import MongoClient from mongodb package- used to connect to the database!

const connectionString = "mongodb://localhost:27017/onlinequiz"; //database is hosted in localhost at port 27017
const client = new MongoClient(connectionString);  //create new instance of MongoClient using connection string




async function connectToDatabase() { 
  try {
    await client.connect(); //using MongoClient here to connect to our database. await means wait for this first because further execution
    console.log("Connected to db successfully");
    return client.db("onlinequiz"); // calls the db method on client object. this method is used to access a specific database --> online quiz in our case! 
  } catch (e) {
    console.error(e);
  }

}

connectToDatabase(); //call our main function


module.exports = {
  getDb: connectToDatabase     //export an object containing connectToDatabase as getDB. This allows other modues to import and use this function
                                //to connect to the db. 
};