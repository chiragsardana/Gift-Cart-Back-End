const express = require("express");
const router = express.Router();
const { addpayment } = require("../../controllers/payment");
const { PAY } = require("../../utils/config").ROUTES.PAYMENTS;
router.post(PAY, addpayment);
module.exports = router;
