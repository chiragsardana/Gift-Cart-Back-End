const UserModel = require("../models/user");
const encryption = require("../../utils/encrypt");
module.exports = {
  register(userObject) {
    userObject.password = encryption.generateHash(userObject.password);
    let promise = UserModel.create(userObject);
    return promise;
  },
  async login({ email, pwd }) {
    email = email.toLowerCase();
    const doc = await UserModel.findOne({ emailid: email });
    if (doc) {
      if (encryption.compareHash(doc.password, pwd)) {
        return doc;
      } else {
        return null;
      }
    }
    return null;
  },
  async getUserType(emailId){
    let promise = await UserModel.findOne({ emailid: emailId });
    return promise;
  },
  getUserDetails(emailId){
    let promise = UserModel.findOne({ emailid: emailId });
    return promise;
  }
};
