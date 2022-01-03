const OrderModel = require("../models/order");
module.exports = {
    addOrder(orderObject) {
        let promise = OrderModel.create(orderObject);
        return promise;
    },
    getAllOrder(userId){
        let promise = OrderModel.find({userId: userId});
        return promise;
    },
    getOrder(orderId){
        let promise = OrderModel.findOne({orderId: orderId});
        return promise;
    },
    async getAllOrderAdmin(){
        let promise = await OrderModel.find({});
        return promise;
    }
};
