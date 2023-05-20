require("dotenv").config();
require("./config/database");
// require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

// importing user context
const User = require("./model/user");

// importing user context
const Role = require("./model/role");

// Register
app.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    console.log("req.body");

    console.log(req.body);

    const { first_name, last_name, email, password, role_id } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name && role_id)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      role_id,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err._message)
    // throw new Error(err._message)
  }
  // Our register logic ends here
});

// Login
app.post("/login", (req, res) => {
  // our login logic goes here
});



app.get("/roles", (req, res) => {
  Role.find().then((docs) => {
    console.log('list')

    // const response = {
    //     count: docs.length,
    //     roles: docs.map( (docs)=>{
    //         return{
    //             name: docs.name,
    //             status: docs.status,
    //             _id: docs._id,

    //         }
    //     })
    // }

    // res.json( 
    //     {
    //         status: true,
    //        data: response
    //     }
    // )

    res.status(200).json(
      {
        status: true,
        count: docs.length,
        data: docs
      }
    )
  }).catch((err) => {
    res.json(
      {
        status: false,
        message: err.message
      }
    )
  })
})
module.exports = app;
