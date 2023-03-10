import controller from "../controller/index.js";



const userRoute = async (fastify, options, next) => {

  //add route here
  fastify.post("/login", controller.loginUser);
  fastify.post("/verify-otp", controller.verifyOtp);
  fastify.post("/check-user", controller.checkUser);
  // fastify.post("/register-event", controller.registerEvent);
  fastify.get("/events",  controller.getEvents);
  // fastify.post("/event-participant", controller.eventParticipant);
  fastify.post("/single-event-registration", controller.singleEventRegistration);
  fastify.post("/combo-event-registration", controller.comboEventRegistration);
  fastify.post("/get-count", controller.eventCount);
};
export default userRoute;
