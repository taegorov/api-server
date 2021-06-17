'use strict';

const express = require('express');
const cors = require('cors');
const customerRoutes = require('./routes/customers.js');
const orderRoutes = require('./routes/orders.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use(customerRoutes);
app.use(orderRoutes);


module.exports = {
  app: app,
  start: (PORT) => {
    app.listen(PORT, () => console.log('app up and running!'));
  }
}