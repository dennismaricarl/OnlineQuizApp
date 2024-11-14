const userRouter = require("express").Router();

const jwt = require("jsonwebtoken");
const SALT_COUNT = 10;
const bcrypt = require("bcrypt"); //hash the password. 
const { JWT_SECRET } = process.env; //token so the user doesn't have to input their credentials again. this token is saved in the local storage.
const { getDb } = require('../db/client'); 
const express = require("express");


//middleware to parse JSON body. this is important so the server can understand the incoming requests!! 
userRouter.use(express.json());

//Middleware to attach to db connection 
userRouter.use(async (req, res, next)=> {
    try{
      req.db = await getDb(); // add db property to existing request object
      next();
    }catch(error){
      console.error("Database connection error:", error)
      res.status(500).send({error: "Database connection failed!"})
    }
  })


userRouter.get('/', async (req, res) => {
    try {
      let request = await req.db.collection("userData");
      const users = await request.find({}).toArray();
      console.log(users)

      res.status(200).json(users);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Could not fetch the documents' });
    }
  });


userRouter.post('/signUp', async (req, res) => {
    let collection = await req.db.collection('userData');
    console.log("CONNECTION GREATTT")
    let data = req.body; // { username: 'newuser', password: 'newpass' }
    const hashedPassword = await bcrypt.hash(data.password, SALT_COUNT)

  
    try {
      // Check if the user already exists
      let existingUser = await collection.findOne({ email: data.email });
  
      if (existingUser) {
        res.status(409).send({ message: "Username already exists" }); 
      } else {
        let result = await collection.insertOne(
          { 
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hashedPassword
          }
        );
        console.log("HEIEIEJE")
        const token = jwt.sign({id: result.insertedId}, JWT_SECRET)
        console.log(token)
        res.status(201).send({ message: "User registered successfully", token }); 
      }

    } catch (error) {
      res.status(500).send({ message: "Internal Server Error", error });
    }
  
  });

  
 userRouter.post('/login', async (req,res) => {
    try{
      const details = req.body  //this is the data literally- email & password  - "client data"
      console.log(details)
  
      let result = await req.db.collection("userData")   //were looking for the "userData" collection in mongoDB database
      const user = await result.findOne({ email: details.email }) //find the user email from the dtabase 
   

  
      if(user){
        if(details.password === user.password){
          console.log("line192",user)
          res.json({message: 'successfully logged in', firstName: user.firstName}  )
        }else{
          res.json({message:'Incorrect Password!'})
        }
      }
      
    }catch(error){
      console.error(error)
      res.status(500).json({error: 'could not find username'})
    }
   
  })

  module.exports = userRouter