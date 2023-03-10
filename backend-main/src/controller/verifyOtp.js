// utils

import asyncHandler from "../middleware/catchAsyncErrors.js";

import { readData, writeData } from "../utils/otp.js";
import { createSession } from "../utils/session.js";
import { refreshTokens } from "../utils/setCookie.js";
import { spectrum } from "../db.js";

export const verifyOtp = asyncHandler(async (req, res) => {
  const { _id, otp, email } = req.body;
  console.log("_id, otp, email:", _id, otp, email);

  let generateCookie = false;

  let deleteOtp = null;

  let data = await readData();
  data.map((value) => {
    if (value._id == _id && value.otp == otp) {
      generateCookie = true;
      deleteOtp = value._id;
    }
  });

  try {
    if (generateCookie) {
      data = data.filter((value) => value._id != deleteOtp);
      await writeData(data);
      const connectionInformation = {
        ip: req.ip,
        userAgent: req.headers["user-agent"],
      };

      const sessionToken = await createSession(_id, connectionInformation);

      const nontechEvents = await spectrum
        .collection("nontech_events")
        .find({})
        .toArray();

      const techEvents = await spectrum
        .collection("tech_events")
        .find({})
        .toArray();

      await refreshTokens(sessionToken, _id, req, res);

      res.send({
        success: true,
        data: "You are verified",
        nontechEvents,
        techEvents,
      });
      console.log("sessionToken:", sessionToken);
      generateCookie = false;
    } else {
      res.send({
        success: false,
        msg: "You are not verified",
      });
    }
  } catch (error) {
    console.log("message");
    generateCookie = false;
    res.send({
      success: false,
      msg: "You are not verified",
    });
  }
});
