const express = require("express");
const db = require("../modules/connect_db");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const upload = require("../modules/upload-avatar");
const uploadimg = require("../modules/upload-chatimg");
const moment = require("moment-timezone");
const nodemailer = require("nodemailer");
const { exit } = require("process");

//讓創建日期+X天
// Date.prototype.addDays = function(days) {
//     this.setDate(this.getDate() + days);
//     return this;
// }

// 所有會員的基本資料
router.get("/all", async (req, res) => {
  const sql = await db.query(
    "SELECT * FROM `member` WHERE 1 ORDER BY `member`.sid DESC"
  );
  const created = sql[0].map((v, i) =>
    moment(v.mem_created_at).format("YYYY-MM-DD")
  );
  // console.log(created);
  // 把改好的覆蓋原本的
  sql[0].map((v, i) => (v.mem_created_at = created[i]));
  res.json(sql[0]);
});

// 註冊
router.post("/register", upload.none(), async (req, res) => {
  const output = {
    success: false,
    code: 0,
    error: "",
  };

  //後端檢查用
  const schema = Joi.object({
    //字串類型
    name: Joi.string()
      //最少2個字
      .min(2)
      //必填欄位
      .required()
      //欄位變數名稱用中文顯示
      .label("姓名必填"),
    nickname: Joi.any(),
    email: Joi.string().email().required(),
    mobile: Joi.any(),
    account: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
    //可以是任何類型
    birthday: Joi.any(),
    address: Joi.any(),
    avatar: Joi.any(),
  });

  const find = schema.validate(req.body, { abortEarly: false });

  if (find.error) {
    output.code = 401;
    output.error = "資料有錯誤";
    return res.json(output);
  }

  // 給他們預設值 (前端不給欄位)
  // 如果沒給頭貼
  if (!req.body.avatar) {
    req.body.avatar = "images.png";
  }
  if (!req.body.nickname) {
    req.body.nickname = "";
  }
  if (!req.body.email) {
    req.body.email = "";
  }
  if (!req.body.mobile) {
    req.body.mobile = "";
  }
  if (!req.body.birthday) {
    req.body.birthday = null;
  }
  if (!req.body.address) {
    req.body.address = "";
  }

  const {
    name,
    nickname,
    account,
    password,
    email,
    mobile,
    birthday,
    address,
    avatar,
  } = req.body;

  // 亂數出五位數整數
  const userHash = parseInt(Math.random() * 100000);

  // 寄出Gmail
  // const gg = 'hdkboeirumxpwgalgary'
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "fteamgary@gmail.com",
      pass: "hdkboeirumxpwgal",
    },
  });

  transporter
    .sendMail({
      from: "fteamgary@gmail.com",
      to: email,
      subject: "SB感謝您的註冊，請開通帳號",
      html: `<h2>您的驗證碼為 : ${userHash}</h2>
                <p>***該驗證碼5分鐘內有效***</p>`,
    })
    .then((info) => {
      console.log({ info });
    })
    .catch(console.error);

  // 密碼加密再存進資料庫
  const hashpassword = bcrypt.hashSync(password);

  const sql =
    "INSERT INTO `member`(`mem_name`,`mem_nickname`,`mem_level`,`mem_account`,`mem_password`, `mem_email`, `mem_mobile`, `mem_birthday`, `mem_address`, `mem_avatar`, `mem_bollen`, `hash`, `verify`, `google_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)";

  const avatarURL = 'http://localhost:3000/avatar/' + avatar;

  // 把註冊資料存進資料庫 verify預設給off是為了讓信箱驗證
  const [result] = await db.query(sql, [
    name,
    nickname,
    "平民",
    account,
    hashpassword,
    email,
    mobile,
    birthday,
    address,
    avatarURL,
    userHash,
    "off",
    '',
  ]);

  output.success = true;
  res.json(output);

  // 5分鐘後再給一次新的亂數使原先驗證碼失效
  setTimeout(async () => {
    // 亂數出新的五位數整數
    const newUserHash = parseInt(Math.random() * 100000);
    // 更改原先驗證碼
    const changeHash = `UPDATE member SET hash=? WHERE mem_email='${req.body.email}'`;
    const [resultChange] = await db.query(changeHash, [newUserHash]);
    //時間設定為5分鐘
  }, 1000 * 60 * 5);
});

