const express = require("express");
const router = express.Router();
const { addProductToCart, getCart, deleteProductFromCart, deleteAllProductFromCart, updateQtyInProduct } = require("../../controllers/cart");
const { ADDITEMINCART, GETCART, DELETEITEMINCART, DELETEALLITEMFROMCART, UPDATEQTYINPRODUCT } = require("../../utils/config").ROUTES.CART;
router.put(ADDITEMINCART, addProductToCart);
router.get(GETCART, getCart);
router.delete(DELETEITEMINCART, deleteProductFromCart);
router.delete(DELETEALLITEMFROMCART, deleteAllProductFromCart);
router.put(UPDATEQTYINPRODUCT, updateQtyInProduct);
module.exports = router;
