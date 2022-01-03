const CartModel = require("../models/cart");
module.exports = {
    addProductToCart(userId, productId, qty) {
    //    console.log("Sar");
        let promise = CartModel.findOneAndUpdate( {userId: userId}, { $addToSet: { productList: {productId: productId, qty: qty}} }, {upsert: true});
        return promise;
    },
    getCart(userId){
        let promise = CartModel.findOne({userId: userId});
        return promise;
    },
    deleteProductFromCart(userId, productId){
        let promise = CartModel.updateOne({userId: userId,"productList.productId": productId}, {$pull: { productList: {productId: productId }}});
        return promise;
    },
    deleteAllProductFromCart(userId){
        let promise = CartModel.deleteMany({userId: userId});
        return promise;
    },
    updateQtyInProduct(userId, productId, qty){
        let promise = CartModel.updateOne({userId: userId, "productList.productId": productId}, {"productList.$.qty": qty});
        return promise;
    }
};
