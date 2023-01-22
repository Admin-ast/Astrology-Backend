const OrderSchema = require("../models/Order");
const Product = require("../models/PartyVenue");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const uniquId = require("uniqid");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
const sendCreateOrderEmail = require("../utils/createOrderEmail");
const Discount = require("../models/Discount");
const sendConfirmOrderEmail = require("../utils/confirmEmail");
dotenv.config();

const makePayment = async (req, res) => {
  // console.log(req.body);
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    // console.log("instance", instance);
    const options = {
      amount: req.body.amount,
      currency: "INR",
      receipt: uniquId(),
    };

    const paymentOrder = await instance.orders.create(options);

    if (!paymentOrder) return res.status(500).send("Some error occured");
    res.json({ paymentOrder });
  } catch (error) {
    res.status(500).send(error);
  }
};
const createOrder = async (req, res) => {
  // console.log("create order req", req.body);
  const {
    userName,
    emailId,
    createOrderId,
    venueCode,
    date,
    packageName,
    time,
    minGuests,
    genderRatio,
    pricePerPerson,
    totalAmount,
    coupanCode,
    finalAmount,
    payableAmount,
    pendingAmount,
    menuItems,
  } = req.body;
  const origin = "https://eveout.in";
  // const origin = "http://localhost:3000";
  const venueCodeItem = await Product.findOne({
    venueCode: req.body.venueCode,
  });
  // const discountCode = await Discount.find({ discountCode: coupanCode });
  console.log("venue code item", venueCodeItem);
  if (!venueCodeItem) {
    throw new CustomError.BadRequestError("Venue code does not exist");
  }

  const order = await OrderSchema.create(req.body);
  date.split("T")[09];
  console.log("order", order);
  // await sendCreateOrderEmail({
  //   name: userName,
  //   email: emailId,
  //   venueName: venueCodeItem?.venueName,
  //   couponDiscount: order?.netDiscount,
  //   cc: venueCodeItem?.email,
  //   date,
  //   time,
  //   minGuests,
  //   genderRatio,
  //   packageName: packageName.toUpperCase(),
  //   totalAmount,
  //   pricePerPerson,
  //   payableAmount,
  //   pendingAmount,
  // });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Order has been created successfully !" });
};
const updateOrder = async (req, res) => {
  // console.log("update order request", req.body);
  const { createOrderId, coupanCode } = req.body;
  const updatedData = req.body;
  const options = { new: true };

  const result = await OrderSchema.findOneAndUpdate(
    { createOrderId: createOrderId },
    updatedData,
    options
  );
  const orderDetails = await OrderSchema.findOne({
    createOrderId: createOrderId,
  });
  const discountCode = await Discount.find({ discountCode: coupanCode });

  if (discountCode) {
    await Discount.updateOne(
      { discountCode: coupanCode },
      { $inc: { "usageLimit.totalLimit": -1 } }
    );
  }
  if (discountCode?.usageLimit?.type === "oncePerCustomer") {
    if (
      discountCode?.usageLimit?.usedCustomersCoupans?.indexOf(user._id) === -1
    ) {
      await Discount.updateOne(
        { discountCode: coupanCode },
        { $addToSet: { "usageLimit.usedCustomersCoupans": user._id } }
      );
    } else {
      throw new CustomError.BadRequestError(
        "Discount Coupan already used by customer!"
      );
    }
  }
  console.log("orderDetails", req.body);
  const venueCodeItem = await Product.findOne({
    venueCode: orderDetails?.venueCode,
  });
  // console.log("venueCodeItem", venueCodeItem);
  if (
    req.body?.paymentStatus == "Success" &&
    req.body?.orderStatus == "Pending"
  ) {
    await sendCreateOrderEmail({
      name: orderDetails?.userName,
      email: orderDetails?.emailId,
      venueName: venueCodeItem?.venueName,
      couponDiscount: orderDetails?.netDiscount,
      finalAmount: orderDetails?.finalAmount,
      date: String(orderDetails?.date).substr(0, 15),
      time: orderDetails?.time,
      minGuests: orderDetails?.minGuests,
      genderRatio: orderDetails?.genderRatio,
      packageName: orderDetails?.packageName.toUpperCase(),
      totalAmount: orderDetails?.totalAmount,
      pricePerPerson:
        orderDetails?.pricePerPerson - orderDetails?.discountPerPerson,
      payableAmount: orderDetails?.payableAmount,
      pendingAmount: orderDetails?.pendingAmount,
    });
  }

  if (req.body?.orderStatus == "Success") {
    await sendConfirmOrderEmail({
      name: orderDetails?.userName,
      email: orderDetails?.emailId,
      venueName: venueCodeItem?.venueName,
      couponDiscount: orderDetails?.netDiscount,
      finalAmount: orderDetails?.finalAmount,
      cc: venueCodeItem?.email,
      date: String(orderDetails?.date).substr(0, 15),
      time: orderDetails?.time,
      minGuests: orderDetails?.minGuests,
      genderRatio: orderDetails?.genderRatio,
      packageName: orderDetails?.packageName.toUpperCase(),
      totalAmount: orderDetails?.totalAmount,
      pricePerPerson:
        orderDetails?.pricePerPerson - orderDetails?.discountPerPerson,
      payableAmount: orderDetails?.payableAmount,
      pendingAmount: orderDetails?.pendingAmount,
    });
  }

  res.status(StatusCodes.OK).json({ msg: "Order Updated Successfully !" });
};

const getOrdersbyUsers = async (req, res) => {
  // console.log("user id", req.body.emailId);
  const userEmailId = req.body.emailId;
  const orders = await OrderSchema.find({ emailId: userEmailId }).sort({
    createdAt: -1,
  });
  res.status(StatusCodes.OK).json({ orders });
};
const getOrder = async (req, res) => {
  // console.log(req.params);
  const orderId = req.params.id;
  // console.log("orderId", orderId);
  const order = await OrderSchema.findOne({ orderId: orderId });
  res.status(StatusCodes.OK).json({ order });
};
const getAllOrders = async (req, res) => {
  let orders = await OrderSchema.find({}).sort({ createdAt: -1 });
  const partyVenues = await Product.find({}).sort();
  // console.log(partyVenues);
  // console.log(orders);
  // let ordersWithVenueName = orders.map((order) => {
  //   const filteredOrders = partyVenues
  //     .filter((venue) => venue.venueCode === order.venueCode)
  //     .map((venue) => {
  //       if (venue.venueCode === order.venueCode) {
  //         order.venueName = venue.venueName;
  //         return order;
  //       }
  //     });
  //   console.log(filteredVenues);
  // });
  // console.log("orders with venue names", ordersWithVenueName);
  res.status(StatusCodes.OK).json({ orders, count: orders.length });
};

const deleteOrder = async (req, res) => {
  const { id: _id } = req.params;

  const order = await OrderSchema.findOne({ _id: _id });

  if (!order) {
    throw new CustomError.NotFoundError(`No venue found`);
  }

  await order.remove();
  res.status(StatusCodes.OK).json({ msg: "Order Deleted Successfully !" });
};

module.exports = {
  updateOrder,
  createOrder,
  getAllOrders,
  makePayment,
  getOrder,
  getOrdersbyUsers,
  deleteOrder,
};
