const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    orderStatus: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      required: true,
    },
    createOrderId: {
      type: String,
      required: true,
    },
    razorpay: {
      orderId: { type: String },
      paymentId: { type: String },
      signature: { type: String },
    },
    userName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
    },
    venueCode: {
      type: String,
      required: true,
    },
    packageName: {
      type: String,
      required: true,
      enum: [
        "imfl",
        "redLabel",
        "blackLabel",
        "foodPackage",
        "beerPackage",
        "singleMalt",
      ],
    },
    date: {
      type: Date,
      default: new Date().now,
    },
    time: {
      from: { type: String, required: true },
      to: { type: String, required: true },
    },
    minGuests: {
      type: Number,
      required: true,
    },
    genderRatio: {
      male: { type: Number, required: true },
      female: { type: Number, required: true },
    },
    pricePerPerson: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    coupanCode: {
      type: String,
    },
    notesForVenue: {
      type: String,
    },
    finalAmount: {
      type: Number,
      required: true,
    },
    payableAmount: {
      type: Number,
      required: true,
    },
    pendingAmount: {
      type: Number,
      required: true,
    },
    discountPerPerson: {
      type: Number,
      required: true,
    },
    netDiscount: {
      type: Number,
      required: true,
    },
    menuItems: [
      {
        itemType: {
          type: String,
          required: true,
          enum: [
            "starterVeg",
            "starterNonVeg",
            "mainVeg",
            "mainNonVeg",
            "breads",
            "desserts",
            "rice",
          ],
        },
        items: {
          type: [String],
        },
      },
    ],
    paymentMode: {
      type: String,
    },
    companyName: {
      type: String,
    },
    paymentWith: {
      type: String,
    },
    paymentNote: {
      type: String,
    },
    partyBy: {
      type: String,
    },
    vendorName: {
      type: String,
    },
    finalCount: {
      type: String,
    },
    packageTotalBasedOnFinalCount: {
      type: String,
    },
    amountAfterAdvanceDeduction: {
      type: String,
    },
    totalCommission: {
      type: String,
    },
    vendorCommission: {
      type: String,
    },
    eveoutCommission: {
      type: String,
    },
    recoveredAmount: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
