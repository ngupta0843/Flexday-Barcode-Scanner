const { User } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { email: username } });

    if (!user) {
      return res.status(400).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }

    console.log("username: ", username, "password: ", password);
    res.status(200).json({ message: "Login successful", token, user: userData });
  } catch (error) {
    console.log(error);
  }
}

async function signup(req, res) {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });
    console.log('token created 1');
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log('token created 2');
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating the user.");
  }
}
module.exports = {
  login,
  signup,
};
