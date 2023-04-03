const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).send(`서버테스트 정상입니다.`)
});

router.get("/", (req, res) => {
  res.status(200).send(`안녕하세요. API 메인입니다.`)
});

module.exports = router;
