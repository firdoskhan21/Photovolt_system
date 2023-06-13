const express = require("express");
const router = express.Router();
const fileController = require("../controllers/files.controller");
const upload = require('../multer-helper')

router.post("/upload", upload.single('file'), fileController.uploadFile);
router.get("/getAll", fileController.allFiles);
router.get("/download/:id", fileController.download_file);
router.put('/block_file', fileController.block_file)

module.exports = router;

