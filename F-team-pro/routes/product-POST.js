const { log } = require("console");
const express = require("express");
const db = require("../modules/connect_db");
const router = express.Router();

// 全部商品
router.post("/", async (req, res) => {
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
  let page = +req.body.filter.page || 1;
  let where = " WHERE 1=1 ";
  let orderfield = "sid";
  let sort = "ASC";

  if (page < 1) {
    output.code = 410;
    output.error = "頁碼太小";
    return output;
  }

  const sql01 = `SELECT COUNT(1) totalRows FROM product ${where} `;
  const [[{ totalRows }]] = await db.query(sql01);
  let totalPages = 0;
  if (totalRows) {
    totalPages = Math.ceil(totalRows / output.perPage);
    if (page > totalPages) {
      output.totalPages = totalPages;
      output.code = 420;
      output.error = "頁碼太大";
      return output;
    }
    // 預設 ORDER BY SID，如果要查詢更動 ORDER BY SID
    switch (req.body.filter.orderfield) {
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

    // 預設 WHERE = 1=1，如果查詢更動 WHERE
    switch (req.body.filter.where) {
      case "categoryId":
        where = " WHERE categoryId ";
        break;
      case "brand":
        where = " WHERE brand ";
        break;
      case "name":
        where = " WHERE name ";
        break;
      case "price":
        where = " WHERE price ";
        break;
      default:
        where = " WHERE 1=1 ";
        break;
    }

    let sql02 = `SELECT * FROM product ${where}`;

    // 預設都是null，如果不等於null，我才要執行前端送來的參數，不然都是null執行全部
    if (req.body.filter.categoryId != 0) {
      let categoryId = req.body.filter.categoryId;
      sql02 = sql02 + " and category_id = " + categoryId;
    }

    if (req.body.filter.brand.length > 0) {
      let brand = req.body.filter.brand;
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

    if (req.body.filter.color.length > 0) {
      let color = req.body.filter.color;
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

    if (req.body.filter.price != 0) {
      let price = req.body.filter.price;
      sql02 = sql02 + " and prcie = " + price;
    }

    if (req.body.filter.sort != "") {
      sort = req.body.filter.sort;
    }

    if (req.body.filter.priceRange.length > 0) {
      let priceRange = req.body.filter.priceRange;
      sql02 = sql02 + " BETWEEN " + priceRange[0] + " AND " + priceRange[1];
    }

    if (req.body.filter.searchName != "") {
      let searchName = req.body.filter.searchName;
      sql02 = sql02 + "AND name LIKE" + `'%${searchName}%'`;
    }
    // console.log("req.body.filter==", req.body.filter);

    // console.log("sql02==", sql02);

    let sql04 = ` ORDER BY ${orderfield} ${sort} LIMIT ${
      (page - 1) * output.perPage
    }, ${output.perPage}`;

    let [r2] = await db.query(sql02 + sql04);
    output.rows = r2;

    // console.log("compSQL==", sql02 + sql04);
  }
  output.code = 200;
  output = { ...output, page, totalRows, totalPages };
  res.json(output);
});

router.post("/favorites", async (req, res) => {
  const output = {
    success: "",
    error: "",
  };

  const memId = req.body.memId;

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

router.post("/details", async (req, res) => {
  const output = {
    success: "",
    error: "",
  };
  const sql = "SELECT * FROM `product` WHERE sid = ?";
  const [r1] = await db.query(sql, [req.body.detailsID.sid]);
  console.log("req.body====", req.body.detailsID.sid);
  if (!r1.length) {
    output.error = "沒有這個商品";
    return res.json(output);
  }
  res.json(r1);
});

module.exports = router;
