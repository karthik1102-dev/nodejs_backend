const mongoose = require("mongoose");

// importing role context
const Role = require("../model/Role");

const roles = [{
    name: 'admin',
    role:1,
    status: 1
}, {
    name: 'provider',
    role:2,
    status: 1
}, {
    name: 'organizer',
    role:3,
    status: 1
}, {
    name: 'supervisior',
    role:4,
    status: 1
}, {
    name: 'operator',
    role:5,
    status: 1
}, {
    name: 'farmer',
    role:6,
    status: 1
}, {
    name: 'customer',
    role:7,
    status: 1
}];

const seedRoles = async () => {
    await Role.deleteMany({});
    await Role.insertMany({roles});
};

module.exports = seedRoles;
