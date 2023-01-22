const MenuSchema = require("../models/Menu");
const Product = require("../models/PartyVenue");
const PackageSchema = require("../models/Packages");

const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createMenue = async (req, res) => {
  const venueCodeItem = await Product.findOne({
    venueCode: req.body.venueCode,
  });
  const menue = await MenuSchema.findOne({
    venueCode: req.body.venueCode,
  });
  if (menue) {
    throw new CustomError.BadRequestError(
      "Food menue has been already created!"
    );
  }
  if (!venueCodeItem) {
    throw new CustomError.BadRequestError("Venue code does not exist");
  }
  const menueItem = await MenuSchema.create(req.body);
  res.status(StatusCodes.CREATED).json({ menueItem });
};

const updateMenu = async (req, res) => {
  const venueCodeItem = await Product.findOne({
    venueCode: req.body.venueCode,
  });
  const menue = await MenuSchema.findOne({
    venueCode: req.body.venueCode,
  });

  if (!venueCodeItem) {
    throw new CustomError.BadRequestError("Venue code does not exist");
  }
  if (!menue) {
    throw new CustomError.BadRequestError("Menu does not exist!");
  }
  const menueItem = await MenuSchema.findOneAndUpdate(
    { venueCode: req.body.venueCode },
    req.body
  );
  res.status(StatusCodes.CREATED).json({ menueItem });
};

const getMenues = async (req, res) => {
  const { id: venueCode } = req.params;
  const packages = await PackageSchema.findOne({ venueCode: venueCode });
  const menue = await MenuSchema.findOne({
    venueCode: venueCode,
  });
  if (!packages) {
    throw new CustomError.NotFoundError(`No menue found`);
  }
  if (!menue) {
    throw new CustomError.NotFoundError(`No menue found`);
  }
  res.status(StatusCodes.OK).json({
    menue,
    packages: packages.packages.map((pack) => {
      return {
        packageName: pack.packageName,
        starterVeg: pack.starterVeg,
        starterNonVeg: pack.starterNonVeg,
        mainVeg: pack.mainVeg,
        mainNonVeg: pack.mainNonVeg,
        dessert: pack.dessert,
      };
    }),
  });
};

module.exports = {
  createMenue,
  getMenues,
  updateMenu,
};
