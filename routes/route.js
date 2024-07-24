const router = require("express").Router();
const user = require("../controllers/productControllers");
const image = require("../middleware/fileupload");
const auth = require("../Auth/auth");
router.post("/registerUser", user.Register);
router.post("/login", user.Login);
router.post("/addProduct",auth.Authenticate,image.uploadImg.array('images', 6), user.AddProduct);


module.exports = router;
