const express = require("express");
const db = require("../modules/connect_db");
const router = express.Router();
const upload = require("../modules/upload-images");

router.post('/', upload.none(), async (req, res) => {
  if (req.body) {
    const sql = "INSERT INTO `cus_chat`(`room`, `author`, `avatar`, `msg`, `time`) VALUES (?,?,?,?,?)"
    const r = await db.query(sql, [req.body.room, req.body.author, req.body.avatar, req.body.msg, req.body.time])
    res.json(r);
  }
})
router.get('/', upload.none(), async (req, res) => {
  if (req.query) {
    const sql = "SELECT * FROM cus_chat WHERE room = ?"
    const [r] = await db.query(sql, [req.query.sid]);
    res.json(r);
  }
})
router.get('/admin', upload.none(), async (req, res) => {
  if (req.query) {
    const sql = "SELECT * FROM cus_chat"
    const [r] = await db.query(sql, [req.query.sid]);
    res.json(r);
  }
})
module.exports = router;
