'use strict';

const orderModel = require('./orders.js');
const customerModel = require('./customers.js');

const Collection = require('./collection.js');
const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

// const sequelize = new Sequelize(DATABASE_URL);

let sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
});

const orders = orderModel(sequelize, DataTypes);
const customers = customerModel(sequelize, DataTypes);


const customerCollection = new Collection('customers', customers);
const orderCollection = new Collection('orders', orders);


customerCollection.createAssociation('hasMany', orderCollection.model, {
  foreignKey: 'customerId', sourceKey: 'id'
});
orderCollection.createAssociation('belongsTo', customerCollection.model, {
  foreignKey: 'customerId', targetKey: 'id'
});


module.exports = {
  db: sequelize,
  orderCollection,
  customerCollection,
}