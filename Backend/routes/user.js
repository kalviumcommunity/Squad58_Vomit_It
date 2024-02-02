const express = require("express");
const {pongtest} = require("../controllers/user");
const router = express.Router();



router.get("/ping", pongtest);



module.exports = router;