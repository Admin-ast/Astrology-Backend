const Product = require("../models/PartyVenue");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const calculatePremium = async (req, res) => {
  // console.log("req", req);
  let netDiscount = 0;
  let finalPrice = 0;
  const {
    basePrice,
    date,
    endTime,
    startTime,
    femalePercent,
    malePercent,
    noOfGuests,
    packageType,
    venueCode,
  } = req.body;
  const venueDetails = await Product.find({ venueCode: venueCode });
  // console.log("venue Details", venueDetails);
  const discountSystem = venueDetails[0]?.discountSystem;
  const convertedDate = new Date(date);
  const weekDay = convertedDate.getDay();
  console.log("discount  system", discountSystem);
  console.log("base price", Number(malePercent));
  // console.log("date", convertedDate.getDay()); //0 = Sunday , 1 = Monday]
  // console.log("initial dis", netDiscount);
  console.log("weekday", weekDay);
  // if (weekDay === 0 || weekDay === 5 || weekDay === 6) {
  if (weekDay === 4 || weekDay === 5 || weekDay === 6) {
    console.log("1");
    netDiscount = netDiscount - Number(discountSystem.frisun);
  } else {
    netDiscount = netDiscount - Number(discountSystem.monthus);
  }
  // console.log("weekdaydis", netDiscount);
  if (Number(malePercent) >= 80 && Number(malePercent) < 90) {
    netDiscount = netDiscount - Number(discountSystem.maleEighty);
  } else if (Number(malePercent) >= 90 && Number(malePercent) < 100) {
    console.log("2");
    netDiscount = netDiscount - Number(discountSystem.maleNinety);
  } else if (Number(malePercent) === 100) {
    netDiscount = netDiscount - Number(discountSystem.maleHundered);
  }
  // console.log("male Dis", netDiscount);
  if (noOfGuests > 50 && noOfGuests <= 80) {
    netDiscount = netDiscount - Number(discountSystem.mgFifty);
  } else if (noOfGuests > 80 && noOfGuests <= 99) {
    netDiscount = netDiscount - Number(discountSystem.mgEighty);
  } else if (noOfGuests > 99) {
    console.log("3");
    netDiscount = netDiscount - Number(discountSystem.mgNinetyNine);
  }
  // console.log("noOfGuestsDis", netDiscount);
  const startTimeNumber = Number(startTime.split(":")[0]);
  // console.log("startTimeNumber", startTimeNumber);
  if (startTimeNumber >= 9 && startTimeNumber < 19) {
    console.log("4");
    netDiscount = netDiscount - Number(discountSystem.nineToSeven);
  } else {
    netDiscount = netDiscount - Number(discountSystem.sevenPlus);
  }
  // console.log("timeDis", netDiscount);
  finalPrice = basePrice - netDiscount;
  if (packageType === "imfl" && finalPrice < 1000) {
    finalPrice = 1000;
    netDiscount = basePrice - finalPrice;
  } else if (packageType === "foodpackage" && finalPrice < 900) {
    finalPrice = 900;
    netDiscount = basePrice - finalPrice;
  }
  res
    .status(StatusCodes.OK)
    .json({ netDiscountPerPerson: netDiscount, finalPrice });
};

module.exports = { calculatePremium };
