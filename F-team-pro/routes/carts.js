const express = require("express");
const { exit } = require("process");
const { NOW } = require("sequelize");
const db = require("../modules/connect_db");
const router = express.Router();
const upload = require("../modules/upload-images");
const jwt = require("jsonwebtoken");

// const fakeMember = 1493;
// 定義 inArray function
function inArray(item, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == item) return true;
    }
    return false;
}
// C need : item_type item_id quantity
// 欄位格式 : {sid: ,type: ,quantity: ,memID:  ,}
// type : 發送格式 字串  'product' or 'custom' or 'lesson'
router.post("/", upload.none(), async (req, res) => {
    let output = {
        success: false,
        postData: req.body,
        code: 0,
        error: "",
    };

    const sql = "SELECT item_id FROM carts WHERE member_id=? AND item_type=?";
    const [data] = await db.query(sql, [req.body.memID, req.body.type]);
    const arr = data.map((obj) => obj.item_id);
    if (inArray(req.body.sid, arr)) {
        output.code = 410;
        output.error = "商品已存在購物車";
        res.json(output);
    } else {
        let r;
        if (req.body.type === "product") {
            const sql = "SELECT * FROM product WHERE sid=?";
            const [[data]] = await db.query(sql, [req.body.sid]);
            //   console.log(data);
            r = data;
        } else if (req.body.type === "custom") {
            const sql = "SELECT * FROM custom WHERE sid=?";
            const [[data]] = await db.query(sql, [req.body.sid]);
            console.log(data);
            r = data;
        } else if (req.body.type === "lesson") {
            const sql = "SELECT * FROM lesson WHERE sid=?";
            const [[data]] = await db.query(sql, [req.body.sid]);
            console.log(data);
            r = data;
        }
        if (r.quota !== "undefined") {
            if (r.quota - +req.body.quantity < 0) {
                output.code = 420;
                output.error = "課程報名人數已達上限";
                res.json(output);
            } else {
                const sql2 =
                    "INSERT INTO `carts`(`item_id`, `item_type`, `quantity`, `item_price`, `member_id`) VALUES (?,?,?,?,?)";
                await db.execute(sql2, [
                    req.body.sid,
                    req.body.type,
                    req.body.quantity,
                    req.body.quantity * r.price,
                    req.body.memID,
                ]);
                output.success = true;
                output.code = 200;
                output.error = "商品新增成功";
                res.json(output);
            }
        } else {
            const sql2 =
                "INSERT INTO `carts`(`item_id`, `item_type`, `quantity`, `item_price`, `member_id`) VALUES (?,?,?,?,?)";
            await db.execute(sql2, [
                req.body.sid,
                req.body.type,
                req.body.quantity,
                req.body.quantity * r.price,
                req.body.memID,
            ]);
            output.success = true;
            output.code = 200;
            output.error = "商品新增成功";
            res.json(output);
        }
    }
});

// R need : member_id item_type
router.get("/", upload.none(), async (req, res) => {
    let output = {
        success: false,
        postData: req.query,
        code: 0,
        error: "",
    };
    let data;
    if (req.query.type === "product") {
        const sql =
            "SELECT carts.*, product.name, product.img FROM `carts` JOIN product ON product.sid = carts.item_id WHERE item_type=? AND carts.member_id=? ORDER BY created_at;";
        const [r] = await db.query(sql, [req.query.type, req.query.memID]);
        data = r;
        output.success = true;
        output.code = 205;
    } else if (req.query.type === "custom") {
        const sql =
            "SELECT carts.*, custom.custom_product_name, custom.back_img FROM `carts` JOIN custom ON custom.sid = carts.item_id WHERE item_type=? AND carts.member_id=? ORDER BY created_at;";
        const [r] = await db.query(sql, [req.query.type, req.query.memID]);
        data = r;
        output.success = true;
        output.code = 205;
    } else if (req.query.type === "lesson") {
        const sql =
            "SELECT carts.*, lesson.name,lesson.duringtime_begin,lesson.duringtime_end, lesson.location FROM `carts` JOIN lesson ON lesson.sid = carts.item_id WHERE item_type=? AND carts.member_id=? ORDER BY created_at";
        const [r] = await db.query(sql, [req.query.type, req.query.memID]);
        data = r;
        output.success = true;
        output.code = 205;
    }
    res.json({ ...output, result: data });
});

// U  need :  member_id,item_type, item_id, quantity
router.put("/", upload.none(), async (req, res) => {
    let output = {
        success: false,
        postData: req.body,
        code: 0,
        error: "",
        msg: "",
    };
    if (req.body) {
        const sql =
            "UPDATE `carts` SET `quantity`=?,item_price=? WHERE item_id=? AND item_type=? AND member_id=?";
        const [r] = await db.query(sql, [
            req.body.quantity,
            req.body.price,
            req.body.sid,
            req.body.type,
            req.body.memID,
        ]);
        if (r.affectedRows === 1) {
            console.log(r);
            output.success = true;
            output.code = 200;
            output.msg = "修改成功";
        }
    }
    res.json(output);
});

// D  need : item_type item_id
router.delete("/", upload.none(), async (req, res) => {
    let output = {
        success: false,
        postData: req.query,
        code: 0,
        error: "",
        msg: "",
    };
    if (req.query) {
        const sql =
            "DELETE FROM carts WHERE item_id=? AND item_type=? AND member_id=?";
        const [r] = await db.query(sql, [
            req.query.sid,
            req.query.type,
            req.query.memID,
        ]);
        console.log(r);
        output.success = true;
        output.code = 200;
        output.msg = "刪除成功";
    }
    res.json(output);
});

// 登入就計算購物車數量
router.get("/getTotal", upload.none(), async (req, res) => {
    if (req.query.memID) {
        let output = {
            productResult: [],
            customResult: [],
            lessonResult: [],
        };
        const sql =
            "SELECT * FROM carts WHERE member_id = ? AND item_type = 'product'";
        const [r1] = await db.query(sql, [req.query.memID]);
        const sql2 =
            "SELECT * FROM carts WHERE member_id = ? AND item_type = 'custom'";
        const [r2] = await db.query(sql2, [req.query.memID]);
        const sql3 =
            "SELECT * FROM carts WHERE member_id = ? AND item_type = 'lesson'";
        const [r3] = await db.query(sql3, [req.query.memID]);
        output.productResult = r1;
        output.customResult = r2;
        output.lessonResult = r3;
        res.json(output);
    }
});

module.exports = router;
