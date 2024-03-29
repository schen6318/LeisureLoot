const express = require("express");
const router = express.Router();
const myDB = require("../database/db.js");
const passport = require("passport");

// Establish connection with the database
myDB.establishConnection().catch(console.dir);

// Register new user
router.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const city = req.body.city;

  // Call the create_account function with the new parameters
  await myDB.create_account(username, password, city, res).catch(console.dir);
});

// Authenticate login
router.post("/login-auth", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send({ status: false, message: info.message });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.send({
        status: true,
        user: {
          id: user._id.toString(), // Convert MongoDB ObjectId to string
          username: user.username, // Include any other user details as needed
        },
      });
    });
  })(req, res, next);
});

// Get user profile
router.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userProfile = await myDB.getUserProfile(userId);
    if (userProfile) {
      // console.log(userProfile);
      res.json(userProfile);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Update or create user profile
router.post("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const profileData = req.body;
    const result = await myDB.updateOrCreateUserProfile(userId, profileData);

    if (result.matchedCount === 0 && result.upsertedCount === 1) {
      res.send({ message: "Created a new user profile." });
    } else if (result.matchedCount === 1) {
      res.send({ message: "User profile updated successfully." });
    } else {
      res.status(404).send({ message: "No operation was performed." });
    }
  } catch (error) {
    console.error("Error updating or creating user profile:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// contact form submission
router.post("/contact", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const message = req.body.message;

  await myDB.contact(name, email, phone, message, res).catch(console.dir);
});

//from Bob
//Load all posts for index page regardless of username. (Useful for index page)
router.post("/load-all-helpers", async (req, res) => {
  // console.log("Retrieving all posts from back end databases... (Backend)");
  const bol = req.body.bol;
  await myDB.getAllHelpOfferPosts(bol, res).catch(console.dir);
});

router.post("/load-seeks", async (req, res) => {
  // console.log("Loading logged in helpers...");
  const bol = req.body.bol;
  await myDB.getAllSeekPosts(bol, res).catch(console.dir);
});

router.post("/submit-form", async (req, res) => {
  // console.log("Received user-submitted form!");
  await myDB.insert_post(req, res).catch(console.dir);
});

router.get("/check-points/:userId", async (req, res) => {
  console.log("check points!");
  try {
  const userId = req.params.userId;
  const result = await myDB.getPoints(userId, res);
  if (result) {
    // console.log(result);
    res.json(result);
  } else {
    res.status(404).send({ message: "Points not found" });
  }
} catch (error) {
  console.error("Error fetching points:", error);
  res.status(500).send({ message: "Internal server error" });
}
});

router.get("/load-user-posts", async (req, res) => {
  // console.log("Loading logged in user's posts...");
  await myDB.getComments(req, res).catch(console.dir);
});

router.get("/load-other-posts", async (req, res) => {
  //console.log("Loading other's posts...");
  await myDB.getCommentsOthers(req, res).catch(console.dir);
});

router.post("/edit-post", async (req, res) => {
  // console.log("Editing post request submitted!");
  await myDB.edit_post(req, res).catch(console.dir);
});

router.post("/update-post-status", async (req, res) => {
  // console.log("Updating post status request submitted!");
  await myDB.update_post_status(req, res).catch(console.dir);
});

router.post("/delete-post", async (req, res) => {
  // console.log("Deleting post request submitted!");
  await myDB.delete_post(req, res).catch(console.dir);
});

router.post("/submit-message", async (req, res) => {
  console.log("Submitting new message.");
  await myDB.addMessage(
    req.body.postid,
    req.body.senderUsername,
    req.body.receiverUsername,
    req.body.message,
    res
  );
});

//must be changed 6
router.get("/get-received-message", async (req, res) => {
  // console.log("getting received messages...");
  await myDB.retrieveReceivedMessage(req, res);
});

router.get("/get-received-othermessage", async (req, res) => {
  console.log("getting received other messages...");
  await myDB.retrieveReceivedOtherMessage(req, res);
});


//iteration2-sissy: update points
router.post("/update-points", async (req, res) => {
  try {
    const { userId, pointsToAdd } = req.body;
    const updateResult = await myDB.addPoints(userId, pointsToAdd);
    if (updateResult.error) {
      res.status(400).send({ message: updateResult.error });
    } else {
      res.send({
        message: "Points updated successfully",
        updatedPoints: updateResult.updatedPoints,
      });
    }
  } catch (error) {
    console.error("Error updating user points:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

//deduct point when submitting new post
router.post("/deductPoints", async (req, res) => {
  try {
    const { userId, pointsToDeduct } = req.body;
    console.log(userId, pointsToDeduct);
    const result = await myDB.deductPoints(userId, pointsToDeduct);
    console.log(result);
    if (result) {
      console.log("Deducted OK");
      res.send({
        points: result.points,
      });
    } else {
      res.send({
        message: "Points deducted failed",
      });
    }
  } catch (error) {
    console.error("Error deducting user points:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

//iteration2-bob: transfer points
router.post("/transfer-points", async (req, res) => {
  // console.log("Transfer points request submitted!");
  await myDB.transfer_points(req, res).catch(console.dir);
});

//adjust points when editing post
router.post("/adjustPoints", async (req, res) => {
  try {
    //fetch old price and find out the difference of old and new
    const { userId, postId, newPrice } = req.body;
    const oldPrice = await myDB.fetchOldPrice(postId);
    const priceDifference = newPrice - oldPrice;
    //process of points adjustment
    const result = await myDB.adjustPoints(userId, priceDifference);
    if (result) {
      console.log("Adjusted OK");
      res.send({
        points: result.points,
      });
    } else {
      res.send({
        message: "Points adjusted failed",
      });
    }
  } catch (error) {
    console.error("Error adjusting points:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

//refund points when deleting post
router.post("/refundPoints", async (req, res) => {
  try {
    const { userId, refund } = req.body;
    const result = await myDB.refundPoints(userId, refund);
    if (result) {
      console.log("Refund OK");
      res.send({
        points: result.points,
      });
    } else {
      res.send({
        message: "Points refund failed",
      });
    }
  } catch (error) {
    console.error("Error refund user points:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
