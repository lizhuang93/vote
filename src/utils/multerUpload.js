const multer = require("@koa/multer");
const { UPLOAD_DIR} = require('../../config/const')
const { getDate } = require('./helper')

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    // 设置文件的存储目录
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    // 设置文件名
    cb(null, `${getDate()}${file.originalname}`);
  },
});

const multerUpload = multer({ storage });


module.exports = multerUpload