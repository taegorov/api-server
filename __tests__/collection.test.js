'use strict';

const { db, data, customerCollection, orderCollection } = require('../src/models/index.js');
const server = require('../src/server.js');
const supertest = require('supertest');
const { expect } = require('@jest/globals');

const request = supertest(server.app);


// below code block borrowed from Jacob Knaack of Code Fellows
beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});


describe('testing collection', () => {

  let testCustomer = {
    name: 'test customer',
  }
  let testOrder = {
    name: 'test order',
  }
  let customer = null;
  let customers = null;
  let order = null;
  let orders = null;


  // === === 404 on a bad route === === //
  test('Testing 404 on a bad route', async () => {
    const response = await request.get('/badroute');
    expect(response.status).toEqual(404);
  });


  // === === 404 on a bad method === === //
  test('Testing 404 on a bad method', async () => {
    const response = await request.put('/customer');
    expect(response.status).toEqual(404);
  });


  // === === Creates a record === === //
  test('Creates a customer and an order', async () => {
    let newCustomer = await customerCollection.create({ name: 'Tim' });

    expect(newCustomer.id).toEqual(1);
    expect(newCustomer.name).toEqual('Tim');

    let newOrder = await orderCollection.create({ name: 'test order', customerId: newCustomer.id });
    expect(newOrder.name).toEqual('test order');
  });


  // === === Reads a list of records === === //
  test('Reads customers and orders', async () => {
    let customer = await customerCollection.read();
    console.log(customer);
    expect(customer[0].name).toEqual('Tim');

  });


  // === === Read an order from a particular customer === === //
  test('Reads customers and orders', async () => {
    let customer = await customerCollection.read(1, { include: orderCollection.model });
    console.log('customer', customer.Orders);

    expect(customer.Orders).toBeTruthy();
    expect(customer.name).toEqual('Tim');

  });


  // === === Update an order for a customer === === //








});