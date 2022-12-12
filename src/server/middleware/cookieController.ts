import { Request, Response, NextFunction } from 'express';

const jwt = require('jsonwebtoken');
const cookieController: Object = {};

(cookieController as any).addCookie = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const randomNum = Math.floor(Math.random() * 100);
  res.cookie('secret', randomNum);
  return next();
};

(cookieController as any).setSSIDCookie = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const password = id;
  // added token for jwt
  //const token = jwt.sign(password, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.cookie('ssid', res.locals.id, { httpOnly: true, secure: true });
  //added cookie with jwt token
  //res.cookie('access_token', token, { httpOnly: true });
  return next();
};

module.exports = cookieController;
