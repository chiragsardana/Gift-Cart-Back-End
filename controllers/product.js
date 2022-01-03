const { SUCCESS, SERVER_ERROR, NOT_FOUND } = require("../utils/config").STATUS_CODES;
const messageBundle = require("../locales/en");
const productOperations = require("../db/services/product_crud");
const userOperations = require("../db/services/user_crud");
const jwt = require("../utils/token");
const productController = {

  async registerProduct(request, response) {


    let token = request.get('Authorization');

    if(token == undefined){
      response
          .status(SERVER_ERROR) 
          .json({ message: messageBundle["auth.fail"] });
    }else if(!jwt.verifyToken(token)){
      response
          .status(SERVER_ERROR) 
          .json({ message: messageBundle["auth.fail"] });
    }else{
          // Here user Id takes from body but on reality it taken using token
          var userId = jwt.getTokenDetails(token);
          
          console.log(userId.toLowerCase());

          let doc = await userOperations.getUserType(userId.toLowerCase());
          
          let userType = doc.userType;
          
          console.log(doc+" and "+userType);

          if(userType == 'Admin'){
            let productObject = {
              productId: request.body.productId.toLowerCase(),
              productName: request.body.productName.toLowerCase(),
              productImage: request.body.productImage,
              noOfReviews: request.body.noOfReviews,
              noOfStars: request.body.noOfStars,
              mrp: request.body.mrp,
              noOfDeliveryDays: request.body.noOfDeliveryDays,
              qty: request.body.qty,
              keyFeatures: request.body.keyFeatures,
              productCategory: request.body.productCategory.toLowerCase(),
              productSubCategory: request.body.productSubCategory.toLowerCase(),
          };
          // console.log(productObject);
          const promise = productOperations.registerProduct(productObject);
          promise
            .then((doc) => {
              response
                .status(SUCCESS)
                .json({ message: messageBundle["product.register"], doc: doc });
            })
            .catch((err) => {
              response
                .status(SERVER_ERROR)
                .json({ message: messageBundle["register.fail"] });
            });
          }else{
            response
                .status(SERVER_ERROR)
                .json({ message: messageBundle["register.fail"] });
          }
    }

    

    // console.log("The User Type is" +userType);

    // response.send("U r on Register Section");
    
  },
  showProduct(request, response){
    const productId = request.params.productId.toLowerCase(); // Path Parameter
    const promise = productOperations.showProduct(productId);
    // const promise = productOperations.showProducts();
    // response.send(new Date() + " ProductId Rec " + productId);
    promise
      .then((doc) => {

        if(doc == null){
            response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["product.fail"] });
        }else{
            response
          .status(SUCCESS)
          .json({ message: messageBundle["product.retrieved"], doc: doc });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  showProducts(request, response){
    const promise = productOperations.showProducts();
    promise
      .then((doc) => {

        if(doc == null){
            response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["product.fail"] });
        }else{
            response
          .status(SUCCESS)
          .json({ message: messageBundle["product.retrieved"], doc: doc });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async deleteProduct(request, response){


    let token = request.get('Authorization');

    if(token == undefined){
      response
          .status(SERVER_ERROR) 
          .json({ message: messageBundle["auth.fail"] });
    }else if(!jwt.verifyToken(token)){
      response
          .status(SERVER_ERROR) 
          .json({ message: messageBundle["auth.fail"] });
    }else{
        // Here user Id takes from body but on reality it taken using token
        var userId = jwt.getTokenDetails(token);
        
        console.log(userId.toLowerCase());

        let doc = await userOperations.getUserType(userId.toLowerCase());
        
        let userType = doc.userType;
        
        console.log(doc+" and "+userType);


        if(userType == 'Admin'){
          const productId = request.params.productId.toLowerCase(); // Path Parameter
          const promise = productOperations.deleteProduct(productId);
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

      
        }else{
        response
              .status(SERVER_ERROR) 
              .json({ message: messageBundle["register.fail"] });
        }
    }

    
  },
  showProductsByCategory(request, response){
    const productCategory = request.params.productCategory.toLowerCase(); // Path Parameter
    const promise = productOperations.showProductsByCategory(productCategory);
    // response.send(new Date() + " ProductId Rec " + productCategory);
    promise
      .then((doc) => {

        if(doc == null || doc.length == 0){
            response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["product.fail"] });
        }else{
            response
          .status(SUCCESS)
          .json({ message: messageBundle["product.retrieved"], doc: doc });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  showProductsByCategorySubcategory(request, response){
    const productCategory = request.params.productCategory.toLowerCase(); // Path Parameter
    const productSubCategory = request.params.productSubCategory.toLowerCase(); // Path Parameter
    const promise = productOperations.showProductsByCategorySubCategory(productCategory, productSubCategory);
    // response.send(new Date() + " ProductId Rec " + productCategory+" and "+productSubCategory);
    promise
      .then((doc) => {

        if(doc == null || doc.length == 0){
            response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["product.fail"] });
        }else{
            response
          .status(SUCCESS)
          .json({ message: messageBundle["product.retrieved"], doc: doc });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  searchProducts(request, response){
    const productDetails = request.params.productDetails.toLowerCase(); // Path Parameter
    const promise = productOperations.searchProducts(productDetails);
    // response.send(new Date() + " ProductId Rec " + productDetails);
    promise
      .then((doc) => {

        if(doc == null || doc.length == 0){
            response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["product.fail"] });
        }else{
            response
          .status(SUCCESS)
          .json({ message: messageBundle["product.retrieved"], doc: doc });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async updateProduct(request, response){

    let token = request.get('Authorization');
    // Here user Id takes from body but on reality it taken using token

    if(token == undefined){
      response
          .status(SERVER_ERROR) 
          .json({ message: messageBundle["auth.fail"] });
    }else if(!jwt.verifyToken(token)){
      response
          .status(SERVER_ERROR) 
          .json({ message: messageBundle["auth.fail"] });
    }else{
          var userId = jwt.getTokenDetails(token);
        
        console.log(userId.toLowerCase());

        let doc = await userOperations.getUserType(userId.toLowerCase());
        
        let userType = doc.userType;
        
        console.log(doc+" and "+userType);

        const productId = request.params.productId.toLowerCase(); // Path Parameter

        if(userType == 'Admin'){
          let productObject = {
            productName: request.body.productName.toLowerCase(),
            productImage: request.body.productImage,
            noOfReviews: request.body.noOfReviews,
            noOfStars: request.body.noOfStars,
            mrp: request.body.mrp,
            noOfDeliveryDays: request.body.noOfDeliveryDays,
            qty: request.body.qty,
            keyFeatures: request.body.keyFeatures,
            productCategory: request.body.productCategory.toLowerCase(),
            productSubCategory: request.body.productSubCategory.toLowerCase(),
        };

        console.log(productObject.productCategory);
        const promise = productOperations.updateProduct(productId, productObject);
        // response.send(new Date() + " ProductId Rec " + productId);
        promise
          .then((doc) => {
            if(doc.matchedCount == 0){
                response
                .status(SERVER_ERROR)
                .json({ message: messageBundle["product.fail"] });
            }else if(doc.modifiedCount == 0){
                response
              .status(SERVER_ERROR)
              .json({ message: messageBundle["product.updatefail"] });
            }else{
                response
              .status(SUCCESS)
              .json({ message: messageBundle["product.updated"], doc: doc });
            }
          })
          .catch((err) => {
            console.log(err);
          });
        }else{
          response
              .status(SERVER_ERROR)
              .json({ message: messageBundle["register.fail"] });
        }
    }


    
  },

  
};

module.exports = productController;

