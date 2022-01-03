const { SUCCESS, SERVER_ERROR, NOT_FOUND } =
  require("../utils/config").STATUS_CODES;
const messageBundle = require("../locales/en");
const userOperations = require("../db/services/user_crud");
const jwt = require("../utils/token");
const userController = {
  show(request, response) {
    response.send("U r on Show Section");
  },
  async login(request, response) {
    const user = request.body;
    try {
      const doc = await userOperations.login(user);
      if (doc) {
        // Generate a Token
        let token = jwt.generateToken(user.email);
        response
          .status(SUCCESS)
          .json({
            message: messageBundle["login.welcome"],
            name: doc.name,
            token: token,
            userType: doc.userType,
          });
      } else {
        response
          .status(NOT_FOUND)
          .json({ message: messageBundle["login.invaliduser"] });
      }
      // console.log("JSON is ", json);
    } catch (err) {
      console.log(err);
    }
    // response.send("U r on Login Section " + JSON.stringify(json));
  },
  register(request, response) {
    // response.send("U r on Register Section");
    let userObject = {
      emailid: (request.body.email).toLowerCase(),
      password: request.body.pwd.toLowerCase(),
      name: request.body.name.toLowerCase(),
    };
    const promise = userOperations.register(userObject);
    promise
      .then((doc) => {
        response
          .status(SUCCESS)
          .json({ message: messageBundle["register.welcome"], doc: doc });
      })
      .catch((err) => {
        response
          .status(SERVER_ERROR)
          .json({ message: messageBundle["register.fail"] });
      });
  },
  logout(request, response) {
    let token = request.get('Authorization');
    console.log(token);
    // response.('token',' ', {maxAge: 1})
    console.log(jwt.getTokenDetails(token));
    jwt.destroyToken(token);
    response
          .status(SERVER_ERROR)
          .json({ message: "Logout" });
  },
  getUserDetails(request, response){
    let token = request.get('Authorization');
    if(token == undefined){
      response
          .status(SERVER_ERROR) 
          .json({ message: messageBundle["auth.fail"]+" 1" });
    }else if(!jwt.verifyToken(token)){
      response
          .status(SERVER_ERROR) 
          .json({ message: messageBundle["auth.fail"]+" 2" });
    }else{
      // Here user Id takes from body but on reality it taken using token
      var userId = jwt.getTokenDetails(token);
      userId = userId.toLowerCase();
      console.log(userId);
      const promise = userOperations.getUserDetails(userId);
      promise
      .then((doc) => {
        response
          .status(SUCCESS)
          .json({ message: messageBundle["login.welcome"], doc: doc });
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
  async getParticularUserDetails(request, response){
    let emailId = request.params.userId.toLowerCase();
    let token = request.get('Authorization');
    if(token == undefined){
      response
          .status(SERVER_ERROR) 
          .json({ message: messageBundle["auth.fail"]+" 1" });
    }else if(!jwt.verifyToken(token)){
      response
          .status(SERVER_ERROR) 
          .json({ message: messageBundle["auth.fail"]+" 2" });
    }else{
      // Here user Id takes from body but on reality it taken using token
      var userId = jwt.getTokenDetails(token);
      userId = userId.toLowerCase();
      console.log(userId+" and "+emailId);

      let adminDetail = await userOperations.getUserType(userId);
      console.log("Usr Type: "+adminDetail.userType);


      if(adminDetail.userType == 'Admin'){
        const promise = userOperations.getUserDetails(emailId);
        promise
        .then((doc) => {
          if(doc != null){
            response
            .status(SUCCESS)
            .json({ message: messageBundle["login.welcome"], doc: doc });
          }else{
            response
            .status(SUCCESS)
            .json({ message: messageBundle["user.fail"] });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }else{
        response
            .status(SUCCESS)
            .json({ message: messageBundle["auth.fail"] });
      }



    }
  },
};

module.exports = userController;  

