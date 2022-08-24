const express = require('express');
const db = require('../modules/connect_db');
const router = express.Router();
const upload = require('../modules/upload-images');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// 管理員登入
router.post('/login', upload.none(), async (req, res) => {
    const output = {
        success: false,
        grade: 'hight',
        token: '',
        info: null,
        code: 0,
        error: '',
    };

    const [rs] = await db.query('SELECT * FROM `admin` WHERE 1');

    if (!rs.length) {
        output.error = '帳密錯誤';
        output.code = 401;
        return res.json(output);
    }

    const row = rs[0];

    if (req.body.password != row.ad_password) {
        output.error = '帳密錯誤';
        output.code = 402;
        return res.json(output);
    }

    const { ad_account, ad_avatar } = row;

    output.success = true;
    output.info = { ad_account, ad_avatar, grade: output.grade };

    // 進行加密讓前端頁面看不出來
    output.token = jwt.sign(
        {
            ad_account,
            ad_avatar,
            grade: output.grade,
        },
        process.env.JWT_KEY
    );

    res.json(output);
});

// 停用會員
router.put('/stop', (req, res) => {
    const output = {
        success: false
    };
    const sql = db.query('UPDATE member SET mem_bollen=0 WHERE sid=?', [
        req.body.sid,
    ]);
    output.success=true
    res.json(output);
});

// 重啟會員
router.put('/reboot', (req, res) => {
    const output = {
        success: false
    };
    const sql = db.query('UPDATE member SET mem_bollen=1 WHERE sid=?', [
        req.body.sid,
    ]);
    output.success=true
    res.json(output);
});

// 刪除會員
router.delete('/', (req, res) => {
    const output = {
        success: false
    };
    const sql = db.query('DELETE FROM member WHERE sid=?', [
        req.query.sid,
    ]);
    output.success=true
    res.json(output);
});

// 會員商品收藏
router.get('/memberfavorite/:memberId', async (req, res) => {
    if(!req.params.memberId){
        return
    }
    const [sql] = await db.query(`SELECT * FROM favorite WHERE memId=${req.params.memberId} ORDER BY favorite.sid DESC`);

    res.json(sql);
});

module.exports = router;
