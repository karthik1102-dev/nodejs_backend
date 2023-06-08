
const mongoose = require("mongoose");
require("./config/database")

const { seedRoleList } = require("./seeds/RoleSeeder");
const { seedEntityTypeList } = require("./seeds/EntityTypeSeeder");

db.on("connected", () => {
  console.log("DB Connected seeder running");
  
  const seedDatabase = async () => {
    seedRoleList().then(() => {
      console.log("Seeding RoleList!");
    });
  
    await seedEntityTypeList().then(() => {
      console.log("Seeding EntityTypeList!");
    });
  };
  
  seedDatabase().then(() => {
    console.log("Database Successfully Seeded!");
    mongoose.connection.close();
  });
  
});


db.on("error", (err) => {
  console.log("Error Connecting Db", err);
});
