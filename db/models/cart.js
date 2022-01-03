const { Schema, SchemaTypes } = require("../connect");
const mongoose = require("../connect");
const { SCHEMAS } = require("../../utils/config");
const { SchemaType } = require("mongoose");
const cartSchema = new Schema(
  {
    userId: { type: SchemaTypes.String, required: true, unique: true},
    productList: { type: SchemaTypes.Array, required: false},
  },
  { timestamps: true }
);
const CartModel = mongoose.model(SCHEMAS.CARTS, cartSchema);
module.exports = CartModel;
