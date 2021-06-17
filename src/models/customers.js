'use strict';

const Customers = (sequelize, DataTypes) => {
  return sequelize.define('Customers', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  })
}


module.exports = Customers;