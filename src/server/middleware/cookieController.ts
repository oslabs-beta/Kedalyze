import { Request, Response, NextFunction } from 'express';

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

(cookieController as any).checkPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const password = id;
  res.cookie('ssid', res.locals.id, { httpOnly: true, secure: true });
  return next();
};

module.exports = cookieController;
