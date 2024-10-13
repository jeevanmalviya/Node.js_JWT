const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const authController = require("../controller/authController");


const sanitizeHtml = require('sanitize-html')

const router = Router();
//router.post("/login" , authController.login);
router.post("/authtoken" , authController.loginToken);
router.post("/validate-authtoken" , authController.validateAuthToken);
router.post("/reftoken" , authController.refreshToken);

// // Validation middleware for login route
// router.get(
//     '/login',(req, res, next) => {

//         const sanitizedUsername = sanitizeHtml(req.body.unm);
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       next();
//     },
//     authController.login
//   );
module.exports = router;