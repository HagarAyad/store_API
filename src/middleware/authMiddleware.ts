import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader?.split(' ')[1] || '';
  jwt.verify(token, 'secret', function (err, decoded) {
    if (!decoded) {
      return res.sendStatus(401);
    }
    next();
  });
};
