const express = require("express");
const generateSignature = require("../controllers/generate");

const router = express.Router();

router.post("/generate", generateSignature);

module.exports = router;
