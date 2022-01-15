import supertest from 'supertest';
import { UserModel } from '../models/user';
import app from '../index';

const request = supertest(app);

const userModel = new UserModel();

function loginUser() {
  return userModel.loginUser('userTest', '123456');
}

export { request, loginUser };
