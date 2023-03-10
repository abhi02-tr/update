// utils
import { spectrum } from "../db.js";
import { auth } from "../middleware/auth.js";
import asyncHandler from "../middleware/catchAsyncErrors.js";

// Create User -- Admin
export const registerEvent = asyncHandler(async (req, res, next) => {
  await auth(req,res);
  const {
    name,
    event_coordinate,
    type,
    department,
    description,
    event_fee,
    team_member,
    max_entry,
  } = req.body;
  const event = await spectrum.collection("events").insertOne({
    name,
    event_coordinate,
    type,
    department,
    description,
    event_fee,
    team_member,
    max_entry,
  });

  if (event.insertedId) {
    res.send({
      success: true,
      _id: event.insertedId,
    });
  } else {
    res.send({
      success: false,
      msg: "event not added",
    });
  }
});
