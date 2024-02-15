const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const myDB = require("../database/db.js");

module.exports.setupPassport = () => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await myDB.accessUserDataDB(username);
        if (!user) {
          return done(null, false, { message: "No user found." });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password incorrect." });
          }
        });
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser(async (username, done) => {
    try {
      const user = await myDB.accessUserDataDB(username);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};
