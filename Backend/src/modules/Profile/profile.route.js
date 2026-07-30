const  express = require("express");
const router = express.Router();
const MulterMiddleware = require("../../middleware/multer")

const profileController = require("./profile.controller")
const verifyJWT = require("../../middleware/authenticate")

router.use(verifyJWT);


router.get("/", profileController.getProfile);
router.put("/", profileController.updateProfile);
router.put("/photo", MulterMiddleware.single("photo") ,profileController.uploadProfilePhoto);

module.exports = router;