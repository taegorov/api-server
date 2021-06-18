'use strict';

const express = require('express');
const data = require('../models/index.js');
const router = express.Router();


// routers //
router.post('/order', create);
router.get('/order', getAll);
router.get('/order/:order', getOne);
router.put('/order/:orderId', update);
router.delete('/order/:orderId', remove);


// === === router functions === === //

// create //
async function create(request, response) {
  const orderObject = request.body;
  const orderData = await data.order.create(orderObject);

  response.status(200).send(orderData);
}

// get all //
async function getAll(request, response) {
  const allOrders = await data.order.findAll();

  response.status(200).send(allOrders);
}

// get one //
async function getOne(request, response) {
  const orderId = request.params.orderId;
  const singleOrder = await data.order.findOne({
    where: {
      id: orderId,
    }

  });

  response.status(200).send(singleOrder);
}

// update //
async function update(request, response) {
  const orderId = request.params.orderId;
  const orderObject = request.body;
  const orderData = await data.order.findOne({ where: { id: orderId } });

  response.status(200).send(orderData);
}

// remove //
async function remove(request, response) {
  const orderId = request.params.orderId;
  await data.order.destroy({ where: { id: orderId } });

  response.status(204).send('success!!!!');
}


module.exports = router;