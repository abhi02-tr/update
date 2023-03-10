import { checkUser } from "./checkUser.js";
import { loginUser } from "./loginUser.js";
import { verifyOtp } from "./verifyOtp.js";
import { registerEvent } from "./registerEvent.js";
import { getEvents } from "./getEvents.js";
import { eventParticipant } from "./eventParticipant.js";
import { comboEventRegistration } from "./comboEventRegistration.js";
import { singleEventRegistration } from "./singleEventRegistration.js";
import { eventCount } from "./eventCount.js";

export default {
  loginUser,
  verifyOtp,
  registerEvent,
  getEvents,
  checkUser,
  eventParticipant,
  singleEventRegistration,
  comboEventRegistration,
  eventCount,
};
