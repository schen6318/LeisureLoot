const bcrypt = require("bcrypt");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

function myDB() {
  let project_database;

  const myDB = {};
  const uri = process.env.MONGODB_URI;

  myDB.establishConnection = async () => {
    const client = new MongoClient(uri);
    try {
      await client.connect();
      project_database = client.db("leisureloot");
      console.log("Connected successfully to server");
    } catch (e) {
      console.error("Connection error:", e);
    }
  };

  myDB.create_account = async (username, password, city, res) => {
    const collection = project_database.collection("userInfo");
    const userExists = await collection.findOne({ username });

    if (userExists) {
      res.json({ status: "account-exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { username, password: hashedPassword, city };
    try {
      await collection.insertOne(newUser);
      console.log("User has been inserted successfully.");
      res.json({ status: "success" });
    } catch (error) {
      console.error("Insert user error:", error);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
  };

  myDB.accessUserDataDB = async (username) => {
    const userInfo = project_database.collection("userInfo");
    const user = await userInfo.findOne({ username });
    return user;
  };

  myDB.updateOrCreateUserProfile = async (userId, profileData) => {
    const collection = project_database.collection("userProfile");
    try {
      const result = await collection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: profileData },
        { upsert: true }
      );

      if (result.matchedCount === 0 && result.upsertedCount === 1) {
        console.log("Created a new user profile.");
      } else if (result.matchedCount === 1) {
        console.log("User profile updated successfully.");
      } else {
        console.log("No operation was performed.");
      }

      return result;
    } catch (e) {
      console.error("Error updating or creating user profile:", e);
      throw e;
    }
  };

  myDB.getUserProfile = async (userId) => {
    const collection = project_database.collection("userProfile");
    try {
      let profile = await collection.findOne({ _id: new ObjectId(userId) });
      if (!profile) {
        console.log("No user found with the given ID.");
        return null;
      }
      profile = { id: profile._id.toString(), ...profile, _id: undefined };
      console.log(profile);
      return profile;
    } catch (e) {
      console.error("Error fetching user profile:", e);
      throw e;
    }
  };

  myDB.contact = async (name, email, phone, message, res) => {
    const collection = project_database.collection("contactForm");
    const newContact = { name, email, phone, message };

    try {
      await collection.insertOne(newContact);
      console.log("Contact from has been saved successfully.");
      res.json({ status: "success" });
    } catch (error) {
      console.error("Save contact form error:", error);
      res
        .status(500)
        .json({ status: "error", message: "Internal server error" });
    }
  };

  //以下来自于Bob
  myDB.insert_post = async (req, res) => {
    let feedback_database;
    //Sophia修改：因为提交need时去掉了选择offerHelp，都是seekHelp，所以这里不需要判断了
    feedback_database = project_database.collection("posts");

    req.body["username"] = req.user.username;
    await feedback_database.insertOne(req.body);
    console.log("Post Successfully Submitted!");
    res.json({ status: true });
  };

  myDB.edit_post = async (req, res) => {
    let target_database;
    let json = req.body;
    if (json.Mode === "SeekHelp") {
      target_database = project_database.collection("posts");
    } else if (json.Mode === "OfferHelp") {
      target_database = project_database.collection("helper");
    }
    const edit = {
      $set: {
        Description: json.Description,
        Category: json.Category,
        "Ideal Price": json["Ideal Price"],
        "Date for task": json["Date for task"],
        "Zip Code": json["Zip Code"],
        Address: json.Address,
        Longitude: json.Longitude,
        Latitude: json.Latitude,
      },
    };
    const query = { _id: new ObjectId(json._id) };
    await target_database.updateOne(query, edit);
    console.log("Comment successfully edited!");
    //Attempt to reload comments.
    myDB.getComments(req, res).catch(console.dir);
  };

  myDB.update_post_status = async (req, res) => {
    let target_database;
    let json = req.body;
    if (json.Mode === "SeekHelp") {
      target_database = project_database.collection("posts");
    } else if (json.Mode === "OfferHelp") {
      target_database = project_database.collection("helper");
    }
    const update = {
      $set: {
        Status: json.Status,
      },
    };
    const query = { _id: new ObjectId(json._id) };
    await target_database.updateOne(query, update);
    console.log("Post status successfully updated!");
    res.json({ status: true });
  };

  myDB.delete_post = async (req, res) => {
    let target_database;
    let json = req.body;
    if (json.Mode === "SeekHelp") {
      target_database = project_database.collection("posts");
    } else if (json.Mode === "OfferHelp") {
      target_database = project_database.collection("helper");
    }

    const query = { _id: new ObjectId(json._id) };
    await target_database.deleteOne(query);
    console.log("Entry successfully deleted!");
    //Attempt to reload comments.
    myDB.getComments(req, res).catch(console.dir);
  };

  myDB.getComments = async (req, res) => {
    console.log("Reload comment has been executed.");
    let query2;
    if (req.user === "admin@admin") {
      query2 = {};
    } else {
      query2 = { username: req.user.username };
    }
    const helpSeeker_db = project_database.collection("posts");
    const result1 = await helpSeeker_db.find(query2).toArray();
    const helpOffer_db = project_database.collection("helper");
    const result2 = await helpOffer_db.find(query2).toArray();
    let result = await result1.concat(result2);
    res.send(result);
    return result;
  };

  //get all the offer help posts in the database.
  myDB.getAllHelpOfferPosts = async (bol, res) => {
    // console.log("Loading all posts from database.");
    // console.log(bol);
    const post_db = project_database.collection("helper");
    let result = await post_db.find({}).sort({ "Ideal Price": bol }).toArray();
    res.json(result);
    // console.log("loaded");
    return result;
  };

  //get all the seek help posts in the database.
  myDB.getAllSeekPosts = async (bol, res) => {
    // console.log("Loading all helper posts from database.");
    // console.log(bol);
    const post_db = project_database.collection("posts");
    let result = await post_db.find({}).sort({ "Ideal Price": bol }).toArray();
    res.json(result);
    return result;
  };

  myDB.addMessage = async (
    postid,
    senderUsername,
    receiverUsername,
    message,
    res
  ) => {
    const messagedb = project_database.collection("message");
    const write_info = {
      postid: postid,
      senderUsername: senderUsername,
      receiverUsername: receiverUsername,
      message: message,
    };
    await messagedb.insertOne(write_info);
    res.json({ status: true });
  };

  myDB.retrieveReceivedMessage = async (req, res) => {
    const filter = { receiverUsername: req.user.username };
    const messagedb = project_database.collection("message");
    const result = await messagedb.find(filter).toArray();
    res.json(result);
  };

  return myDB;
}

module.exports = myDB();
