import { createTokens } from "./token.js";

createTokens

export async function refreshTokens(sessionToken, userId, request,reply) {
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
        domain: request.host,
        expires: refreshExpires,
        sameSite: "none",
        secure: true,
      })
      .setCookie("accessToken", accessToken, {
        httpOnly: true,
        path: "/",
        domain: request.host,
        sameSite: "none",
        secure: true,
      });
  }