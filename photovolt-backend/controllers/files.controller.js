const constants = require('../config');
const File = require('../models/files.model');
const mongoose = require("mongoose");
const fileBlockController = require('./blocklist_service')
//create bucket for chunks and file storing in mongodb
let bucket;
mongoose.connection.on("connected", () => {
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: constants.bucket
  });
});

// functions for gfs storage and gerenrate url
generateUrl = (id) => {
  return constants.static_host + id
}
////////

exports.uploadFile = async (req, res) => {
  try {
    var response = {}
    const { title, description } = req.body;
    const queryParam = {
      _id: req.file.id,
      title,
      description,
      mimetype: req.file.mimetype,
      originalfilename: req.file.originalname,
      is_blocked: false
    }
    const file = await File(queryParam);
    await file.save();
    let url = generateUrl(req.file.id)
    const getFile = await File.updateOne(
      { "_id": req.file.id },
      { $set: { "file_url": url } })
    response = { file_data: req.body, message: "File uploaded succefully", status: 'success' }
    response.file_meta = req.file
    response.file_data.fileUrl = url
    res.status(200).send(response)

  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
},
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
  ;


exports.allFiles = async (req, res) => {
  try {
    const files = await File.find({});
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
};

exports.download_file = async (req, res) => {
  try {
    const fileObj = await File.findOne({ _id: req.params.id });
    console.log(fileObj)
    const file = bucket
      .find({
        filename: fileObj.originalfilename
      })
      .toArray((err, files) => {
        console.log(files)
        if (!files || files.length === 0) {
          return res.status(404)
            .json({
              err: "no files exist"
            });
        }
        bucket.openDownloadStreamByName(fileObj.originalfilename)
          .pipe(res);
      });

  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
};


exports.block_file = async (req, res) => {
  const file = fileBlockController.check_file('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')
  console.log(file)

}