const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {    
    
    cb(null, `${Date.now() + file.originalname}`);
  },
});
const uploadImg = multer({ storage: storage });

exports.uploadImg = uploadImg;
