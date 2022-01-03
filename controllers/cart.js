const { SUCCESS, SERVER_ERROR, NOT_FOUND } = require("../utils/config").STATUS_CODES;
const messageBundle = require("../locales/en");
const cartOperations = require("../db/services/cart_crud");
const jwt = require("../utils/token");
const cartController = {

    addProductToCart(request, response) {

        let token = request.get('Authorization');
        // Here we use token for user id, initally we are using userid Directly
        userId = jwt.getTokenDetails(token);
        productId =  request.params.productId.toLowerCase();
        qty = request.body.qty;

        const promise1 = cartOperations.getCart(userId);

        var flag = false;
        promise1
        .then((doc) => {
            if(doc != null){
                var list = doc.productList;
                
                console.log("The Product List intially: "+list);
                for(var i = 0;i < list.length;i++){
                    if(productId == list[i].productId){
                        flag = true;
                        break;
                    }
                }
            }
        })
        .catch((err) => {
            console.log(err);
        });



        //Firstly Checks whether the product is present in our list or not

        if(flag == true){
            response
                .status(SERVER_ERROR)
                .json({ message: messageBundle["product.failedtoadd"] });
        }else{
            //Now we have to also checks whether the quantity user want is available or not
            const promise = cartOperations.addProductToCart(userId, productId,qty);
            promise
            .then((doc) => {
                

                if(flag == true){
                    response
                        .status(SERVER_ERROR)
                        .json({ message: messageBundle["product.failedtoadd"] });
                }else{
                    response
                    .status(SUCCESS)
                    .json({ message: messageBundle["product.addedtocart"] });
                }

                
            })
            .catch((err) => {
                console.log(err);
            });
        }

       
            //Here Implement the logic if already exist in the cart of not




        // console.log(userId+" "+productId);

        

        

        

        
  },
  getCart(request, response){
    let token = request.get('Authorization');
    // Here we use token for user id, initally we are using userid Directly
    userId = jwt.getTokenDetails(token);
    console.log(userId);
    const promise = cartOperations.getCart(userId);
    promise
    .then((doc) => {
            if(doc == null){
                response
                .status(SERVER_ERROR)
                .json({ message: messageBundle["cart.noproduct"] });
            }else{
                response
                .status(SERVER_ERROR)
                .json({ doc: doc });
            }
            
        
    })
    .catch((err) => {
        console.log(err);
    });
  },
  deleteProductFromCart(request, response){
    let token = request.get('Authorization');
    // Here we use token for user id, initally we are using userid Directly
    userId = jwt.getTokenDetails(token);
    productId =  request.params.productId.toLowerCase();
    console.log(userId+" and "+productId);


    const promise = cartOperations.deleteProductFromCart(userId, productId);
    // response.send(new Date() + " ProductId Rec " + productId);
    promise
      .then((doc) => {

        if(doc.modifiedCount == 0){
            response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["product.nofound"] });
        }else{
            response
          .status(SUCCESS)
          .json({ message: messageBundle["product.delete"], doc: doc });
        }
      })
      .catch((err) => {
        console.log(err);
      });



  },
  deleteAllProductFromCart(request, response){
    let token = request.get('Authorization');
    // Here we use token for user id, initally we are using userid Directly
    userId = jwt.getTokenDetails(token);

    const promise = cartOperations.deleteAllProductFromCart(userId);
    // response.send(new Date() + " ProductId Rec " + productId);
    promise
      .then((doc) => {

        if(doc.deletedCount == 0){
            response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["product.nofound"] });
        }else{
            response
          .status(SUCCESS)
          .json({ message: messageBundle["product.delete"], doc: doc });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  updateQtyInProduct(request, response){
    let token = request.get('Authorization');
    // Here we use token for user id, initally we are using userid Directly
    userId = jwt.getTokenDetails(token);

    productId = request.params.productId.toLowerCase();
    qty = request.body.qty;

    const promise = cartOperations.updateQtyInProduct(userId, productId, qty);
    // response.send(new Date() + " ProductId Rec " + productId);
    promise
      .then((doc) => {

        if(doc.modifiedCount == 0){
            response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["product.nofound"] });
        }else{
            response
          .status(SUCCESS)
          .json({ message: messageBundle["product.modified"], doc: doc });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  
};

module.exports = cartController;

