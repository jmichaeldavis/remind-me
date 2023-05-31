const nodemailer = require("nodemailer");
const schedule = require("node-schedule");

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

  const timers = ["0 * * * * *", "30 * * * * *"];
  for (let i = 0; i < timers.length; i++) {
    schedule.scheduleJob(timers[i], function () {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
        console.log("test scheduler");
      });
    });
  }
};

module.exports = scheduleReminder;
