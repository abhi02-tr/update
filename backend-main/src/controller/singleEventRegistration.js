// utils
import { spectrum } from "../db.js";
import { auth } from "../middleware/auth.js";
import asyncHandler from "../middleware/catchAsyncErrors.js";
import { sendEmail } from "../utils/sendEmail.js";
import fs from 'fs';
import pdf from'html-pdf';

// Create User -- Admin
export const singleEventRegistration = asyncHandler(async (req, res) => {
  let isAuth = await auth(req, res);
  if (!isAuth) {
    res.send({
      success: false,
      data: "You don't have permission",
    });
  } else {
    const { event, student, campaigner, team_member } = req.body;
    let insertData = {
      name: student.name,
      email: student.email,
      mobile_number: student.mobile_number,
      collage: student.collage,
      enrollment_number: student.enrollment_number,
      campaigner: campaigner.name,
      campaigner_mobile_number: campaigner.mobile_number,
      is_combo:false
    };
    if (team_member.length > 0) {
      team_member.map((value, index) => {
        insertData[`team_member${index + 1}`] = value;
      });
      console.log(insertData);
    }
    //add data in transection in DB
    let transaction = await spectrum
      .collection("transaction_details")
      .insertOne({
        name: student.name,
        email: student.email,
        mobile_number: student.mobile_number,
        collage: student.collage,
        enrollment_number: student.enrollment_number,
        campaigner: campaigner.name,
        campaigner_mobile_number: campaigner.mobile_number,
        is_combo: false,
        event: event.name,
        event_fee: event.event_fee,
        date: new Date().toLocaleString(),
      });
    if (transaction.insertedId) {
      // if successfully added in db all events only then send email
      console.log("Transaction added In DB");
    } else {
      console.log("Transaction not added In DB");
    }
    try {
      // let confirm = await spectrum
      //   .collection(`${event.name}`)
      //   .insertOne(insertData);
      let confirm = await spectrum
      .collection(`${event.name}`)
      .insertOne(insertData);
      
      console.log('confirm:', confirm)
    
      if (confirm.insertedId) {
        console.log("message");
        let text = `<!DOCTYPE html>
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
               
              
      </body>
      </html>`;

      fs.writeFile('./src/assets/pdf.html', text, (err) => { console.error(err); });
      fs.readFile('./src/assets/pdf.html', 'utf-8', (err, html) => {
        if (err) {
          console.error(err);
        }
        pdf.create(html, {}).toBuffer((err, buffer) => {
          if(err) {
            console.error(err);
          }
          sendEmail({
            to: student.email,
            subject: "Event Register Successfully",
            buffer,
          }, (err) => {
            emailData = [];
            counter = 0;
            res.send({
              success: false,
              data: "Stduent Registration Fail",
            });
          });
          res.send({
            success: true,
            data: "Student Register Successfully",
          });
        });

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
  }
});
