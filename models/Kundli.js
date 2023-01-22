const mongoose = require("mongoose");
const validator = require("validator");

const VenueSchema = new mongoose.Schema({
  venueType: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

const PartyVenueSchema = new mongoose.Schema(
  {
    venueName: {
      type: String,
      trim: true,
      required: [true, "Please provide product name"],
      maxlength: [100, "Name can not be more than 100 characters"],
    },
    venueCode: {
      type: String,
      trim: [true, "Space not allowed in venuecode"],
      unique: [true, "Venue code already exits!"],
      required: [true, "Please provide venue code"],
    },
    venueURL: {
      type: String,
      trim: [true, "Space not allowed in Venue URL"],
      // unique: [true, "Venue code already exits!"],
      required: [true, "Please provide venue URL"],
    },
    discountSystem: {
      maleEighty: { type: String },
      maleNinety: { type: String },
      maleHundered: { type: String },
      monthus: { type: String },
      frisun: { type: String },
      nineToSeven: { type: String },
      sevenPlus: { type: String },
      mgFifty: { type: String },
      mgEighty: { type: String },
      mgNinetyNine: { type: String },
    },
    contactPerson: {
      type: String,
      trim: true,
      required: [true, "Please provide contact person"],
      maxlength: [100, "Contact person cannot be more than 100 characters"],
    },
    phoneNumber: {
      type: Number,
      trim: true,
      required: [true, "Please provide phone number"],
      maxlength: [10, "Phone number cannot be more than 10 characters"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please provide email address"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
      maxlength: [50, "Email address cannot be more than 50 characters"],
    },
    website: {
      type: String,
      trim: true,
      maxlength: [100, "Website cannot be more than 100 characters "],
    },
    address: {
      type: String,
      trim: true,
      maxlength: [250, "Address cannot be more than 250 characters "],
    },
    country: {
      type: String,
      trim: true,
      maxlength: [100, "Country cannot be more than 100 characters "],
      default: "india",
    },
    state: {
      type: String,
      trim: true,
      maxlength: [100, "State cannot be more than 100 characters "],
    },
    city: {
      type: String,
      trim: true,
      maxlength: [100, "City cannot be more than 100 characters "],
    },
    mapUrl: {
      type: String,
    },
    subLocation: {
      type: String,
      trim: true,
      maxlength: [100, "Sub Location cannot be more than 100 characters "],
    },
    zipCode: {
      type: Number,
      trim: true,
      maxlength: [6, "Zip Code cannot be more than 6 characters "],
    },
    price: {
      type: Number,
      required: [true, "Please provide Venue price"],
      default: 0,
    },
    noOfGuest: {
      type: Number,
      required: [true, "Please provide number of guest"],
      default: 0,
    },
    openingTime: {
      type: String,
      required: [true, "Please provide opening time"],
      maxlength: [40, "Opening time cannot be more than 40 characters"],
    },
    closingTime: {
      type: String,
      required: [true, "Please provide closing time"],
      maxlength: [40, "Closing time cannot be more than 40 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
    },
    registeredBy: {
      type: String,
      required: [true, "Please provide registered by"],
      maxlength: [40, "Registerd by cannot be more than 40 characters"],
    },
    status: {
      type: String,
      required: [true, "Please provide status"],
      maxlength: [40, "Status cannot be more than 40 characters"],
      default: "pending",
    },
    slider: {
      type: String,
    },
    gallery: {
      type: String,
    },
    typeOfVenue: [VenueSchema],
    bestSuitedFor: [
      {
        bestSuited: {
          type: String,
          trim: true,
        },
        status: {
          type: String,
          enum: ["active", "inactive"],
          default: "active",
        },
      },
    ],
    typeOfCuisines: [
      {
        cuisines: {
          type: String,
          trim: true,
        },
        status: {
          type: String,
          enum: ["active", "inactive"],
          default: "active",
        },
      },
    ],
    amenities: [
      {
        amenities: {
          type: String,
          trim: true,
        },
        status: {
          type: String,
          enum: ["active", "inactive"],
          default: "active",
        },
      },
    ],

    sponsored: {
      type: Boolean,
      default: false,
    },
    showMap: {
      type: Boolean,
      default: false,
    },

    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

PartyVenueSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

PartyVenueSchema.pre("remove", async function (next) {
  await this.model("Review").deleteMany({ product: this._id });
});

module.exports = mongoose.model("Venue", PartyVenueSchema);
