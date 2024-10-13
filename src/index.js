const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require("../src/jwt/routes/authRoutes")
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const userRoutes = require("./routes/routes");
require('dotenv').config();


const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());
const port = process.env.port;
// work as a controller 
app.use("/", authRoutes);
app.use("/api", userRoutes);

// app.get("/", (req, res)=>{
//   res.json({
//     message : "Simple API"
//   })
// })
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  
console.log("index.js file is working ");


      // to generate secretKey by crypto
      // const crypto = require('crypto');
      // const secretKey = crypto.randomBytes(32).toString('hex');