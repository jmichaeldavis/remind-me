const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
const { Reminder } = require("../models");
const { User } = require("../models");

// need to run this function monthly or with each post request
// const reminders = [];
// const users = [];

// const updateReminder = async () => {
//   const reminderData = await Reminder.findAll();
//   // console.log("REMINDER DATA>>>>", JSON.stringify(reminderData, null, 2))
//   // reminderData.forEach(reminders.push())
//   // reminders.push(...reminderData);
// };

// updateReminder();
// console.log("REMINDERS>>>>", JSON.stringify(reminders, null, 2))

// const updateUser = async () => {
//   const userData = await User.findAll();
//   // users.push(userData);
// };

const scheduleDataRetrieval = async () => {
  const reminders = await Reminder.findAll();
  const users = await User.findAll();
  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < reminders.length; j++) {
      if (users[i].id === reminders[j].user_id) {
        scheduleReminder(
          users[i].name,
          users[i].email,
          reminders[j].task_title,
          reminders[j].task_description,
          reminders[j].months
        );
      }
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

module.exports = scheduleDataRetrieval;
