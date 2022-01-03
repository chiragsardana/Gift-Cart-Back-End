const { Schema, SchemaTypes } = require("../connect");
const mongoose = require("../connect");
const { SCHEMAS } = require("../../utils/config");
const { SchemaType } = require("mongoose");
const productSchema = new Schema(
  {
    productId: { type: SchemaTypes.String, required: true, unique: true },
    productName: { type: SchemaTypes.String, required: true, unique: true },
    productImage: { type: SchemaTypes.Array, required: true},
    noOfReviews: { type: SchemaTypes.Number, required: true},
    noOfStars: { type: SchemaTypes.Number, required: false},
    mrp: { type: SchemaTypes.Number, required: true},
    noOfDeliveryDays: { type: SchemaTypes.Number, required: true},
    qty: { type: SchemaTypes.Number, required: true, min: 1},
    keyFeatures: { type: SchemaTypes.Array, required: true},
    productCategory: { type: SchemaTypes.String, required: true},
    productSubCategory: { type: SchemaTypes.String, required: true},
  },
  { timestamps: true }
);
const ProductModel = mongoose.model(SCHEMAS.PRODUCTS, productSchema);
module.exports = ProductModel;
