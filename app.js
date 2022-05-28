const path = require("path");
const Koa = require("koa");
const serve = require("koa-static");
const cors = require("@koa/cors");

const {STATIC, PORT} = require('./config/const.js');
const router = require('./src/router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

// 注册中间件
app.use(cors());
app.use(serve(STATIC));
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`app starting at port ${PORT}`);
});
