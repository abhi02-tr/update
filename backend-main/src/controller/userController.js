// utils

import asyncHandler from "../middleware/catchAsyncErrors.js";
import { client } from "../db.js";
import { auth } from "../middleware/auth.js";

const spectrum = await client.db("spectrum");

// Create User -- Admin
export const registerUser = asyncHandler(async (req, res, next) => {
  await auth(req,res);
  const { name, email, password } = req.body;
  const user = await spectrum.collection("campaign").insertOne({
    name,
    email,
    password,
  });

  if (user.insertedId) {
    res.send({
      success: true,
      _id: user.insertedId,
    });
  }
  else{
    res.send({
      success:false,
      msg:"user not added"
    })
  }
});
