const { Router } = require('express');
const userService = require('../service/serviceLayer');

const authentication = require("../jwt/middleware/apiMiddleWare");  

const router = Router();

router.post("/testapi" , authentication.validateJWTToken, userService.getTabledata);


module.exports = router;