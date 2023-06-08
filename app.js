require("dotenv").config();
require("./config/database");
// require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require('./helper/validate');

const app = express();

app.use(express.json());

// importing user context
const User = require("./model/User");

const Digest = require("./model/Digest");

// importing user context
const Role = require("./model/Role");

const {loggedIn} = require('./middleware/auth');

const Digest = require("./model/Digest");
const Transaction = require("./model/Transaction");

const UserAssociate = require("./model/UserAssociate");

var userToken = req.header('Authorization');

if (userToken.startsWith('Bearer ')) {
  // Remove Bearer from string
  userToken = userToken.slice(7, userToken.length).trimLeft();
  const verifiedUser = jwt.verify(userToken,process.env.TOKEN_KEY); 
}
var userId = verifiedUser.id;
// Fetch the user by id 
var loggedUserData = User.findOne({_id: userId})


// Register
app.post("/register", async (req, res, next) => {
  // Our register logic starts here
  try {
    // Get user input
    const validationRule = {
      "email": "required|string|email",
      "first_name": "required|string",
      "role_id": "required",
      "password": "required|string|min:6",
      "last_name": "required|string",
  };


  await validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
        res.status(412)
            .send({
                success: false,
                message: 'Validation failed',
                data: err
            });
    } else {
        next();
    }
}).catch( err => console.log(err))


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

app.post("/login", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
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

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

app.get("/roles",loggedIn, (req, res) => {
  Role.find().then((docs) => {
    console.log('list:',req)
 
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


// milk submission
app.post("/ingest", async (req, res, next) => {
  // Our ingest logic starts here
  try {

    const { lr, apl, fat, snf, water, litre, shift, temperature, submitter_id, rate_type, milk_type, submitted_on  } = req.body;

    // Create user in our database
    const digest = await Digest.create({
      lr, apl, fat, snf, water, litre, shift, temperature, submitter_id, rate_type, milk_type, submitted_on,
      'operator_id' : userId,
      'bmc_id' :loggedUserData.bmc_id,
      'vlcc_id' :loggedUserData.vlcc_id,
      'union_id':loggedUserData.union_id,
      'company_id' :loggedUserData.company_id,
    });

    const transaction = await Transaction.create({
      'paid' : false,
      'digest_id':digest._id,
      'bmc_id' :digest.bmc_id,
      'vlcc_id' :digest.vlcc_id,
      'union_id':digest.union_id,
      'company_id' :digest.company_id,
      'submitter_id' :digest.submitter_id,
    });

    res.status(200).json(true);
  } catch (err) {
    res.status(500).json(err._message)
  }
});

// user associate
app.post("/user-associate", async (req, res, next) => {
  try {

    const { local_id, vlcc_id } = req.body;
    
    // Create user in our database
    const userAssociate = await UserAssociate.create({
      userId,
      local_id,
      vlcc_id
    });

    res.status(200).json(true);
  } catch (err) {
    res.status(500).json(err._message)
  }
});

module.exports = app;
