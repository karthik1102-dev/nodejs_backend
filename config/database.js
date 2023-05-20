const Role = require("../model/role");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB =
  "mongodb+srv://agrolen:Agro2023@agrolen.ami6yvq.mongodb.net/agrolen?retryWrites=true&w=majority";

// Wait for database to connect, logging an error if there is a problem
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

const seedRoles = [
  {
    name: "admin",
    status: 1,
  },
  {
    name: "provider",
    status: 1,
  },
  {
    name: "organizer",
    status: 1,
  },
  {
    name: "supervisior",
    status: 1,
  },
  {
    name: "operator",
    status: 1,
  },
  {
    name: "farmer",
    status: 1,
  },
  {
    name: "customer",
    status: 1,
  },
];

db.on("connected", () => {
  console.log("DB Connected");
  const seedDB = async () => {
    const dataCount = await Role.count();
    if (dataCount === 0) {
      try {
        await Role.insertMany(seedRoles);
        console.log("documents successfully inserted");
      } catch (err) {
        console.error(
          `Something went wrong trying to insert the new documents: ${err}\n`
        );
      }
    }
  };
  seedDB().then(() => {
    // mongoose.connection.close();
  });
});

db.on("error", (err) => {
  console.log("Error Connecting Db", err);
});
