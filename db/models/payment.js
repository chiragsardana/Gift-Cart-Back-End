const { Schema, SchemaTypes } = require("../connect");
const mongoose = require("../connect");
const { SCHEMAS } = require("../../utils/config");
const { SchemaType } = require("mongoose");
const paymentSchema = new Schema(
  {
    userId: { type: SchemaTypes.String, required: true },
    paymentTransactionId: { type: SchemaTypes.String, required: true, unique: true}
  },
  { timestamps: true }
);
const PaymentModel = mongoose.model(SCHEMAS.PAYMENTS, paymentSchema);
module.exports = PaymentModel;
