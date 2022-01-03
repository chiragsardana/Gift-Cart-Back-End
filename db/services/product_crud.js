const ProductModel = require("../models/product");
module.exports = {
  registerProduct(productObject) {
    let promise = ProductModel.create(productObject);
    return promise;
  },
  showProduct(productId){
      let promise = ProductModel.findOne({productId: productId})
      return promise;
  },
  showProducts(){
    let promise = ProductModel.find({})
    return promise;
  },
  deleteProduct(productId){
    let promise = ProductModel.deleteOne({productId: productId});
    return promise;
  },
  showProductsByCategory(productCategory){
    let promise = ProductModel.find({productCategory: productCategory});
    return promise;
  },
  showProductsByCategorySubCategory(productCategory, productSubCategory){
    let promise = ProductModel.find({productCategory: productCategory, productSubCategory: productSubCategory});
    return promise;
  },
  searchProducts(productDetails){
    let promise = ProductModel.find({ $text: { $search: productDetails } });
    return promise;
  },
  updateProduct(productId, productObject){
    let promise = ProductModel.updateOne( {productId: productId}, {
        productName: productObject.productName,
        productImage: productObject.productImage,
        noOfReviews: productObject.noOfReviews,
        noOfStars: productObject.noOfStars,
        mrp: productObject.mrp,
        noOfDeliveryDays: productObject.noOfDeliveryDays,
        qty: productObject.qty,
        keyFeatures: productObject.keyFeatures,
        productCategory: productObject.productCategory,
        productSubCategory: productObject.productSubCategory,
    } );
    return promise;
  }
};
