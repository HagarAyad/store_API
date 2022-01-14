import express, { Request, Response } from 'express';
import { OrderModel } from '../models/orders';
import { verifyAuthToken } from '../middleware/authMiddleware';

const orderModel = new OrderModel();

const createOrder = async (_req: Request, res: Response) => {
  try {
    const userId = parseInt(_req.params.userId);
    await orderModel.createOrder(userId);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400);
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
    res.sendStatus(400);
  }
};

const getUserOrders = async (_req: Request, res: Response) => {
  try {
    const userId = parseInt(_req.params.userId);
    const orders = await orderModel.getUserOrders(userId);
    res.status(200).send(orders);
  } catch (error) {
    res.sendStatus(400);
  }
};

const ordersRoutes = (app: express.Application) => {
  app.get('/user/:userId/order', verifyAuthToken, getUserOrders);
  app.post('/user/:userId/order', verifyAuthToken, createOrder);
  app.post('/order/:id/products', verifyAuthToken, addProductToOrders);
};

export default ordersRoutes;
