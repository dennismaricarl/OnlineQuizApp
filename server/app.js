const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
const { getDb } = require('./db/client'); //okay! Here's my db connection!!

app.use("/auth",require('./auth'));

// Logging middleware
app.use(morgan("dev"));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')))

app.get("/test", (req, res, next) => {
  res.send("Test route");
});

// ROUTERS BELOW 


//Middleware to attach to db connection 
app.use(async (req, res, next)=> {
  try{
    req.db = await getDb(); // add db property to existing request object
    next();
  }catch(error){
    console.error("Database connection error:", error)
    res.status(500).send({error: "Database connection failed!"})
  }
})



//COLLECTIONS 
app.get('/api/css', async (req, res) => {
  try {
    let request = await req.db.collection("CSS");      //-->req.db here so we dont have to keep calling the database. 
    const css = await request.find({}).toArray();
    res.status(200).json(css);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch the documents' });
  }
});

app.get('/api/html', async (req, res) => {
  try {
    let request = await req.db.collection("HTML");
    const html = await request.find({}).toArray();
    res.status(200).json(html);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch the documents' });
  }
});


app.get('/api/javascript', async (req, res) => {
  try {
    let request = await req.db.collection("JavaScript");
    const javascript = await request.find({}).toArray();
    res.status(200).json(javascript);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch the documents' });
  }
});


app.get('/api/AdvancedJS', async (req, res) => {
  try {
    let request = await req.db.collection("AdvancedJS");
    const advancedjs = await request.find({}).toArray();
    res.status(200).json(advancedjs);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch the documents' });
  }
});

app.get('/api/WomenInCS', async (req, res) => {
  try {
    let request = await req.db.collection("WomenInCS");
    const womenincs = await request.find({}).toArray();
    res.status(200).json(womenincs);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch the documents' });
  }
});


app.get('/api/Git', async (req, res) => {
  try {
    let request = await req.db.collection("Git");
    const git = await request.find({}).toArray();
    res.status(200).json(git);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not fetch the documents' });
  }
});



// app.post('/api/makeaquiz',async(req,res)=>{
//   let category = req.body.category; //html
//   let {data} = req.body
//   console.log('category----',category)
//   console.log('data----',data)
//   let collection = await db.collection(category);
//   let result = await collection.insertOne(data);
//   res.send(result).status(204);
// })


//POST REQUEST - we need a body that has data. and a category!!!!!! 
app.post('/api/makeAquiz', async (req, res) => {
  let category = req.body.category;
  let data = req.body.data;
  console.log('category----', category)
  console.log('data----', data)
  let collection = await req.db.collection(category)
  let result = await collection.insertMany(data);
  res.send(result).status(204);
})

// app.post('/api/signUp', async (req, res) => {
//   let data = req.body; // { username: 'newuser', password: 'newpass' }
//   console.log(data)
//   let collection = await req.db.collection('userData');

//   try {
//     // Check if the user already exists
//     let existingUser = await collection.findOne({ Email: data.email });
//     console.log(existingUser)
//     console.log(data.email)

//     if (existingUser) {
//       res.status(409).send({ message: "Username already exists" });
//     } else {
//       let result = await collection.insertOne(data);
//       res.status(201).send({ message: "User registered successfully", id: result.insertedId });
//     }
//   } catch (error) {
//     res.status(500).send({ message: "Internal Server Error", error });
//   }

// });


// app.post('/api/login', async (req,res) => {
//   try{
//     const details = req.body  //this is the data literally- email & password  - "client data"
//     console.log(details)

//     let request = await req.db.collection("userData")   //were looking for the "userData" collection in mongoDB database
//     const user = await request.findOne({ email: details.email }) //find the user email from the dtabase 
 


//     if(user){
//       if(details.password === user.password){
//         console.log("line192",user)
//         res.json({message: 'successfully logged in', firstName: user.firstName}  )
//       }else{
//         res.json({message:'Incorrect Password!'})
//       }
//     }
    
//   }catch(error){
//     console.error(error)
//     res.status(500).json({error: 'could not find username'})
//   }
 
// })



// 404 handler
//this needs to be at the end. This should only execute after nothing matches with the routes defined above. 
// app.get('*', (req, res) => {
//     res.status(404).send({
//         error: '404 - Not Found',
//         message: 'No route found for the requested URL',
//     });
// });


// Catch-all route to serve React app
//ensures that all requests not handled by previous routes are directed to 
//your React application's index.html file.
//React Router then takes over from there, interpreting the route and rendering the appropriate component on the client side.


// Error handling middleware
app.use((error, req, res, next) => {
  console.error('SERVER ERROR: ', error);
  if (res.statusCode < 400) {
    res.status(500);
  }
  res.send({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
});

// * Handles all URLs (wildcard).
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});





module.exports = app;