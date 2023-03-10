import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
  },
  mobile_number: {
    type: Number,
    required: [true, "Please Enter Your Mobile number"],
  },
  collage: {
    type: Number,
    required: [true, "Please Enter Your collage"],
  },
  enrollment_number: {
    type: String,
    required: [true, "Please Enter Your Enrollment Number"],
  },
  campaigner: {
    type: String,
    required: [true, "Please Enter Campaigner Name"],
  },
  campaigner_mobile_number: {
    type: Number,
    required: [true, "Please Enter Campaigner Mobile number"],
  },
});
export default mongoose.model("Event", eventSchema);
