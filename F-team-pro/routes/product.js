const { log } = require("console");
const express = require("express");
const db = require("../modules/connect_db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { exit } = require("process");

// 全部商品
router.get("/", async (req, res) => {
  let output = {
    perPage: 15,
    page: 1,
    totalRows: 0,
    totalPages: 0,
    code: 0, // 辨識狀態
    error: "",
    query: {},
    rows: [],
  };
  let page = +req.query.page || 1;
  let where = " WHERE 1=1 ";
  let orderfield = "sid";
  let sort = "ASC";
  let perPage = +req.query.perPage || 15;

  // 預設 ORDER BY SID，如果要查詢更動 ORDER BY SID
  switch (req.query.orderfield) {
    case "categoryId":
      orderfield = "category_id";
      break;
    case "brand":
      orderfield = "brand";
      break;
    case "name":
      orderfield = "name";
      break;
    case "price":
      orderfield = "price";
      break;
    default:
      orderfield = "sid";
      break;
  }

  let sql02 = `SELECT * FROM product ${where}`;

  // 預設都是null，如果不等於null，我才要執行前端送來的參數，不然都是null執行全部
  if (req.query.categoryId != 0) {
    let categoryId = req.query.categoryId;
    sql02 = sql02 + " and category_id = " + categoryId;
  }
  if (req.query.brand != null) {
    let brand = req.query.brand;
    let brandStr = "";

    for (let i = 0; i < brand.length; i++) {
      // 陣列的長度 -1，等於索引值，如果只有一個的時候 沒有最後的逗號 (如果有就會報錯)
      // 如果是多個就會在後面加上逗號，把陣列效果成功轉成sql語法
      if (brand.length - 1 == i) {
        brandStr = brandStr + ("'" + brand[i] + "'");
      } else {
        brandStr = brandStr + ("'" + brand[i] + "'" + ",");
      }
    }
    sql02 = sql02 + " and brand in (" + brandStr + ")";
  }

  if (req.query.color != null) {
    let color = req.query.color;
    let colorStr = "";

    for (let i = 0; i < color.length; i++) {
      if (color.length - 1 == i) {
        colorStr = colorStr + ("'" + color[i] + "'");
      } else {
        colorStr = colorStr + ("'" + color[i] + "'" + ",");
      }
    }
    sql02 = sql02 + " and color in (" + colorStr + ")";
  }

  if (req.query.sort != "") {
    sort = req.query.sort;
  }

  if (req.query.priceRange != null) {
    let priceRange = req.query.priceRange;
    sql02 =
      sql02 + " and price BETWEEN " + priceRange[0] + " AND " + priceRange[1];
  }

  if (req.query.searchName != "") {
    let searchName = req.query.searchName;
    sql02 = sql02 + " AND name LIKE" + `'%${searchName}%'`;
  }
  // console.log("req.query==", req.query);

  // console.log("sql02==", sql02);

  // 限制商品有幾筆
  let sql04 = ` ORDER BY ${orderfield} ${sort} LIMIT ${
    (page - 1) * output.perPage
  }, ${perPage}`;

  let [r2] = await db.query(sql02 + sql04);
  output.rows = r2;

  // console.log("compSQL==", sql02 + sql04);

  // 拿到總數量
  let [r3] = await db.query(sql02);
  const totalRows = r3.length;

  // 拿到總頁數
  let totalPages = Math.ceil(totalRows / output.perPage);
  output.code = 200;
  output = { ...output, page, totalRows, totalPages, perPage };
  res.json(output);
});

// ----------------------------------------------------------------------------------------------------

// 加入收藏
router.post("/favorites", async (req, res) => {
  const output = {
    success: "",
    error: "",
  };

  const memId = res.locals.user.sid;

  // 如果沒有收藏商品
  if (!req.body.sid) {
    output.error = "沒有商品";
    return res.json(output);
  }

  // 判斷該商品是否已加加入收藏
  const sql03 = `SELECT COUNT(1) num FROM favorite WHERE favoriteId=? AND memId=?`;
  const [[{ num }]] = await db.query(sql03, [req.body.sid, memId]);
  if (num > 0) {
    const deleteSql03 = "DELETE FROM favorite WHERE memId=? AND favoriteId=?";
    await db.query(deleteSql03, [memId, req.body.sid]);
    output.success = "false";
    return res.json(output);
  }

  // 拿到該商品編碼的商品明細
  const sql = "SELECT * FROM `product` WHERE sid = ?";
  const [r1] = await db.query(sql, [req.body.sid]);
  if (!r1.length) {
    output.error = "沒有這個商品";
    return res.json(output);
  }

  const sql2 =
    "INSERT INTO `favorite`(`memId`, `favoriteImg`, `favoriteName`,`favoriteBrand`,`favoritePrice`,`favoriteId`) VALUES (?, ?, ?,?,?,?)";
  // 假設用戶編號 fake_user
  // console.log("dasasasdas", res.locals.user.sid);
  const [r2] = await db.query(sql2, [
    memId,
    req.body.favoriteImg,
    req.body.favoriteName,
    req.body.favoriteBrand,
    req.body.favoritePrice,
    req.body.sid,
  ]);
  // 如果該商品有成功添加
  if (r2.affectedRows) {
    output.success = "true";
  }
  // console.log("req.body==", req.body);
  // console.log("output==", output);

  res.json(output);
});

// --------------------------------------------------------------------------------------

// 收藏總數
router.get("/favoriteCount", async (req, res) => {
  const sql = `select count(sid) from favorite where memId =${res.locals.user.sid}`;
  const [r1] = await db.query(sql);
  // console.log("r1-----01", r1);
  // console.log("sql------02", sql);
  res.json(r1[0]);
});

// ---------------------------------------------------------------------------------------

// 比對該會員收藏哪些商品
router.get("/whoFavorites", async (req, res) => {
  // 沒有登入會員拿不到token，也能看到商品資訊
  if (res.locals.user === null) {
    return;
    exit();
  } else {
    const sql =
      "SELECT product.sid FROM product LEFT JOIN favorite ON product.sid = favorite.favoriteId WHERE 1=1 AND favorite.memId = ?";
    const [r1] = await db.query(sql, [res.locals.user.sid]);
    const r2 = [];
    for (let i = 0; i < r1.length; i++) {
      r2.push(r1[i].sid);
    }
    // console.log("sql==", sql);
    res.json(r2);
  }
});

// ---------------------------------------------------------------------------------------

// 拿到該會員的收藏商品清單
router.get("/iconFavorites", async (req, res) => {
  const sql = "SELECT * FROM `favorite` WHERE memId = ?";
  const [r1] = await db.query(sql, [res.locals.user.sid]);

  res.json(r1);
});

// ---------------------------------------------------------------------------------------

// 商品細節頁隨機猜你喜歡商品
router.get("/guessULike", async (req, res) => {
  const sql = "SELECT * FROM product ORDER BY RAND() LIMIT 6;";
  const [r1] = await db.query(sql);

  res.json(r1);
});

//  --------------------------------------------------------------------------------------

// 各月份銷售數據
router.get("/priceHistory/:productId", async (req, res) => {
  const sql =
    "SELECT month(order_date) as orderData, order_details.item_id as itemId, sum(order_details.quantity) as quantity FROM orders LEFT JOIN order_details ON orders.sid = order_details.order_id WHERE 1=1 AND order_details.item_type = 'product' AND order_details.item_id = " +
    req.params.productId +
    " GROUP BY month(order_date), order_details.item_id;";

  const [r1] = await db.query(sql);

  res.json(r1);
});

// ---------------------------------------------------------------------------------------

// 拿到該商品的細節資訊
router.get("/:productId", async (req, res) => {
  let sql =
    "SELECT * FROM `product` WHERE 1=1 and sid = " + req.params.productId;
  const [product] = await db.query(sql);

  if (product.length > 0) {
    // console.log(product[0]);
    res.json(product[0]);
  }
});

module.exports = router;
