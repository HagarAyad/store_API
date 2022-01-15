import express, { Request, Response } from 'express';
import { userIdValidator } from './order.validator';
import { OrderModel } from '../../models/orders';
import { verifyAuthToken, validateRequest } from '../../middleware';

const orderModel = new OrderModel();

const createOrder = async (_req: Request, res: Response) => {
  try {
    const userId = parseInt(_req.params.userId);
    await orderModel.createOrder(userId);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
};

const addProductToOrders = async (_req: Request, res: Response) => {
  try {
    const orderId: string = _req.params.id;
    const productId: string = _req.body.productId;
    const quantity: number = parseInt(_req.body.quantity);
    await orderModel.addProduct(quantity, orderId, productId);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
};

const getUserOrders = async (_req: Request, res: Response) => {
  try {
    const userId = parseInt(_req.params.userId);
    const orders = await orderModel.getUserOrders(userId);
    res.status(200).send(orders);
  } catch (error) {
    res.sendStatus(500);
  }
};

const ordersRoutes = (app: express.Application) => {
  app.get(
    '/user/:userId/order',
    verifyAuthToken,
    userIdValidator,
    validateRequest,
    getUserOrders,
  );
  app.post(
    '/user/:userId/order',
    verifyAuthToken,
    userIdValidator,
    validateRequest,
    createOrder,
  );
  app.post('/order/:id/products', verifyAuthToken, addProductToOrders);
};

export default ordersRoutes;
