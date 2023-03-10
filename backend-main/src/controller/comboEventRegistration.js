// utils
import { spectrum } from "../db.js";
import { auth } from "../middleware/auth.js";
import asyncHandler from "../middleware/catchAsyncErrors.js";
import { sendEmail } from "../utils/sendEmail.js";

import fs from 'fs';
import pdf from 'html-pdf';
import QRCode from "qrcode";

// Create User -- Admin
export const comboEventRegistration = asyncHandler(async (req, res, next) => {
  let isAuth = await auth(req, res);

  if (!isAuth) {
    res.send({
      success: false,
      data: "You don't have permission",
    });
  } else {
    const { comboState, student, campaigner } = req.body;

    let emailData = [];
    let counter = 0;
    let events = Object.keys(comboState);
    console.log("events:", events);

    events.map(async (value) => {
      let event_name = comboState[value].name;
      let team_member = comboState[value].member;

      let insertData = {
        name: student.name,
        email: student.email,
        mobile_number: student.mobile_number,
        collage: student.collage,
        enrollment_number: student.enrollment_number,
        campaigner: campaigner.name,
        campaigner_mobile_number: campaigner.mobile_number,
        is_combo: true
      };

      if (team_member.length > 0) {
        team_member.map((value, index, array) => {
          insertData[`team_member${index + 1}`] = value;
        });
      }

      try {
        let confirm = await spectrum
          .collection(`${event_name}`)
          .insertOne(insertData);
        if (confirm.insertedId) {
          counter += 1;
          emailData.push(event_name);
          console.log("counter", counter);
        } else {
          counter = 0;
          emailData = [];
          res.send({
            success: false,
            data: "Fail to register participant please try manually",
          });
        }
        if (counter == 3) {
          console.log("Data", counter, emailData);

          //add data in transection in DB
          let transaction = await spectrum.collection("trans").insertOne({
            name: student.name,
            email: student.email,
            mobile_number: student.mobile_number,
            collage: student.collage,
            enrollment_number: student.enrollment_number,
            campaigner: campaigner.name,
            campaigner_mobile_number: campaigner.mobile_number,
            is_combo: true,
            event1: comboState.event1.name,
            event2: comboState.event2.name,
            event3: comboState.event3.name,
            event_fee: 100,
            date: new Date().toLocaleString(),
          });
          if (transaction.insertedId) {
            // if successfully added in db all events only then send email
            console.log("Transaction added In DB");
          } else {
            console.log("Transaction not added In DB");
          }
          await sendComboEmail();
        }
      } catch (error) {
        emailData = [];
        counter = 0;
        console.log(error);
        res.send({
          success: false,
          data: "Fail to register participant please try manually",
        });
      }
    });
    
    let isGarba = (emailData[2] == 'garba') ? true : false;
    if(isGarba) {
      QRCode.toFile('./src/assets/qr.png', student.email, (err) => {
        console.error(err);
      })
    }
    console.log(isGarba);

    async function sendComboEmail() {
      try {
        let text = `<!DOCTYPE html>
                <html lang="en">
               
                            <p>
                             <div class="mr">Hello <b>${student.name}</b>,</div>
                              <br>
                             Thank For Participating In <b>${emailData[0]},${emailData[1]},${emailData[2]}</b>
                              <br>
                            Here Is Your Event Details,Please Kindly Check Your Details
                            </p>
                         
                            <div class="row1 mr2"> <span class="th">Name : </span> ${student.name}</div>
                            <div class="row1 mr2"> <span class="th">Event Name 1: </span>${emailData[0]} </div>
                            <div class="row1 mr2"> <span class="th">Event Name 2: </span>${emailData[1]} </div>
                            <div class="row1 mr2"> <span class="th">Event Name 3: </span>${emailData[2]} </div>
                            <div class="row1 mr2"> <span class="th">Fees : </span>100/-</div>
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
            if (err) {
              console.error(err);
            }
            sendEmail({
              to: student.email,
              subject: "Event Register Successfully",
              buffer,
              emailData
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

      } catch (error) {
        emailData = [];
        counter = 0;
        res.send({
          success: false,
          data: "Stduent Registration Fail",
        });
      }
    }
  }
});
