const express = require("express");
const session = require("express-session");
const passport = require("passport");
const passportSetup = require("./config/passport.js");
const app = express();
const PORT = process.env.PORT || 5000;
const routes = require("./routes/index");

passportSetup.setupPassport();

app.use(express.json());

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/loginStatus", (req, res) => {
  console.log("Authentication Status", req.isAuthenticated());
  res.json({ user: req.user });
});

app.get("/logout", function (req, res) {
  req.logout();
  console.log("Current log in user is", req.user);
  res.json({ status: true });
});

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
