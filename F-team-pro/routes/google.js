const express = require("express");
const db = require("../modules/connect_db");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
// const randtoken = require("rand-token");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");

const keys = require(__dirname +
    "/../auth/client_secret_937721335934-f1t4rg712vfvqgj1od82kf3r2cddjur9.apps.googleusercontent.com.json");

const oAuth2c = new OAuth2Client(
    keys.web.client_id,
    keys.web.client_secret,
    keys.web.redirect_uris[0]
);

//extended： 使用 qs 進行解析，若為 false，則採用 querystring 進行解析，預設為 true
router.use(bodyParser.urlencoded({ extended: false }));


router.get("/googleLogin", async (req, res, next) => {
    const googleId = req.query.id;

    if (!googleId) {
        res.json({
            success: false,
            code: "400",
            message: "沒有該會員",
        });
    } else {
        try {
            const sql = "SELECT * FROM `member` WHERE `google_id`=?";

            const [result] = await db.query(sql, [googleId]);

            console.log("查訊結果:", result);

            if (!result.length) {
                res.json({
                    success: false,
                    code: "401",
                    message: "查無使用者資料",
                });
            } else {
                const row = result[0];

                const output = {
                    grade: "low",
                    token: '',
                    info: null,
                    code: 0,
                    error: "",
                  };

                const { sid } = row;

                  output.token = jwt.sign(
                    {
                      sid,
                    },
                    process.env.JWT_KEY
                  );

                  output.info = {
                    grade: output.grade,
                  };

                res.json(output);
            }
        } catch (err) {
            res.json({
                code: "500",
                error: err,
            });
        }
    }
});

router.get("/api/v1/auth/google", async (req, res, next) => {
    const authorizeUrl = oAuth2c.generateAuthUrl({
        // access_type: "offline",
        // 欲取得 email, 要兩個 scopes
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ],
    });

    return res.json(authorizeUrl);
});

router.get("/api/v1/auth/google/sign", async (req, res, next) => {
    const qs = req.query;

    let myData = {};

    if (qs.code) {
        // 內容參考 /references/from-code-to-tokens.json
        const r = await oAuth2c.getToken(qs.code);
        // console.log(JSON.stringify(r));
        oAuth2c.setCredentials(r.tokens);

        // 連線回應內容參考 /references/tokeninfo-results-oauth2.googleapis.com.json
        // console.log(
        //     `https://oauth2.googleapis.com/tokeninfo?id_token=${r.tokens.id_token}`
        // );

        const url =
            "https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses,photos";

        const response = await oAuth2c.request({ url });
        // response 內容參考 /references/people-api-response.json
        myData = response.data;

        console.log(myData);

        const userName = myData.names[0].displayName; //名
        const googleId = myData.names[0].metadata.source.id;
        const avatar = myData.photos[0].url;
        const emailAddr = myData.emailAddresses[0].value;

        const checkSql =
            "SELECT * FROM `member` WHERE `google_id` =? AND `mem_email` = ?";

        const [checkResult] = await db.query(checkSql, [googleId, emailAddr]);

        if (checkResult.length !== 0) {
            console.log("此用戶已經存在");

            // const row = checkResult[0];

            // const { sid } = row;

            // const token = jwt.sign(
            //     {
            //       sid,
            //     },
            //     process.env.JWT_KEY
            //   );

            // const grade = 'low';

            res.redirect(
                `http://localhost:3001/member/?id=${googleId}`
            );
        } else {
            const sql =
            "INSERT INTO `member`(`mem_name`,`mem_nickname`,`mem_level`,`mem_account`,`mem_password`, `mem_email`, `mem_mobile`, `mem_birthday`, `mem_address`, `mem_avatar`, `mem_bollen`, `hash`, `verify`, `google_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)";

            const [result] = await db.query(sql, [
                userName,
                '',
                '平民',
                '',
                '',
                emailAddr,
                '',
                null,
                '',
                avatar,
                '',
                'on',
                googleId
            ]);

            console.log(result);

            // const [rs] = await db.query("SELECT * FROM member WHERE google_id=?", [
            //     googleId,
            //   ]);

            // const row = rs[0];

            // const { sid } = row;

            // const token = jwt.sign(
            //     {
            //       sid,
            //     },
            //     process.env.JWT_KEY
            //   );

            // const grade = 'low';

            res.redirect(
                `http://localhost:3001/member/?id=${googleId}`
            );
        }
    }
});

// router 一定要回傳module
module.exports = router;