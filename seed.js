const mongoose = require("mongoose");

// importing role context
const Role = require("./model/role");

mongoose.connect("mongodb://localhost:27017/maapay_backend_v1", {
        useNewUrlParser: true,
        useUnifiedTopology: true
})
.then(() => {
    console.log("Mongodb connection open");
}).catch((err)=>{
    console.log(err);
})

const seedRoles = [{
    name: 'admin',
    status: 1
}, {
    name: 'provider',
    status: 1
}, {
    name: 'organizer',
    status: 1
}, {
    name: 'supervisior',
    status: 1
}, {
    name: 'operator',
    status: 1
}, {
    name: 'farmer',
    status: 1
}, {
    name: 'customer',
    status: 1
}];

const seedDB = async () => {
    await Role.deleteMany({});
    await Role.insertMany({seedRoles});
};
/* console.log("seedRoles");
console.log(seedRoles);
*/
seedDB().then(()=>{
    mongoose.connection.close();
})
