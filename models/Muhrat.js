const mongoose = require("mongoose");

const MenuSchema = mongoose.Schema(
  {
    venueCode: {
      type: String,
      required: true,
      unique: true,
    },

    menuName: [
      {
        itemName: {
          type: String,
        },
        foodName: [
          {
            foodItem: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menues", MenuSchema);
