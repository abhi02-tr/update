// utils
import { spectrum } from "../db.js";
import { auth } from "../middleware/auth.js";
import asyncHandler from "../middleware/catchAsyncErrors.js";

// Create User -- Admin
export const getEvents = asyncHandler(async (req, res, next) => {
  let isAuth = await auth(req, res);
  if (!isAuth) {
    res.send({
      success: false,
      data: "You don't have permission",
    });
  } else {
    let events = await spectrum.collection("events").find().toArray();

    // console.log("Event", events);
    if (events) {
      res.send({
        success: true,
        events: events,
      });
    } else {
      res.send({
        success: false,
        msg: "event not found",
      });
    }
  }
});
