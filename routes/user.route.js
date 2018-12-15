const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
router.get("/", controller.index);
// query search 
router.get("/search", controller.search);

router.get("/create", controller.create);
router.post("/create", controller.postCreate);

router.get("/:id", controller.get);

module.exports = router; // nhớ exports ko lại bị lỗi