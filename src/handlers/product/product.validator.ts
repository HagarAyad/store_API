import { param, body } from 'express-validator';

const productIdValidator = param('id')
  .notEmpty()
  .withMessage('id is required')
  .isNumeric()
  .withMessage('id must be number');

const product_nameValidator = body('name')
  .notEmpty()
  .withMessage('name is required')
  .isString()
  .withMessage('name must be string');

const product_priceValidator = body('price')
  .notEmpty()
  .withMessage('price is required')
  .isNumeric()
  .withMessage('price must be numeric');

export { productIdValidator, product_nameValidator, product_priceValidator };
