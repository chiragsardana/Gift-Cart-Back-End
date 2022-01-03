const PaymentModel = require("../models/payment");
module.exports = {
    addpayment(paymentObject) {
        let promise = PaymentModel.create(paymentObject);
        return promise;
    },
};
