const {uploadFileMiddleware} = require("../middlewares/multer");
const { UserImage, User, ImageComment, UserNotification } = require("../models");
const fs = require('fs');
const path = require('path');
const { newNotification } = require("../helpers/userFunctions");

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
const uploadOne = async (req, res) => {
  try {
      if (req.file == undefined) {
          return res.status(400).send({ message: "Please upload a file!" });
      }
      //Catch the data for the db
      const url = `${req.user.id}/${req.file.filename}`;
      const userid = req.user.id;
      const title = req.body.title;

      await UserImage.create({url, userid, title});
      
      return res.status(201).send({
          image: req.file,
          message: 'Image uploaded successfully'
      });

  } catch (error) {
      res.status(500).send({ error: 'Internal Server Error! Try again, please!' })
  }
}
const newComment = async (req, res) => {
  const userid = req.user.id;
  const user_imageid = req.body.imageid;
  const uploaderid = req.photo.user.id;
  const body = req.body.body;
  console.log(req);
  try{

    //Create the comment
    await ImageComment.create({userid, user_imageid, body});
    
    await newNotification(userid, uploaderid, 3, user_imageid);

    res.status(200).send({ok: true});
  }catch(err){
    res.status(403).send({ok: false,
      message: "Something was wrong "+err
    });
  }
}
const uploadProfilePicture = async (req, res) => {

  try {
      console.log("Hello, we are trying to change is photo")
      if (req.file == undefined) {
          return res.status(400).send({ message: "Please upload a file!" });
      }
      //Catch the data for the db
      const url = `${req.user.id}/profile_picture/${req.file.filename}`;
      const userid = req.user.id;

      //Create the image
      const profilePicture = await UserImage.create({url, userid});
      //Change the picture profile from a user
      await User.update(
        {profile_picture: `profile_picture/${profilePicture.id}`},
        {where:{
          id: userid
        }}
      );
      return res.status(201).send({
          message: 'Profile picture changed successfully'
      });

  } catch (error) {
      res.status(400).send({ error: 'Something happens' })
  }
}
/*
const listOwnImages = (req, res) => {
  const userId = req.user.id;
  const folderPath = directoryImages + "/" + userId;

  const staticFilesDirectory = path.join(__dirname, 'static', req.user.id.toString());
  express.static(staticFilesDirectory)(req, res);
 
}*/
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
const getImageAndComments = async (req, res) => {
  const id_image = req.photo.id ||req.params.image_id;
  console.log("Entramos a cargar imagen con sus comentarios");
  const image = await UserImage.findByPk(id_image, {
    include: [
        {
          model: ImageComment, //Model
          as : 'image_comments', //Name relationship
          attributes: ['id', 'body', 	'createdAt' ], //Attributes that we want
          include:{
            model: User,
            as: 'user',
            attributes: ['id','name', 'last_name', 'nickname', 'profile_picture']
          },
        },
        {
          model: User, //Model
          as : 'user', //Name relationship
          attributes: ['id','nickname'], //Attributes that we want
        }
    ]
  });
  console.log("Hola");
  if(!image){
    return res.status(404);
  } 
  console.log("Hola");

  return res.status(200).json(image);
}
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
const serveImage = async (req, res) => {
  const id_image = req.params.image_id;
  console.log("Hola");
  const image = req.photo || await UserImage.findByPk(id_image);

  console.log(image);
  if(!image){
    return res.status(404);
  } 
  console.log("Hola");
  const imagePath = path.join(__dirname, '../static/files', image.url);
  console.log(imagePath);
  try {
    //If file exists in the storage...
    if (fs.existsSync(imagePath)) {
      console.log("Existe");
      return res.status(200).sendFile(imagePath);
    }else{
      return res.status(500);
    }
  } catch(err) {
    return res.status(404);
  }
};
const serveProfilePicture = async (req, res) => {
  const id_image = req.params.id;
  console.log("Hola");
  const image = await UserImage.findOne({
    where:{
      id: id_image     
    }
  });
  console.log(image);
  if(!image || !image.dataValues.url.includes("/profile_picture/")){
    return res.status(404);
  } 
  console.log("Hola");
  const imagePath = path.join(__dirname, '../static/files', image.url);
  console.log(imagePath);
  try {
    //If file exists in the storage...
    if (fs.existsSync(imagePath)) {
      console.log("Existe");
      return res.status(200).sendFile(imagePath);
    }else{
      return res.status(500);
    }
  } catch(err) {
    return res.status(404);
  }
};
const getImagesFromUser = async (req, res) => {
  const id_user = req.user.id;
  const images = await UserImage.findAll({
    where:{
      userid: id_user
    }
  });

  if(!images){
    return res.status(404);
  }

  //We fullfill this with info of every image
  const responseData = images.map(image => {
    return {
      imageUrl: `/images/${image.id}`,
      title: image.title,
      createdAt: image.createdAt
    };
  });
  return res.status(200).send(responseData);
};

//Get a image info
const listImage = async (req, res) => {
  const id_image = req.params.id_image;
  const image = await UserImage.findByPk(id_image);
  if(!image){
    return res.status(404);
  }

  const responseData = {
    imageUrl: `/images/${id_image}`,
    title: image.title,
    createdAt: image.createdAt
  };
  return res.status(200).send(responseData);
};

//Get all the info of pictures from a user



const publicImage = async (req, res) => {
  const url_image = req.params.image;
  const imagePath = path.join(__dirname, '../static/public', url_image);
  try {
    //If file exists...
    if (fs.existsSync(imagePath)) {
      return res.status(200).sendFile(imagePath);
    }
  } catch(err) {
    return res.status(404);
  }
}; 

module.exports = {
  upload,
  getListFiles,
  download,
  uploadOne,
  //listOwnImagesMiddl,
  listImage,
  serveImage,
  publicImage,
  getImagesFromUser,
  uploadProfilePicture,
  serveProfilePicture,
  getImageAndComments,
  newComment
};
