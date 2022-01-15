import { request, loginUser } from './index';
import { OrderModel } from '../models/orders';

const orderModel = new OrderModel();
const userId = 1;
const productId = '1';
const orderId = '1';
const quantity = 1;

describe('Orders Model : ', () => {
  it('it should create order', async () => {
    const order = await orderModel.createOrder(userId);
    expect(order).toBeDefined();
  });

  it("it shouldn't create order", async () => {
    const order = await orderModel.createOrder(66);
    expect(order).toBeUndefined();
  });

  it('it should add product to order', async () => {
    const productInOrder = await orderModel.addProduct(
      quantity,
      orderId,
      productId,
    );
    expect(productInOrder).toBeDefined();
  });

  it(`it should get Orders of user_id: ${userId}`, async () => {
    const orders = await orderModel.getUserOrders(userId);
    expect(orders.length).toEqual(1);
  });
});

describe('Orders API : ', () => {
  let token = '';
  beforeAll(async function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
    token = await loginUser();
  });

  it('it should create order', async () => {
    const response = await request
      .post(`/user/${userId}/order`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(201);
  });

  it("it shouldn't create order (require Auth)", async () => {
    const response = await request.post(`/user/${userId}/order`);
    expect(response.status).toBe(401);
  });

  it('it should get user order', async () => {
    const response = await request
      .get(`/user/${userId}/order`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("it shouldn't get user order (require Auth)", async () => {
    const response = await request.get(`/user/${userId}/order`);
    expect(response.status).toBe(401);
  });

  it("it shouldn't get user order (user not exist )", async () => {
    const invalidUserId = 70;
    const response = await request
      .get(`/user/${invalidUserId}/order`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
    expect(response.text).toContain('User not exist');
  });
});
