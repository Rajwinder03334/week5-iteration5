const user = require("../models/userModel");

// Create a new user
const createuser = async (req, res) => {
  try {
    const { title, snippet, body } = req.body;
    if (!title || !snippet || !body) {
      return res
        .status(400)
        .json({ error: "All fields (title, snippet, body) are required" });
    }

    const newuser = new user({ title, snippet, body });
    const saveduser = await newuser.save();

    res.status(201).json(saveduser);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET all users
const getusers = async (req, res) => {
  try {
    const users = await user.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET a single user by ID
const getuser = async (req, res) => {
  try {
    const user = await user.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE a user by ID
const deleteuser = async (req, res) => {
  try {
    const user = await user.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    res.json({ message: "user deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update (Patch) a single user by ID
const patchuser = async (req, res) => {
  try {
    const user = await user.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Replace (Put) a single user by ID
const putuser = async (req, res) => {
  try {
    const user = await user.findOneAndReplace(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createuser,
  getusers,
  getuser,
  deleteuser,
  patchuser,
  putuser,
};