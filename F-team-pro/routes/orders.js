const express = require('express');
const { exit } = require('process');
const db = require('../modules/connect_db');
const router = express.Router();
const upload = require('../modules/upload-images');
const Joi = require('joi');
const { text } = require('stream/consumers');
const nodemailer = require('nodemailer');
const axios = require('axios');
// 判斷卡別 function 
function cardscheme(number) {
    number = ('' + number).replace(/\D/g, '');
    console.log(number);
    if (/^(5610|560221|560222|560223|560224|560225)/.test(number)) {
        return 'Australian Bank Card';
    } else if (/^(2014|2149)/.test(number)) {
        return 'Diner\'s Club';
    } else if (/^36/.test(number)) {
        return 'Diner\'s Club International';
    } else if (/^35(2[89]|[3-8][0-9])/.test(number)) {
        return 'Japanese Credit Bureau';
    } else if (/^(5018|5020|5038|6304|6759|676[1-3])/.test(number)) {
        return 'Maestro';
    } else if (/^(6304|670[69]|6771)/.test(number)) {
        return 'laser';
    } else if (/^(6334|6767)/.test(number)) {
        return 'Solo (Paymentech)';
    } else if (/^5[1-5]/.test(number)) {
        return 'MasterCard';
    } else if (/^(6011|622|64|65)/.test(number)) {
        return 'Discover';
    } else if (/^3[47]/.test(number)) {
        return 'American Express';
    } else if (/^(30[0-5]|36|38|54|55|2014|2149)/.test(number)) {
        return 'Diner\'s Club / Carte Blanche';
    } else if (/^(4026|417500|4508|4844|491(3|7))/.test(number)) {
        return 'Visa Electron';
    } else if (/^(4)/.test(number)) {
        return 'Visa';
    }

    return '卡號格式不符';
};
// checkout to orders
// need member_id carts's sid
router.post('/', upload.none(), async (req, res) => {
    let output = {
        success: false,
        postData: req.body,
        code: 0,
        error: '',
        msg: '',
        orderNumber: '',
    };
    //後端檢查用
    const schema = Joi.object({
        memID: Joi.any(),
        recipient: Joi.string().min(2).required().label('姓名最少兩個字'),
        mobile: Joi.string().min(10).max(10).required().label('行動裝置格式不符'),
        email: Joi.string().email().required().label('E-mail格式不符'),
        address: Joi.string().min(8).required(),
        shipping: Joi.any(),
        pay_method: Joi.any()
    });
    const test = schema.validate(req.body, { abortEarly: false });

    if (test.error) {
        // 先處理好判斷錯誤的data 再回傳到前端
        let errorMsgArr = test.error.details.map((v) => v.context)
        let nameMsg = errorMsgArr.filter((v) => v.key === 'recipient').length !== 0 ? errorMsgArr.filter((v) => v.key === 'recipient')[0] : '';
        let mobileMsg = errorMsgArr.filter((v) => v.key === 'mobile').length !== 0 ? errorMsgArr.filter((v) => v.key === 'mobile')[0] : '';
        let emailMsg = errorMsgArr.filter((v) => v.key === 'email').length !== 0 ? errorMsgArr.filter((v) => v.key === 'email')[0] : '';
        let addressMsg = errorMsgArr.filter((v) => v.key === 'address').length !== 0 ? errorMsgArr.filter((v) => v.key === 'address')[0] : '';
        output.code = 401;
        output.error = '您有欄位資料格式不符';
        output.msg = { nameMsg: nameMsg, mobileMsg: mobileMsg, emailMsg: emailMsg, addressMsg: addressMsg }
        return res.json(output);
    }
    // 取得此會員購物車內的商品
    const sql = `SELECT * FROM carts WHERE member_id = ${req.body.memID}`;
    const [r] = await db.query(sql);
    console.log('r: ', r);

    // 計算訂單總額
    let total = 0;
    for (let i of r) {
        total += i.item_price
    }
    if (total === 0) {
        output.code = 420;
        output.error = '訂單金額不得為零'
        res.json(output);
    }
    // 寫入訂單
    const sql1 = "INSERT INTO `orders`(`member_sid`, `recipient`,`email`, `address`, `shipping_method`,`pay_method`, `total`) VALUES (?,?,?,?,?,?,?)"
    const [r1] = await db.query(sql1, [req.body.memID, req.body.recipient, req.body.email, req.body.address, req.body.shipping, req.body.pay_method, total]);
    console.log(r1);
    // if 訂單新增成功 1.寫入訂單明細 2.刪除已結帳完畢的商品
    if (r1.affectedRows === 1) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: '26fteam@gmail.com',
                pass: 'yunmyhyrcyxdjloq',
            },
        });
        // 發送mail設定
        transporter.sendMail({
            from: '26fteam@gmail.com',
            to: req.body.email,
            subject: 'Street Born, 恭喜您訂購成功',
            html: `<h2>您的訂單編號為 : ${r1.insertId}</h2>
            <p>商品之實際配貨日期、退換貨日期，依我們向您另行通知之內容為準。 因商品屬性關係，將有專人與您約定送貨時間(可約定出貨日30天內日期)。※若為預購商品，以下單日網頁公告之配送日期，於一個工作天內（不含例假日）與您約定送貨時間。</p>`,
        }).then(info => {
            console.log({ info });
        }).catch(console.error);

        for (let i of r) {
            // 課程人數 -1
            if (i.item_type === 'lesson') {
                let [[lessonData]] = await db.query(`SELECT quota FROM lesson WHERE sid = ${i.item_id}`)
                db.query(`UPDATE lesson SET quota=${lessonData.quota - 1} WHERE sid =${i.item_id}`)
            }
            const sql2 = "INSERT INTO `order_details`(`order_id`, `member_id`, `item_id`, `item_type`,`quantity`, `price`) VALUES (?,?,?,?,?,?)"
            const [r2] = await db.query(sql2, [
                r1.insertId,
                req.body.memID,
                i.item_id,
                i.item_type,
                i.quantity,
                i.item_price
            ])
        }
        const sql3 = `DELETE FROM carts WHERE  member_id = ${req.body.memID}`;
        const [r3] = await db.query(sql3)
        output.success = 'success';
        output.code = 210;
        output.msg = '訂單新增成功'
        output.orderNumber = r1.insertId;
    }
    res.json(output);
})
// C : 如果選擇刷卡 介接到 TapPay 後端
// TapPay 測試卡號
// card number 4242424242424242
// month 01
// year 23
// ccv 123
// 判斷是哪種卡別的路由
router.get('/card-type', upload.none(), async (req, res) => {
    let r = cardscheme(req.query.cardNumber);
    res.json(r);
})
//介接TapPay路由
router.post('/pay-credit', upload.none(), async (req, res) => {
    const post_data = {
        "prime": 'test_3a2fb2b7e892b914a03c95dd4dd5dc7970c908df67a49527c0a648b2bc9',
        "partner_key": "partner_6ID1DoDlaPrfHw6HBZsULfTYtDmWs0q0ZZGKMBpp4YICWBxgK97eK3RM",
        "merchant_id": "GlobalTesting_CTBC",
        "amount": 1,
        "currency": "TWD",
        "details": "An apple and a pen.",
        "cardholder": {
            "phone_number": "+886923456789",
            "name": "Gary",
            "email": "example@gmail.com"
        },
        "remember": false
    }

    axios.post('https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime', post_data, {
        headers: {
            'x-api-key': 'partner_6ID1DoDlaPrfHw6HBZsULfTYtDmWs0q0ZZGKMBpp4YICWBxgK97eK3RM'
        }
    }).then((response) => {
        console.log(response.data);
        return res.json({
            result: response.data
        })
    })
})

