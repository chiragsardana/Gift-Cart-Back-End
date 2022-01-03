const { SUCCESS, SERVER_ERROR, NOT_FOUND } = require("../utils/config").STATUS_CODES;
const messageBundle = require("../locales/en");
const orderOperations = require("../db/services/order_crud");
const userOperations = require("../db/services/user_crud");
const jwt = require("../utils/token");
const orderController = {

  addOrder(request, response) {
    let token = request.get('Authorization');
    let orderId = Math.round((new Date()).getTime() / 1000)+""+ Math.random()*10000000000000000;
    let orderObject = {
        // Unix Time Stamp is always Unique
        orderId: orderId.toLowerCase(),

        // Here user Id takes from body but on reality it taken using token
        userId: jwt.getTokenDetails(token),
        productList: request.body.productList,
        paymentMethod: request.body.paymentMethod.toLowerCase(),
        paymentTransactionId: request.body.paymentTransactionId.toLowerCase(),
        address: request.body.address.toLowerCase(),
    };

    console.log(orderObject.orderId+" "+orderObject.userId+" "+orderObject.productList);
    const promise = orderOperations.addOrder(orderObject);
    promise
      .then((doc) => {
        response
          .status(SUCCESS)
          .json({ message: messageBundle["order.register"], doc: doc });
      })
      .catch((err) => {
        response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["order.fail"] });
      });
  },
  getAllOrder(request, response) {
    let token = request.get('Authorization');
    // Here user Id takes from body but on reality it taken using token
    var userId = jwt.getTokenDetails(token);

    console.log(userId);
    const promise = orderOperations.getAllOrder(userId);
    promise
      .then((doc) => {
          if(doc.length == 0){
            response
             .status(SERVER_ERROR)
             .json({ message: messageBundle["order.no"] });
          }else{
            response
            .status(SUCCESS)
            .json({ message: messageBundle["order.all"], doc: doc });
          }
        
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getOrder(request, response){
      var orderId = request.params.orderId.toLowerCase();
    //   console.log(orderId);
      const promise = orderOperations.getOrder(orderId);
        promise
        .then((doc) => {
          if(doc == null || doc.length == 0){
            response
             .status(SERVER_ERROR)
             .json({ message: messageBundle["order.no"] });
          }else{
            response
            .status(SUCCESS)
            .json({ message: messageBundle["order.particular"], doc: doc });
          }
        
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async getAllOrderAdmin(request, response){
    let token = request.get('Authorization');
    // Here user Id takes from body but on reality it taken using token
    var userId = jwt.getTokenDetails(token);

    let doc = await userOperations.getUserType(userId.toLowerCase());
          
    let userType = doc.userType;

    if(userType == 'Admin'){
      const promise = orderOperations.getAllOrderAdmin();
          promise
            .then((doc) => {
              response
                .status(SUCCESS)
                .json({ message: messageBundle["order.all"], doc: doc });
            })
            .catch((err) => {
              response
                .status(SERVER_ERROR)
                .json({ message: messageBundle["order.no"] });
            });
    }else{
      response
          .status(SERVER_ERROR)
            .json({ message: messageBundle["auth.fail"] });
    }

  }
};

module.exports = orderController;

