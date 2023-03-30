const Candidate = require("../models/Candidate");

const createCandidate = async (req, res) => {
  const { mobileNumber } = req.body;

  const existingCandidate = await Candidate.findOne({ mobileNumber });
  if (existingCandidate) {
    const candidate = await Candidate.findOneAndUpdate(
      { mobileNumber },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(201).json({
      msg: "added successfully",
      candidate,
    });
  }
  const candidate = await Candidate.create(req.body);
  res.status(201).json({
    msg: "added successfully",
    candidate,
  });
};

module.exports = { createCandidate };
