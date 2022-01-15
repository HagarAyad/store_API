import express, { Request, Response } from 'express';
import {
  userIdValidator,
  user_nameValidator,
  first_nameValidator,
  last_nameValidator,
  passwordValidator,
} from './user.validator';
import { validateRequest, verifyAuthToken } from '../../middleware';
import { UserModel } from '../../models/user';

const userModel = new UserModel();

const createUser = async (req: Request, res: Response) => {
  try {
    const reqBody = req.body;
    const user = await userModel.create(reqBody);
    res.status(201).send(user);
  } catch (error) {
    res.sendStatus(500);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const reqBody = req.body;
    const { password, user_name } = reqBody;
    const userToken = await userModel.loginUser(user_name, password);
    if (userToken) res.status(200).send(userToken);
    else res.sendStatus(401);
  } catch (error) {
    console.log('erro', error);
    res.sendStatus(401);
  }
};

const showUser = async (req: Request, res: Response) => {
  try {
    const userId: number = parseInt(req.params.id);
    const user = await userModel.show(userId);
    if (user) {
      res.status(200).send(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

const indexUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.index();
    res.status(200).send(users);
  } catch (error) {
    res.sendStatus(500);
  }
};

const usersRoutes = (app: express.Application) => {
  app.post(
    '/user',
    user_nameValidator,
    first_nameValidator,
    last_nameValidator,
    passwordValidator,
    validateRequest,
    createUser,
  );
  app.post(
    '/user/login',
    user_nameValidator,
    passwordValidator,
    validateRequest,
    loginUser,
  );
  app.get('/user', verifyAuthToken, indexUsers);
  app.get(
    '/user/:id',
    verifyAuthToken,
    userIdValidator,
    validateRequest,
    showUser,
  );
};

export default usersRoutes;
