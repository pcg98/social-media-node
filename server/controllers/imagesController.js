const {uploadFileMiddleware} = require("../middlewares/multer");
const { UserImage } = require("../models");
const fs = require('fs');
const express = require('express');
const path = require('path');

const directoryImages = process.env.FOLDER_IMAGES_USERS;


//Method for upload a photo
const upload = async (req, res) => {
  try {
    //Call to the multer
    await uploadFileMiddleware(req, res);
    //If there isn't any file...
    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    console.log(req.file);
    //If work...
    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};
const uploadOne = (req, res) => {

  try {

      if (req.file == undefined) {
          return res.status(400).send({ message: "Please upload a file!" });
      }
      //Catch the data for the db
      const url = `${req.user.id}/${req.file.filename}`;
      const userid = req.user.id;

      UserImage.create({url, userid});
      
      return res.status(201).send({
          image: req.file,
          message: 'Image uploaded successfully'
      });

  } catch (error) {
      res.status(500).send({ error: 'Internal Server Error! Try again, please!' })
  }
}
const listOwnImages = (req, res) => {
  const userId = req.user.id;
  const folderPath = directoryImages + "/" + userId;

  const staticFilesDirectory = path.join(__dirname, 'static', req.user.id.toString());
  return express.static(staticFilesDirectory)(req, res);

}
//Get the files from a site
const getListFiles = (req, res) => {
    //Read the user folder
    const directoryPath = `${process.env.FOLDER_IMAGES_USERS}/${req.user.id}`;

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
        res.status(500).send({
            message: "Unable to scan files!",
        });
        }

        let fileInfos = [];

        files.forEach((file) => {
        fileInfos.push({
            name: file,
            url: directoryPath + file,
        });
        });

        res.status(200).send(fileInfos);
    });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
  uploadOne,
  listOwnImages
};
