const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const schedule = require('./utils/schedule')
// const { Reminder } = require("./models");
// const nodemailer = require("nodemailer");
// const schedule = require("node-schedule");


const sequelize = require("./config/connection");
const { log } = require("console");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});

schedule.scheduleDataRetrieval();
log(schedule.scheduleDataRetrieval)




// const scheduleDataRetrieval = async () => {
//     const reminders = await Reminder.findAll();
//     console.log("All reminders:", JSON.stringify(reminders, null, 2));
// }

// scheduleDataRetrieval();