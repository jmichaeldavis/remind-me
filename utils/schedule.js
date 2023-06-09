const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
const { Reminder } = require("../models");
const { User } = require("../models");

const scheduleDataRetrieval = async () => {
  const reminders = await Reminder.findAll();
  const users = await User.findAll();
  const currentMonth = new Date().getMonth() + 1; // JavaScript months are 0-11

  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < reminders.length; j++) {
      if (
        users[i].id === reminders[j].user_id &&
        (!reminders[j].is_sent ||
          (reminders[j].last_sent &&
            new Date(reminders[j].last_sent).getMonth() + 1 !== currentMonth))
      ) {
        scheduleReminder(
          users[i].name,
          users[i].email,
          reminders[j].task_title,
          reminders[j].task_description,
          reminders[j].months,
          reminders[j]
        );

        try {
          await reminders[j].save();
          console.log(reminders[j]);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};

const scheduleReminder = (
  user,
  reciever,
  reminderTitle,
  description,
  months,
  reminders
) => {
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
    text: `Hello ${user}, here's your personal reminder.\n 
  Reminder:
    ${reminderTitle}\n
  Details:
    ${description} \n
From,
Remind Me\n
To modify your reminders visit https://monthlyreminders.herokuapp.com/`,
  };

  schedule.scheduleJob(`0,30 * * * ${months} *`, async function () {
    const reminder = await Reminder.findOne({ where: { id: reminders.id } });
    if (reminder && !reminder.is_sent) {
      transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
          console.log(error);
        } else {
          reminders.is_sent = true;
          reminders.last_sent = new Date();
          await reminders.save();
          console.log("Email sent: " + info.response);
        }
        console.log("test scheduler");
      });
    }
  });
};

const resetReminders = async () => {
  // get all reminders
  const reminders = await Reminder.findAll();
  // iterate over reminders and reset isSent
  for (let reminder of reminders) {
    reminder.is_sent = false;
    await reminder.save();
  }
};

schedule.scheduleJob("0 0 1 * *", resetReminders);

module.exports = scheduleDataRetrieval;
