// utils
// import { ObjectId } from "mongodb";
import { spectrum } from "../db.js";
import { auth } from "../middleware/auth.js";
import asyncHandler from "../middleware/catchAsyncErrors.js";

// Create User -- Admin
export const eventCount = asyncHandler(async (req, res, next) => {
  let isAuth = await auth(req, res);

  if (!isAuth) {
    res.send({
      success: false,
      data: "You don't have permission",
    });
  } else {
    let { event_name, email } = req.body;

    //check user exist or not
    let isUserExist;
    let result;

    //check email and event name then check is user exist
    if (event_name && email) {
      isUserExist = (
        await spectrum.collection(event_name).find({ email: email }).toArray()
      ).length;
      // isUserExist
      // console.log("isUserExist", isUserExist);
    }
    //check email and event name then check is user exist then check count
    if (event_name && !isUserExist) {
      result = await spectrum.collection(event_name).count();
    } else {
      res.send({
        success: false,
        data: `User already Resigtered in ${event_name}`,
      });
    }

    // console.log(result);
    if (result || result == 0) {
      res.send({
        success: true,
        count: result,
        isUserExist,
      });
    } else {
      res.send({
        success: false,
        data: "data not found",
      });
    }
  }
});