// 開通驗證
router.put("/verify", upload.none(), async (req, res) => {
  const output = {
    success: false,
    code: 0,
    error: "",
  };

  const [sql] = await db.query(
    `SELECT * FROM member WHERE mem_email='${req.body.email}'`
  );

  if (req.body.verify !== sql[0].hash) {
    output.error = "驗證碼不符";
    return res.json(output);
  }

  // 開通帳號
  const changeverify = `UPDATE member SET verify=? WHERE mem_email='${req.body.email}'`;

  const [result] = await db.query(changeverify, ["on"]);

  output.success = true;

  res.json(output);
});

// 登入 JWT
router.post("/login", upload.none(), async (req, res) => {
  const output = {
    success: false,
    bollen: false,
    new: false,
    grade: "low",
    token: "",
    info: null,
    code: 0,
    error: "",
  };

  const [rs] = await db.query("SELECT * FROM member WHERE mem_account=?", [
    req.body.account,
  ]);

  if (!rs.length) {
    output.error = "帳密錯誤";
    output.code = 401;
    return res.json(output);
  }

  const row = rs[0];

  // 資料庫密碼解密
  const compareResult = await bcrypt.compare(
    req.body.password,
    row.mem_password
  );

  if (!compareResult) {
    output.error = "密碼錯誤";
    output.code = 402;
    return res.json(output);
  }

  // 沒驗證帳號
  if (row.verify !== "on") {
    output.error = "帳號沒驗證";
    output.code = 403;
    return res.json(output);
  }

  if (row.mem_bollen === 1) {
    output.bollen = true;
  } else {
    output.bollen = true;
    output.error = "帳號已被停用";
    output.code = 403;
    return res.json(output);
  }

  const { sid, mem_account, mem_nickname, mem_created_at, mem_avatar } = row;

  const now = Date.now();
  const newOld = now - Date.now(mem_created_at);
  // 86400000是24小時的毫秒數
  if (newOld < 86400000) {
    output.new = true;
  }

  output.success = true;
  output.info = {
    grade: output.grade,
  };

  // 進行加密讓前端頁面看不出來
  output.token = jwt.sign(
    {
      sid,
      mem_created_at,
    },
    process.env.JWT_KEY
  );

  res.json(output);
});

// 登入中會員自己的資料
router.get("/memberself", async (req, res) => {
  if (res.locals.user === null) {
    return;
    exit();
  } else {
    const [sql] = await db.query(
      `SELECT * FROM member WHERE sid=${res.locals.user.sid}`
    );

    const birthday = moment(sql[0].mem_birthday).format("YYYY-MM-DD");
    sql[0].mem_birthday = birthday;
    res.json(sql[0]);
  }

});

