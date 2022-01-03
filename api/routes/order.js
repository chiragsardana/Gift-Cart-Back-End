const express = require("express");
const router = express.Router();
const { addOrder, getAllOrder, getOrder, getAllOrderAdmin } = require("../../controllers/order");
const { ADDORDER, GETALLORDERS, GETORDER, GETALLORDERSADMIN } = require("../../utils/config").ROUTES.ORDER;
router.get(ADDORDER, addOrder);
router.get(GETALLORDERS, getAllOrder);
router.get(GETORDER, getOrder);
router.get(GETALLORDERSADMIN, getAllOrderAdmin);
module.exports = router;
