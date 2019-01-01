const express = require('express');
const multer = require('multer');

const router = express.Router();
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file , cb) => {
    if(!file.mimetype.match(/jpg|jpeg|png|$i/)) {
      cb(new Error('File type is not supported'), false);
      return;
    }
      cb(null, true);
  }
});

const controller = require('../controllers/user.controller');
const validate = require('../validate/user.validate');
const authMiddleware = require('../middlewares/auth.middleware');

router.get("/", authMiddleware.requireCookie, controller.index);
// query search 
router.get("/search", controller.search);

router.get("/create", controller.create);

router.post("/create",
  upload.single('avatar'),
  validate.postCreate,
  controller.postCreate);


// router.get("/logout", controller.logout);
router.get("/:id", controller.get);

module.exports = router; // nhớ exports ko lại bị lỗi