// 資料修改
router.put("/edit", upload.none(), async (req, res) => {
  if (res.locals.user === null) {
    return;
  }
  const output = {
    success: false,
    code: 0,
    error: "",
  };

  //後端檢查用
  const schema = Joi.object({
    //字串類型
    name: Joi.string()
      //最少2個字
      .min(2)
      //必填欄位
      .required()
      //欄位變數名稱用中文顯示
      .label("姓名必填"),
    nickname: Joi.any(),
    email: Joi.string().email().required(),
    mobile: Joi.any(),
    account: Joi.any(),
    //可以是任何類型
    birthday: Joi.any(),
    address: Joi.any(),
  });

  const find = schema.validate(req.body, { abortEarly: false });

  if (find.error) {
    output.code = 401;
    output.error = "資料有錯誤";
    return res.json(output);
  }

  const sql = `UPDATE member SET mem_name=?,mem_nickname=?,mem_account=?,mem_email=?,mem_mobile=?,mem_birthday=?,mem_address=? WHERE sid=${res.locals.user.sid}`;

  // 如果沒填 給空字串
  if (!req.body.nickname) {
    req.body.nickname = "";
  }
  if (!req.body.mobile) {
    req.body.mobile = "";
  }
  if (!req.body.address) {
    req.body.address = "";
  }
  if (!req.body.account) {
    req.body.account = "";
  }

  // console.log(req.body.birthday); 失效日期
  if (req.body.birthday === 'Invalid date') {
    req.body.birthday = null;
  }

  const { name, nickname, account, email, mobile, birthday, address } =
    req.body;

  const [result] = await db.query(sql, [
    name,
    nickname,
    account,
    email,
    mobile,
    birthday,
    address,
  ]);

  output.success = true;
  output.body = req.body;
  res.json(output);
});

// 密碼修改
router.put("/password", upload.none(), async (req, res) => {
  if (res.locals.user === null) {
    return;
  }
  const output = {
    success: false,
    code: 0,
    error: "",
  };

  // 取得原密碼
  const [password] = await db.query(
    `SELECT mem_password FROM member WHERE sid=${res.locals.user.sid}`
  );

  const user_passsword = password[0].mem_password;

  // 對比用戶輸入的原密碼是否一樣
  const compareResult = await bcrypt.compare(req.body.password, user_passsword);

  if (!compareResult) {
    output.code = 401;
    output.error = "原密碼不符";
    return res.json(output);
  }

  //後端檢查用 格式
  const schema = Joi.object({
    password: Joi.string().required(),
    newPassword: Joi.string().required(),
  });

  const find = schema.validate(req.body, { abortEarly: false });

  if (find.error) {
    output.code = 402;
    output.error = "新密碼格式不符";
    return res.json(output);
  }

  // 更改密碼
  const sql = `UPDATE member SET mem_password=? WHERE sid=${res.locals.user.sid}`;

  const { newPassword } = req.body;

  // 新密碼加密後存資料庫
  const hash = bcrypt.hashSync(newPassword);

  const [result] = await db.query(sql, [hash]);

  output.success = true;
  res.json(output);
});

// 刪除帳號
router.delete("/", async (req, res) => {
  if (res.locals.user === null) {
    return;
  }
  const output = {
    success: false,
    code: 0,
    error: "",
  };
  const sql = await db.query(
    `DELETE FROM member WHERE sid=${res.locals.user.sid}`
  );
  output.success = true;
  res.json(output);
});

// 上傳頭貼
router.post("/upload", upload.single("avatar"), (req, res) => {
  res.json(req.file);
});

// 會員中心單獨更換頭貼
router.put("/avatar", upload.none(), async (req, res) => {
  if (res.locals.user === null) {
    return;
  }
  const output = {
    success: false,
    code: 0,
    error: "",
  };

  // 更改頭貼
  const sql = `UPDATE member SET mem_avatar=? WHERE sid=${res.locals.user.sid}`;
  const { avatar } = req.body;
  const [result] = await db.query(sql, [avatar]);

  output.success = true;
  res.json(output);
});

// 會員商品收藏
router.get("/favorite", async (req, res) => {
  if (res.locals.user === null) {
    return;
  }
  const [sql] = await db.query(
    `SELECT * FROM favorite WHERE memId=${res.locals.user.sid} ORDER BY favorite.sid DESC`
  );

  res.json(sql);
});

// 取消商品收藏
router.post("/delfavorite", async (req, res) => {
  if (!req.body.sid) {
    return;
  }
  const output = {
    success: false,
    code: 0,
    error: "",
  };
  const sql = await db.query(`DELETE FROM favorite WHERE sid=${req.body.sid}`);
  output.success = true;
  res.json(output);
});

