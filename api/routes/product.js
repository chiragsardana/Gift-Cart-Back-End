const express = require("express");
const router = express.Router();
const { registerProduct, showProduct, showProducts, deleteProduct, showProductsByCategory, showProductsByCategorySubcategory, searchProducts, updateProduct } = require("../../controllers/product");
const { REGISTERPRODUCT, SHOWPRODUCT, SHOWPRODUCTS, DELETEPRODUCT, SHOWPRODUCTSBYCATEGORY, SHOWPRODUCTSBYCATEGORYSUBCATEGORY, SEARCHPRODUCT, UPDATEPRODUCT } = require("../../utils/config").ROUTES.PRODUCT;

router.post(REGISTERPRODUCT, registerProduct);
router.get(SHOWPRODUCT, showProduct);
router.get(SHOWPRODUCTS, showProducts);
router.delete(DELETEPRODUCT, deleteProduct);
router.get(SHOWPRODUCTSBYCATEGORY, showProductsByCategory);
router.get(SHOWPRODUCTSBYCATEGORYSUBCATEGORY, showProductsByCategorySubcategory);
router.get(SEARCHPRODUCT, searchProducts);
router.put(UPDATEPRODUCT, updateProduct);
module.exports = router;
