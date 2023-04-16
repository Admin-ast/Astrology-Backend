require("dotenv").config();
require("express-async-errors");
// express

const express = require("express");
const app = express();
// rest of the packages
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

// database
const connectDB = require("./db/connect");

//  routers
// const walletRouter = require("./routes/walletRoutes");
const horoscopeRouter = require("./routes/horoscopeRoutes");
const kundliRouter = require("./routes/kundliRoutes");
const userAuthRouter = require("./routes/userAuthRoutes");
const candidateRouter = require("./routes/candidateRouts");
const otpRouter = require("./routes/otpRoutes");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const https = require("https");
const fs = require("fs");
const https_options = {
  ca: fs.readFileSync("ca_bundle.crt"),
  key: fs.readFileSync("private.key"),
  cert: fs.readFileSync("certificate.crt"),
};

// console.log(fs.readFileSync("ca_bundle.crt"));

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static("./public"));
app.use(fileUpload());
// app.use("*", cors({ credentials: false, origin: "http://localhost:3000" }));
app.use("*", cors({ credentials: false, origin: "https://astrosevatalk.com" }));

// app.use("/api/v1/transaction", walletRouter);
app.use("/api/v1/horoscope", horoscopeRouter);
app.use("/api/v1/kundli", kundliRouter);
app.use("/api/v1/auth", userAuthRouter);
app.use("/api/v1/astrologer", candidateRouter);
app.use("/api/v1", otpRouter);
app.use("/api/v1", (req, res) => {
  res.json({ msg: "recent deployment works!" });
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    https
      .createServer(https_options, app)
      .listen(port, () =>
        console.log(`Server is listening on port ${process.env.USER_ID}...`)
      );

    // app.listen(port, () =>
    //   console.log(`Server is listening on port ${process.env.USER_ID}...`)
    // );
  } catch (error) {
    console.log(error);
  }
};

start();
