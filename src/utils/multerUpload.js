const multer = require("@koa/multer");
const { UPLOAD_DIR} = require('../../config/const')
const { getDate, getUrlParams } = require('./helper')

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    // 设置文件的存储目录
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    // 设置文件名
    console.log(getUrlParams(req.url));
    
    cb(null, `${getDate()}${getUrlParams(req.url).mobile}${file.originalname}`);
  },
});

const multerUpload = multer({ storage });


module.exports = multerUpload