// utils
import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/catchAsyncErrors.js";
const { JWT_SIGNATURE } = process.env;
import mongo from "mongodb";
import { createTokens } from "../utils/token.js";
import { spectrum } from "../db.js";

const { ObjectId } = mongo;

export const checkUser = asyncHandler(async (req, res, next) => {
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
      const nontechEvents = await spectrum.collection("nontech_events").find({}).toArray();

      

      const techEvents = await spectrum.collection("tech_events").find({}).toArray();
      res.send({
        success: true,
        data: userData,
        nontechEvents,
        techEvents
      });
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
     
        const nontechEvents = await spectrum.collection("nontech_events").find({}).toArray();

       
  
        const techEvents = await spectrum.collection("tech_events").find({}).toArray();
        await refreshTokens(
          decodedRefreshToken.sessionToken,
          currentUser._id,
          req,
          res
        );
        res.send({
          success: true,
          data: currentUser,
          techEvents,
          nontechEvents
        });
      }
    }
  } catch (error) {
    console.error(error);
  }

  res.send({
    success: false,
  });
});

export async function refreshTokens(sessionToken, userId,req, reply) {
  //Create Tokens
  const { accessToken, refreshToken } = await createTokens(
    sessionToken,
    userId
  );

  const now = new Date();
  //get 30 days added for expire refresh token
  const refreshExpires = now.setDate(now.getDate() + 30);

  //Set Cookie
  reply
    .setCookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      domain: req.host,
      expires: refreshExpires,
      sameSite: "none",
      secure: true,
    })
    .setCookie("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      domain: req.host,
      sameSite: "none",
      secure: true,
    });
}
