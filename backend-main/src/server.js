import "./config.js";
import { connectDb } from "./db.js";
import userRoute from "./Routes/userRoute.js";
import fastifyCors from "fastify-cors";
import fastify from "fastify";
import fastifyCookie from "fastify-cookie";
import helmet from "fastify-helmet";

const app = fastify({ logger: false });

// Routes
app.register(userRoute, {
  prefix: "/api",
});

//error middleware
// fastify.use((err,req,res,next)=>{

// })

//server Function
async function startApp() {
  try {
    app.register(
      helmet,
      // Example disables the `contentSecurityPolicy` middleware but keeps the rest.
      { global: true },
    );

    // app.register(fastifyCors, {
    //   origin: [
    //     "https://spectrum22.xyz",
    //     "www.spectrum22.xyz",
    //     /\.spectrum22.xyz/,
    //   ],
    //   credentials: true,
    // });

    app.register(fastifyCors, {
      origin: [/\.localhost:8080/, "http://localhost:8080"],
      credentials: true,
    });

    app.register(fastifyCookie, {
      secret: process.env.COOKIE_SIGNATURE,
    });
    await app.listen(process.env.PORT, "0.0.0.0");
    console.log(
      process.env.PORT
        ? `Server Started At ${process.env.PORT}🚀🚀`
        : "Server Started At 3000🚀🚀",
    );
  } catch (error) {
    console.error(error);
  }
}
//db Connection
connectDb().then(() => {
  startApp();
});
