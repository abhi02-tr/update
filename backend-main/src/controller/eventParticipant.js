// utils
import { spectrum } from "../db.js";
import { auth } from "../middleware/auth.js";
import asyncHandler from "../middleware/catchAsyncErrors.js";
import { sendEmail } from "../utils/sendEmail.js";

// Create User -- Admin
export const eventParticipant = asyncHandler(async (req, res, next) => {
  await auth(req,res)
  const { event, student, campaigner, team_member } = req.body;
  let insertData = {
    name: student.name,
    email: student.email,
    mobile_number: student.mobile_number,
    collage: student.collage,
    department: student.department,
    year: student.year,
    campaigner: campaigner.name,
    campaigner_mobile_number: campaigner.mobile_number,
  };
  if (team_member.length > 0) {
    team_member.map((value, index, array) => {
      insertData[`team_member${index + 1}`] = value;
    });
    console.log(insertData);
  }

  try {
    let confirm = await spectrum
      .collection(`${event.name}`)
      .insertOne(insertData);

    console.log("Event", confirm);
    if (confirm.insertedId) {
      console.log("message");
      let text =  `<!DOCTYPE html>
      <html lang="en">
     
                  <p>
                   <div class="mr">Hello <b>${student.name}</b>,</div>
                    <br>
                   Thank For Participating In <b>${event.name}</b>
                    <br>
                  Here Is Your Event Details,Please Kindly Check Your Details
                  </p>
               
                  <div class="row1 mr2"> <span class="th">Name : </span> ${student.name}</div>
                  <div class="row1 mr2"> <span class="th">Event Name : </span>${event.name} </div>
                  <div class="row1 mr2"> <span class="th">Fees : </span>${event.event_fee}</div>
                  <div class="row1 mr2"> <span class="th">Number : </span> ${student.mobile_number}</div>
                  <div class="row1 mr2"> <span class="th">Collage Name : </span> ${student.collage}</div>
                  <div class="row1 mr2"> <span class="th">Year : </span>${student.year}</div>
                  <div class="row1 mr2"> <span class="th">Department : </span>${student.department}</div>
              
      </body>
      </html>`;

       
      await sendEmail({
        to: student.email,
        subject: "Event Register Successfully",
        text,
      });
      res.send({
        success: true,
        data: "Student Register Successfully",
      });
    } else {
      res.send({
        success: false,
        data: "Stduent Registration Fail",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      data: "Stduent Registration Fail",
    });
  }
});