// 會員購買紀錄 商品
router.get("/recordproducts", async (req, res) => {
  if (res.locals.user === null) {
    return;
  }
  const [sql] = await db.query(
    `SELECT order_details.*, product.*, orders.order_date FROM order_details JOIN product ON order_details.item_id = product.sid JOIN orders ON order_details.order_id = orders.sid WHERE order_details.member_id =${res.locals.user.sid} AND item_type = 'product' ORDER BY order_details.sid DESC`
  );
  // 把時間格式改正常常見格式
  const order_date = sql.map((v, i) =>
    moment(v.order_date).format("YYYY-MM-DD")
  );
  // console.log(order_date);
  // 把改好的覆蓋原本的
  sql.map((v, i) => (v.order_date = order_date[i]));
  res.json(sql);
});

// 會員購買紀錄 客製化商品
router.get("/recordcustomized", async (req, res) => {
  if (res.locals.user === null) {
    return;
  }
  const [sql] = await db.query(
    `SELECT order_details.*, custom.*, orders.order_date FROM order_details JOIN custom ON order_details.item_id = custom.sid JOIN orders ON order_details.order_id = orders.sid WHERE order_details.member_id =${res.locals.user.sid} AND item_type = 'custom' ORDER BY order_details.sid DESC`
  );
  // 把時間格式改正常常見格式
  const order_date = sql.map((v, i) =>
    moment(v.order_date).format("YYYY-MM-DD")
  );
  // console.log(order_date);
  // 把改好的覆蓋原本的
  sql.map((v, i) => (v.order_date = order_date[i]));
  res.json(sql);
});

// 會員購買紀錄 課程
router.get("/lesson", async (req, res) => {
  if (res.locals.user === null) {
    return;
  }
  const [sql] = await db.query(
    `SELECT orders.order_date ,order_details.price AS 'truePrice' ,lesson.*, dance_category.type,teacher_category.teacher_name AS 'teacherName' FROM orders JOIN order_details ON orders.sid=order_details.order_id JOIN lesson ON order_details.item_id= lesson.sid JOIN dance_category ON lesson.dance_id= dance_category.sid JOIN teacher_category ON teacher_category.sid=lesson.teacher_id WHERE orders.member_sid=${res.locals.user.sid} AND order_details.item_type='lesson' ORDER BY order_details.sid DESC`
  );
  // 把時間格式改正常常見格式
  const order_date = sql.map((v, i) =>
    moment(v.order_date).format("YYYY-MM-DD")
  );
  const begin = sql.map((v, i) =>
    moment(v.duringtime_begin).format("YYYY-MM-DD")
  );
  const end = sql.map((v, i) => moment(v.duringtime_end).format("YYYY-MM-DD"));
  // console.log(order_date);
  // 把改好的覆蓋原本的
  sql.map((v, i) => (v.order_date = order_date[i]));
  sql.map((v, i) => (v.duringtime_begin = begin[i]));
  sql.map((v, i) => (v.duringtime_end = end[i]));
  res.json(sql);
});

// 所有聊天室資料
router.get("/chat", async (req, res) => {
  const sql = await db.query(
    "SELECT memberchat.*, member.mem_name, member.mem_nickname, member.mem_avatar FROM memberchat JOIN member WHERE memberchat.mem_sid = member.sid"
  );

  res.json(sql[0]);
});

// 寫入聊天室
router.post("/chat", upload.none(), async (req, res) => {
  if (res.locals.user === null) {
    return;
  }

  const output = {
    success: false,
    code: 0,
    error: "",
  };

  const sql = "INSERT INTO `memberchat`(`mem_sid`, `message`) VALUES (?, ?)";

  const { message } = req.body;

  if (!message) {
    return;
  }

  const [result] = await db.query(sql, [res.locals.user.sid, message]);

  output.success = true;
  res.json(output);
});

// 聊天室上傳照片
router.post("/chatupload", uploadimg.single("chatimg"), (req, res) => {
  res.json(req.file);
});

module.exports = router;
