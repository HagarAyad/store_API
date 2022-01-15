import { param, body } from 'express-validator';

const userIdValidator = param('id')
  .notEmpty()
  .withMessage('user_id is required')
  .isNumeric()
  .withMessage('user_id must be number');

const user_nameValidator = body('user_name')
  .notEmpty()
  .withMessage('user_name is required')
  .isString()
  .withMessage('user_name must be string');

const first_nameValidator = body('first_name')
  .notEmpty()
  .withMessage('first_name is required')
  .isString()
  .withMessage('first_name must be string');

const last_nameValidator = body('last_name')
  .isString()
  .withMessage('last_name must be string');

const passwordValidator = body('password')
  .notEmpty()
  .withMessage('password is required')
  .isString()
  .withMessage('password must be string');

export {
  userIdValidator,
  user_nameValidator,
  first_nameValidator,
  last_nameValidator,
  passwordValidator,
};
