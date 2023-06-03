const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
const { Reminder } = require("../models");
const { User } = require("../models");


const scheduleDataRetrieval = async () => {
  const reminders = await Reminder.findAll();
  const users = await User.findAll();
  for (let i = 0; i < reminders.length; i++) {
    for (let j = 0; j < users.length; j++) {
      scheduleReminder(
        users[j].name,
        users[j].email,
        reminders[i].task_title,
        reminders[i].task_description,
        reminders[i].months
      );
    }
  }
};

const scheduleReminder = (user, reciever, reminderTitle, description, months) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "remind.me.later.date@gmail.com",
      pass: "vjfxgfdbjhuhksny",
    },
  });

  const mailOptions = {
    from: "remind.me.later.date@gmail.com",
    to: reciever,
    subject: reminderTitle,
    text: `Hello ${user}, this is a reminder to ${reminderTitle}.\n
        ${description} \n
        From, \n
        Remind Me`,
  };
  schedule.scheduleJob(`0,30 * * * ${months} *`, function () {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
      console.log("test scheduler");
    });
  });
};

module.exports = { scheduleReminder, scheduleDataRetrieval };


// console.log("All reminders:", JSON.stringify(reminders, null, 2));
// console.log("All users:", JSON.stringify(users, null, 2));
// console.log("SELECTED USER>>>>>", reminders[1].months)