const  express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/authenticate")

const Controller = require("./station.controller")



// router.use(verifyJWT);



router.get("/nearby", Controller.nearby_station);


module.exports = router;