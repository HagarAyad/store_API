import express, { Request, Response } from 'express';
import { verifyAuthToken } from '../middleware/authMiddleware';
import { UserModel } from '../models/user';

const userModel = new UserModel();

const createUser = async (req: Request, res: Response) => {
  const reqBody = req.body;
  const user = await userModel.create(reqBody);
  res.status(200).send(user);
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const reqBody = req.body;
    const { password, user_name } = reqBody;
    const userToken = await userModel.loginUser(user_name, password);
    if (userToken) res.status(200).send(userToken);
    else res.sendStatus(401);
  } catch (error) {
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
    res.sendStatus(400);
  }
};

const indexUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.index();
    res.status(200).send(users);
  } catch (error) {
    res.sendStatus(400);
  }
};

const usersRoutes = (app: express.Application) => {
  app.post('/user', createUser);
  app.post('/user/login', loginUser);
  app.get('/user', verifyAuthToken, indexUsers);
  app.get('/user/:id', verifyAuthToken, showUser);
};

export default usersRoutes;
