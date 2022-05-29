// 上传后资源的URL地址

const path = require("path");

const PORT = 9000;

module.exports = {
  PORT,
  // 服务
  SERVER: `http://39.98.139.162:${PORT}`,
  // 静态目录
  STATIC: path.join(__dirname, "../public"),
  // 存储上传文件的目录
  UPLOAD_DIR: path.join(__dirname, "../public/uploads"),
  // 临时目录
  TMP_DIR: path.join(__dirname, "../public/uploads/tmp"),
  // 忽略的文件列表
  IGNORES: [".DS_Store"],
}