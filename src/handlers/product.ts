import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../middleware/authMiddleware';
import { ProductModel } from '../models/product';

const productModel = new ProductModel();

const indexProducts = async (req: Request, res: Response) => {
  try {
    const users = await productModel.index();
    res.status(200).send(users);
  } catch (error) {
    res.sendStatus(400);
  }
};

const showProduct = async (req: Request, res: Response) => {
  try {
    const productId: number = parseInt(req.params.id);
    const product = await productModel.show(productId);
    if (product) {
      res.status(200).send(product);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(400);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const reqBody = req.body;
    const product = await productModel.create(reqBody);
    res.status(201).send(product);
  } catch (error) {
    res.sendStatus(400);
  }
};

const productsRoutes = (app: express.Application) => {
  app.get('/product', indexProducts);
  app.get('/product/:id', showProduct);
  app.post('/product', verifyAuthToken, addProduct);
};

export default productsRoutes;
