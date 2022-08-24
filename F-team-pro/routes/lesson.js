const express = require("express");
const router = express.Router();
const db = require("../modules/connect_db");
const upload = require("../modules/upload-images");
const moment = require("moment-timezone");

// -----------老師---------------
router.get("/teacher_category", async (req, res) => {
    const sql = `SELECT * FROM teacher_category WHERE location = '${req.query.location}'`;
    const [r] = await db.query(sql);
    res.json(r);
});

// ------------------課程------------
router.get("/", upload.none(), async (req, res) => {
    const sql = `SELECT lesson.*,dance_category.type,teacher_category.teacher_name,teacher_category.teacher_head,teacher_category.teacher_info FROM lesson JOIN teacher_category on teacher_category.sid = lesson.teacher_id JOIN dance_category ON dance_category.sid = lesson.dance_id WHERE lesson.location = '${req.query.location}'`;

    console.log("sql:", sql);

    const [r] = await db.query(sql);
    // res.json(r);

    const begin = r.map((v, i) =>
        moment(v.duringtime_begin).format("YYYY-MM-DD")
    );
    const end = r.map((v, i) => moment(v.duringtime_end).format("YYYY-MM-DD"));
    r.map((v, i) => (v.duringtime_begin = begin[i]));
    r.map((v, i) => (v.duringtime_end = end[i]));
    // console.log(end);
    res.json(r);
});

module.exports = router;
