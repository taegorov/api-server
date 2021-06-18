'use strict';

const express = require('express');
const data = require('../models/index.js');
const router = express.Router();


// routers //
router.post('/customer', create);
router.get('/customer', getAll);
router.get('/customer/:customer', getOne);
router.put('/customer/:customerId', update);
router.delete('/car/:carId', remove);


// === === router functions === === //

// create //
async function create(request, response) {
  const customerObject = request.body;
  const customerData = await data.customer.create(customerObject);

  response.status(200).send(customerData);
}

// get all //
async function getAll(request, response) {
  const allCustomers = await data.customer.findAll();

  response.status(200).send(allCustomers);
}

// get one //
async function getOne(request, response) {
  const customerId = request.params.customerId;
  const singleCustomer = await data.customer.findOne({
    where: {
      id: customerId,
    }

  });

  response.status(200).send(singleCustomer);
}

// update //
async function update(request, response) {
  const customerId = request.params.customerId;
  const customerObject = request.body;
  const customerData = await data.customer.findOne({ where: { id: customerId } });

  response.status(200).send(customerData);
}

// remove //
async function remove(request, response) {
  const customerId = request.params.customerId;
  await data.customer.destroy({ where: { id: customerId } });

  response.status(204).send('success!!!!');
}


module.exports = router;