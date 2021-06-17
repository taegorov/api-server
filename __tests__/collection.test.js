'use strict';

const { db, customerCollection, orderCollection } = require('../src/models/index.js');


// below code block borrowed from Jacob Knaack of Code Fellows
beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});



describe('testing collection', () => {
  it('should create a Customer and an Order', async () => {
    let newCustomer = await customerCollection.create({ name: 'Tim' });

    expect(newCustomer.id).toEqual(1);
    expect(newCustomer.name).toEqual('Tim');

    let newOrder = await orderCollection.create({ name: 'test order', customerId: newCustomer.id });
    expect(newOrder.name).toEqual('test order');
  });

  it('shoud retrieve both Customers and Orders', async () => {
    let customer = await customerCollection.read(1, { include: orderCollection.model });
    console.log(customer);
    expect(customer.Orders).toBeTruthy();
  });
});