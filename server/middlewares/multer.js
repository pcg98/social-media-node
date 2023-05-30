const multer = require('multer');
const path = require('path')

const imageFolder = './'+process.env.FOLDER_IMAGES_USERS;
const maxSize = 2 * 1024 * 1024;


//We put where we want to save the image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //In the folder of the user
    cb(null, `${imageFolder}/${req.user.id}`);
  },
  filename: function (req, file, cb) {
    //We put the title
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    return cb(new Error("Invalid file type."), false );
  }
};
const fileLimits = {
  fileSize: maxSize,
  files: 1,
  fileSize: maxSize
}

const upload  = multer({ storage: storage, fileFilter: fileFilter, limits: fileLimits });


module.exports = { upload };
