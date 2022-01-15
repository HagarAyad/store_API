import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';

const validationErrorFormatter = ({ msg, param }: ValidationError) => {
  return `${param}: ${msg}`;
};

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req).formatWith(validationErrorFormatter);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  next();
};
