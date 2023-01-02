
const session = require("express-session");

const express = require("express");
const path = require("path");

const app = express();

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const homeRoute = require("./routes/home");
const citiesRoute = require("./routes/cities");
const hikingRoute = require("./routes/hiking");
const islandsRoute = require("./routes/islands");
const romeRoute = require("./routes/rome");
const parisRoute = require("./routes/paris");
const santoriniRoute = require("./routes/santorini");
const searchresultsRoute = require("./routes/searchresults");
const wanttogoRoute = require("./routes/wanttogo");
const incaRoute = require("./routes/inca");
const annapurnaRoute = require("./routes/annapurna");
const baliRoute = require("./routes/bali");
const logoutRoute = require("./routes/logout");

// view engine setup
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  }),
);

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs"); // set up ejs for templating
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(".", "public", "images")));

app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/", homeRoute);
app.use("/cities", citiesRoute);
app.use("/hiking", hikingRoute);
app.use("/islands", islandsRoute);
app.use("/rome", romeRoute);
app.use("/paris", parisRoute);
app.use("/santorini", santoriniRoute);
app.use("/search", searchresultsRoute);
app.use("/wanttogo", wanttogoRoute);
app.use("/inca", incaRoute);
app.use("/annapurna", annapurnaRoute);
app.use("/bali", baliRoute);
app.use("/logout", logoutRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

