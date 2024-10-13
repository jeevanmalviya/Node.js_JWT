// for json web token
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authServiceObj = require("../service/authService");

// Function to generate a 6-digit token
const generateToken = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const authToken = {}; // Object to store tokens and their expiration times

const authController = {
  loginToken: async (req, res) => {
    try {
      const {unm} = req.body;
      const result = await authServiceObj.getUserData(req, res);
      console.log(result);
      if (result) {
        const token = generateToken();
        const expirationTime = Date.now() + 5 * 60 * 1000; // 5 minutes from now

        // Store token with its expiration time
        authToken[token] = { unm, expirationTime };
        console.log(`Generated Token: ${token}, Expires at: ${new Date(expirationTime)}`);
        res.json({
          message: "6 Digit Token is generated successfully",
          token: token,
          expiresIn: "The token will expires in 5 minute",
        });
      } else {
        res.json({
          message: "Invaild UserName/Password",
        });
      }
    } catch (error) {
      console.log(error.message);
      res.json({
        message: "Error occured during login function",
      });
    }
  },
  validateAuthToken: async (req, res) => {
    try {
      const { token, username } = req.body;
      
      if (authToken[token]) {
        const { unm: tokenUsername, expirationTime } = authToken[token];

        // Check if the username matches and the token is still valid
        if (tokenUsername === username && expirationTime > Date.now()) {
            //return res.json({ valid: true, message: 'Token is valid!' });
            const userData = req.body;
        jwt.sign(
          { userData },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "300s" },
          (err, token) => {
            if (err) {
              res.json({
                message: "Exrror while token Generation",
              });
            }
            console.log(token);
            let obj = Math.random();
            res.json({
              message: "JWT Token is generated successfully",
              token: token,
              expiresIn: "The token will expires in 5 minute",
            });
          });
        } else if (expirationTime <= Date.now()) {
            return res.json({ valid: false, message: 'Token is expired.' });
        } else {
            return res.json({ valid: false, message: 'Token does not belong to the current user.' });
        }
    } else {
        res.json({ valid: false, message: 'Token is invalid.' });
    }
    } catch (error) {
      console.log(error.message);
      res.json({
        message: "Error occured during login function",
      });
    }
  },
  // login: async (req, res) => {
  //   try {
  //     const result = await authServiceObj.getUserData(req, res);
  //     console.log(result);
  //     if (result) {
  //       const userData = req.body;
  //       jwt.sign(
  //         { userData },
  //         process.env.JWT_SECRET_KEY,
  //         { expiresIn: "300s" },
  //         (err, token) => {
  //           if (err) {
  //             res.json({
  //               message: "Exrror while token Generation",
  //             });
  //           }
  //           console.log(token);
  //           let obj = Math.random();
  //           res.json({
  //             message: "Token is generated successfully",
  //             token: token,
  //             expiresIn: "The token will expires in 5 minute",
  //           });
  //         }
  //       );
  //     } else {
  //       res.json({
  //         message: "Invaild UserName/Password",
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     res.json({
  //       message: "Error occured during login function",
  //     });
  //   }
  // },

  refreshToken: async (req, res) => {
    try {
      const bearerHeader = req.headers["authentication"];
      if (typeof bearerHeader == "undefined") {
        res.json({
          message: "Token is Required to check on Refresh token function",
        });
      }
      const bearer = bearerHeader.split(" ");
      const oldToken = bearer[1];
      const decoded = jwt.verify(oldToken, process.env.JWT_SECRET_KEY);

      const exp = decoded.exp; // expiration time
      // const iat = decoded.iat;

      // current time in UNIX timestamp (seconds since epoch)
      const currentTime = Math.floor(Date.now() / 1000);

      // time left until the token expires in seconds
      const remainingTime = exp - currentTime;

      req.user = decoded;
      jwt.verify(oldToken, process.env.JWT_SECRET_KEY, (err, data) => {
        if (err) {
          res.json({
            message: "Invaild or Expire token on Refresh token function",
            ErrorCause: err.name,
          });
        }
        // gene new token
        const newToken = jwt.sign(
          { ud: "UserData" },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "300s",
          }
        );
        console.log(newToken);
        return res.json({
          message: "Token is Refreshed successfully ",
          token: newToken,
          expiresIn: "The token will expires in 5 minute",
        });
      });
    } catch (error) {
      console.log(error.message);
      res.json({
        message: "Error occured during Refresh token function",
      });
    }
  },
};

module.exports = authController;
