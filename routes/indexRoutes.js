var express = require("express");
var router = express.Router();
const User = require("../models/userSchema");

/* GET home page. */
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select('+password');
    res.render("index", { users: users });
  } catch (error) {
    res.send(500).send(error.message);
  }
});

router.get("/create", (req, res) => {
  res.render("create");
});

router.get("/save", (req, res) => {
  res.json({ data: req.query });
});

router.post("/save", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.redirect("/");
  } catch (error) {
    res.send(500).send(error.message);
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    res.send(404).send(error.message);
  }
});


router.get("/update/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("+password");
    res.render("update", { user: user });
  } catch (error) {
    res.send(500).send(error.message);
  }
});

router.post("/update/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
  } catch (error) {
    res.send(500).send(error.message);
  }
});

module.exports = router;
