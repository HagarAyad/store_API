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
