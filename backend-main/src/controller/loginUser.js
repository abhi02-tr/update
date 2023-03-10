// utils

import asyncHandler from "../middleware/catchAsyncErrors.js";
import { campaign } from "../db.js";
// import { sendEmail } from "../utils/sendEmail.js";
import { readData, writeData } from "../utils/otp.js";
import { sendOtp } from "../utils/sendOtp.js";

// Create User -- Admin
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  // const user = campaign.find({email:email});
  const user = await campaign.findOne({
    email,
  });
  console.log("user:", user);

  if (user) {
    let otp = Math.ceil(Math.random() * 1000000);
    let data = await readData();
    data = [...data, { _id: user._id, otp }];
    await writeData(data);
    let text = `<h1>Your Verification Code is ${otp}</h1>`;
    await sendOtp({
      to: email,
      subject: "Email Verification",
      text,
    });
    res.send({
      success: true,
      data: user,
    });
  } else {
    res.send({
      success: false,
      msg: "user not added",
    });
  }
});
