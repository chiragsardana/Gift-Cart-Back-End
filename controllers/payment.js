const { SUCCESS, SERVER_ERROR, NOT_FOUND } = require("../utils/config").STATUS_CODES;
const messageBundle = require("../locales/en");
const paymentOperations = require("../db/services/payment_crud");
const jwt = require("../utils/token");

const paymentController = {

  addpayment(request, response) {
    let token = request.get('Authorization');
    let paymentObject = {
        // Here user Id takes from body but on reality it taken using token
        
        userId: jwt.getTokenDetails(token).toLowerCase(),
        paymentTransactionId: request.body.paymentTransactionId.toLowerCase()
    };

    console.log(paymentObject.paymentTransactionId+" "+paymentObject.userId);
    const promise = paymentOperations.addpayment(paymentObject);
    promise
      .then((doc) => {
        response
          .status(SUCCESS)
          .json({ message: messageBundle["payment.register"], doc: doc });
      })
      .catch((err) => {
        response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["payment.fail"] });
      });
  },
  

  
};

module.exports = paymentController;

