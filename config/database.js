
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB =
  "mongodb+srv://agrolen:Agro2023@agrolen.ami6yvq.mongodb.net/agrolen?retryWrites=true&w=majority";

// Wait for database to connect, logging an error if there is a problem
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on("connected", () => {
  console.log("DB Connected");  
});

db.on("error", (err) => {
  console.log("Error Connecting Db", err);
});