// R : 讀取此會員 所有訂單 新到舊
router.get('/', upload.none(), async (req, res) => {
    let output = {
        success: false,
        paramsData: req.query,
        code: 0,
        error: '',
        msg: '',
    };
    if (req.query) {
        const sql = "SELECT * FROM orders WHERE member_sid = ? ORDER BY order_date DESC"
        const [r] = await db.query(sql, [req.query.memID]);
        if (r.length !== 0) {
            output.success = true;
            output.code = 200;
            output.msg = '讀取成功';
            output.result = r;
            res.json(output)
        } else {
            output.success = false;
            output.code = 400;
            output.msg = '沒有購買紀錄';
            res.json(output)
        }
    }
})
// R : 搜尋訂單
router.get('/search', upload.none(), async (req, res) => {
    let output = {
        success: false,
        paramsData: req.query,
        code: 0,
        error: '',
        msg: '',
    };
    if (req.query) {
        const sql = "SELECT * FROM orders WHERE member_sid = ? AND sid LIKE '%?%' ORDER BY order_date DESC"
        const [r] = await db.query(sql, [req.query.memID, +req.query.search]);
        if (r.length !== 0) {
            output.success = true;
            output.code = 200;
            output.msg = '讀取成功';
            output.result = r;
            res.json(output)
        } else {
            output.success = false;
            output.code = 400;
            output.msg = '沒有購買紀錄';
            res.json(output)
        }
    }
})
// 查看此訂單明細
router.get('/detail', upload.none(), async (req, res) => {
    let output = {
        success: false,
        paramsData: req.query,
        code: 0,
        error: '',
        msg: '',
    };
    if (req.query) {
        const sql = 'SELECT * FROM order_details WHERE order_id=?';
        const [r] = await db.query(sql, [req.query.orderID]);
        if (r.length !== 0) {
            res.json(r);
        } else {
            res.send('沒有資料')
        }
    }
})
module.exports = router;