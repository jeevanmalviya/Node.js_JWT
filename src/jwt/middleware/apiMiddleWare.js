
require('dotenv').config();
const jwt = require('jsonwebtoken');

function validateJWTToken(req, res, next){
  try{
    const bearerHeader = req.headers['authentication'];
    if(typeof bearerHeader !='undefined'){
       const bearer = bearerHeader.split(" ");
       const token = bearer[1];
       req.token = token;
       try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;  // Attach payload to the request object
        next(); 
      } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
          return res.status(400).json({ message: 'Invalid token', error: err.message });
        } else if (err instanceof jwt.TokenExpiredError) {
          return res.status(401).json({ message: 'Token expired', error: err.message });
        } else {
          // unexpected errors 
          return res.status(500).json({ message: 'Failed to authenticate token', error: err.message });
        }
      }
    }else{
      res.send({
        message : 'Token is not valid'
      })
    }
  }catch(er){
    console.log(er);
    return res.status(500).json({ message: 'Failed to authenticate token', error: err.message });
  }
  }
  module.exports={
    validateJWTToken
  }