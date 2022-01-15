import { param, CustomValidator } from 'express-validator';
import { UserModel } from '../../models/user';

const userModel = new UserModel();

const isValidUser: CustomValidator = (value) => {
  return userModel.show(value).then((user) => {
    if (!user) {
      return Promise.reject('User not exist');
    }
  });
};

const userIdValidator = param('userId')
  .notEmpty()
  .withMessage('userId is required')
  .isNumeric()
  .withMessage('userId must be number')
  .custom(isValidUser);

export { userIdValidator };
