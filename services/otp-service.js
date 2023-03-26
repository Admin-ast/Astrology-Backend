const Twilio = require("twilio");
const accountSid = "ACb11e2496bbb52584407c81c1e77f1d82";
const authToken = "cd9847ec1cde3270f12c2f9b7aed87a7";
const verifySid = "VA5f1c1dbb49fef2a0c8942e482148b12f";

const client = require("twilio")(accountSid, authToken);

const createOtpService = async (mobileNumber) => {
  const response = await client.verify.v2
    .services(verifySid)
    .verifications.create({ to: `+91${mobileNumber}`, channel: "sms" })
    .then((verification) => {
      console.log("ceatye", verification.status);
      return verification.status;
    });

  return response;
};

const verifyOtpService = async (mobileNumber, otp) => {
  const response = await client.verify.v2
    .services(verifySid)
    .verificationChecks.create({
      to: `+91${mobileNumber}`,
      code: otp,
    })
    .then((verification_check) => {
      console.log("status is", verification_check.status);
      return verification_check.status;
    });
  return response;
};

module.exports = { createOtpService, verifyOtpService };
