// utils
import jwt from "jsonwebtoken";
const { JWT_SIGNATURE } = process.env;
import mongo from "mongodb";

const { ObjectId } = mongo;

export const auth = async (req, res, done) => {
  try {
    const { campaign } = await import("../db.js");
    const { session } = await import("../db.js");
    //Check if accessToken is exists
    if (req?.cookies?.accessToken) {
      //if accessToken
      const { accessToken } = req.cookies;

      //decode accessToken
      const decodedAccessToken = jwt.verify(accessToken, JWT_SIGNATURE);

      //return user from record
      const userData = await campaign.findOne({
        _id: ObjectId(decodedAccessToken?.userId),
      });

      if (userData) {
        // next();
        return true;
      } else {
        return false;
      }
    }

    //Check if refreshToken is exists
    else if (req?.cookies?.refreshToken) {
      //if refreshToken
      const { refreshToken } = req.cookies;

      //decode accessToken
      const decodedRefreshToken = jwt.verify(refreshToken, JWT_SIGNATURE);

      //return user from record
      const currentSession = await session.findOne({
        sessionToken: decodedRefreshToken?.sessionToken,
      });

      //confirm session is valid
      if (currentSession.valid) {
        //LookUp current User
        const currentUser = await campaign.findOne({
          _id: ObjectId(currentSession.userId),
        });
        if (currentUser) {
          //   next();
          return true
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);

    res.send({
      success: false,
      data: "You don't have permition",
    });
    return false;
  }
};
