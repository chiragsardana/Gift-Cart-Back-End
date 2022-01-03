const { Schema, SchemaTypes } = require("../connect");
const mongoose = require("../connect");
const { SCHEMAS } = require("../../utils/config");
const { SchemaType } = require("mongoose");
const orderSchema = new Schema(
  {
    orderId: { type: SchemaTypes.String, required: true, unique: true },
    userId: { type: SchemaTypes.String, required: true},
    productList: { type: SchemaTypes.Array, required: true},
    paymentMethod: { type: SchemaTypes.String,required: true},
    paymentTransactionId: { type: SchemaTypes.String, unique: true},
    address: { type: SchemaTypes.String, required: true}
  },
  { timestamps: true }
);
const orderModel = mongoose.model(SCHEMAS.ORDERS, orderSchema);
module.exports = orderModel;
