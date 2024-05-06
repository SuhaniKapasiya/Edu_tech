const express = require("express");
const router = express.Router();

const { contactUs } = require("../controllers/ContactUs");

router.put("/contact", contactUs);

module.exports = router;
