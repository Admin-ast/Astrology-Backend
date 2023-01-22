const mongoose = require("mongoose");

const PackageSchema = mongoose.Schema(
  {
    venueCode: {
      type: String,
      required: true,
      unique: true,
    },
    packages: [
      {
        packageName: {
          type: String,
          enum: [
            "imfl",
            "redLabel",
            "blackLabel",
            "foodPackage",
            "beerPackage",
            "singleMalt",
          ],
          required: true,
        },
        price: {
          type: Number,
          required: true,
          default: 0,
        },
        starterVeg: {
          type: Number,
          required: true,
          default: 1,
        },
        starterNonVeg: {
          type: Number,
          required: true,
          default: 1,
        },
        mainVeg: {
          type: Number,
          required: true,
          default: 1,
        },
        mainNonVeg: {
          type: Number,
          required: true,
          default: 1,
        },
        dessert: {
          type: Number,
          required: true,
          default: 1,
        },
        beer: {
          type: String,
          default: "",
        },
        bread: {
          type: String,
          default: "",
        },
        rice: {
          type: String,
          default: "",
        },
        whisky: {
          type: String,
          default: "",
        },
        vodka: {
          type: String,
          default: "",
        },
        rum: {
          type: String,
          default: "",
        },
        gin: {
          type: String,
          default: "",
        },
        wine: {
          type: String,
          default: "",
        },
        cocktails: {
          type: String,
          default: "",
        },
        mocktails: {
          type: String,
          default: "",
        },
        softDrinks: {
          type: String,
          default: "",
        },
        juices: {
          type: String,
          default: "",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Packages", PackageSchema);
