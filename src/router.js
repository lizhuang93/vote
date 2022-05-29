

const Router = require("@koa/router");
const multerUpload = require('./utils/multerUpload')
const { SERVER} = require('../config/const')
const {getDate} = require('./utils/helper')
const db = require('./db')

const router = new Router();

router.get("/", async (ctx) => {
  ctx.body = "欢迎使用文件服务";
});

router.post(
  "/upload/single",
  async (ctx, next) => {
    try {
      await next();
      const imgId = `${getDate()}${ctx.file.originalname}`
      const sql = `select * from user where imgId='${imgId}' and del=0`
      const rows = await db.query(sql)
      if(rows.length > 0) {
        ctx.body = {
          code: 4,
          msg: "请勿重复上传！",
        };
      } else {
        ctx.body = {
          code: 0,
          msg: "文件上传成功",
          url: `${SERVER}/uploads/${imgId}`,
          imgId
        };
      }

    } catch (error) {
      ctx.body = {
        code: 1,
        msg: "文件上传失败"
      };
    }
  },
  multerUpload.single("file")
);

router.post(
  "/addWork",
  async (ctx, next) => {
    try {
      const { name, mobile, workName, workDesc, imgId, url } = ctx.request.body
      const sql = `INSERT INTO user (name, mobile, workName, workDesc, imgId, url) VALUES('${name}', '${mobile}', '${workName}', '${workDesc}', '${imgId}', '${url}')`
      const rows = await db.query(sql)
      ctx.body = {
        code: 0,
        msg: 'ok'
      }
    } catch (error) {
      ctx.body = {
        code: 2,
        msg: '保存失败'
      }
    }
  },

);

router.post(
  "/list",
  async (ctx, next) => {
    try {
      const { pageNo, pageSize } = ctx.request.body
      const sql = `select * from user where del=0 order by create_time limit ${(pageNo - 1) * pageSize}, ${pageSize}`
      const countSql = `select count(*) from user where del=0`
      const rows = await db.query(sql)
      const total = await db.query(countSql)
      ctx.body = {
        code: 0,
        msg: 'ok',
        data: rows,
        total: total[0]['count(*)']
      }
    } catch (error) {
      ctx.body = {
        code: 7,
        msg: '查询失败'
      }
    }
  },

);

router.get(
  "/preViewList",
  async (ctx, next) => {
    try {
      const {imgId} = ctx.request.query
      const date = imgId.slice(0, 8)
      const sql = `select * from user where imgId like '${date}%' and del=0 order by create_time`
      const rows = await db.query(sql)
      ctx.body = {
        code: 0,
        msg: 'ok',
        data: rows
      }
    } catch (error) {
      ctx.body = {
        code: 6,
        msg: '查询失败'
      }
    }
  },

);

router.post(
  "/vote",
  async (ctx, next) => {
    try {
      const { imgId } = ctx.request.body
      const sql = `update user set vote_num=vote_num+1 where imgId='${imgId}'`
      const rows = await db.query(sql)
      ctx.body = {
        code: 0,
        msg: 'ok',
      }
    } catch (error) {
      ctx.body = {
        code: 5,
        msg: '投票失败'
      }
    }
  },

);


router.get(
  "/rank",
  async (ctx, next) => {
    try {
      const sql = `select * from user where del=0 order by vote_num desc limit 0, 10`
      const rows = await db.query(sql)
      ctx.body = {
        code: 0,
        msg: 'ok',
        data: rows
      }
    } catch (error) {
      ctx.body = {
        code: 8,
        msg: '查询失败'
      }
    }
  },

);

router.get(
  "/myRank",
  async (ctx, next) => {
    try {
      const {imgId} = ctx.request.query
      const sql = `select imgId from user where del=0 order by vote_num desc `
      const rows = await db.query(sql)
      const idx = rows.findIndex(row => row.imgId === imgId)
      ctx.body = {
        code: 0,
        msg: 'ok',
        data: idx !== -1 ? idx + 1 : -1
      }
    } catch (error) {
      ctx.body = {
        code: 9,
        msg: '查询失败'
      }
    }
  },

);


router.post(
  "/del",
  async (ctx, next) => {
    try {
      const { imgId } = ctx.request.body
      const sql = `update user set del=1 where imgId='${imgId}'`
      const rows = await db.query(sql)
      ctx.body = {
        code: 0,
        msg: 'ok',
      }
    } catch (error) {
      ctx.body = {
        code: 10,
        msg: '投票失败'
      }
    }
  },

);

router.get(
  "/pwd",
  async (ctx, next) => {
    try {
      const { pwd } = ctx.request.query
      const sql = `select * from pwd where pwd='${pwd}'`
      const rows = await db.query(sql)
      console.log(rows);
      if(rows.length > 0) {
        ctx.body = {
          code: 0,
          msg: 'ok'
        }
      }else {
        ctx.body = {
          code: 11,
          msg: '口令错误'
        }
      }
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: 12,
        msg: '查询失败'
      }
    }
  },

);


module.exports = router