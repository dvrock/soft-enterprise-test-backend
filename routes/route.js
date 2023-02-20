const router = require("express").Router();
const user = require("../controllers/carControllers");

const image = require("../middleware/fileupload");
const auth = require("../Auth/auth");

router.post("/registerUser", user.Register);

router.post("/login", user.Login);
router.post("/addCar",auth.Authenticate,image.uploadImg.array('images', 10), user.AddCar);


module.exports = router;
