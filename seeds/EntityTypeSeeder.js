const mongoose = require("mongoose");

// importing role context
const EntityType = require("../model/EntityType");

const entityTypes = [{
    name: 'company',
    entity: 1,
    status: 1
  }, {
    name: 'union',
    entity: 2,
    status: 1
  }, {
    name: 'bmc',
    entity: 3,
    status: 1
  }, {
    name: 'vlcc',
    entity: 4,
    status: 1
  }];

const seedEntityTypes = async () => {
    await EntityType.deleteMany({});
    await EntityType.insertMany({entityTypes});
};

module.exports = seedEntityTypes;
