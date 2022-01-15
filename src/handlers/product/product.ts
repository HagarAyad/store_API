import express, { Request, Response } from 'express';
import {
  productIdValidator,
  product_nameValidator,
  product_priceValidator,
} from './product.validator';
import { verifyAuthToken, validateRequest } from '../../middleware';
import { ProductModel } from '../../models/product';

const productModel = new ProductModel();

const indexProducts = async (req: Request, res: Response) => {
  try {
    const users = await productModel.index();
    res.status(200).send(users);
  } catch (error) {
    res.sendStatus(500);
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
    res.sendStatus(500);
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
  app.get('/product/:id', productIdValidator, validateRequest, showProduct);
  app.post(
    '/product',
    verifyAuthToken,
    product_nameValidator,
    product_priceValidator,
    validateRequest,
    addProduct,
  );
};

export default productsRoutes;
