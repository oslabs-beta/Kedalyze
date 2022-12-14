import { Request, Response, NextFunction } from 'express';
import { ResponseObj } from '../interfaces/crud';

const jwt = require('jsonwebtoken');
interface cookieController {
  addCookie: ResponseObj;
  sessionCookie: ResponseObj;
}

const cookieController: cookieController = {
  addCookie: (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user) {
      const randomNum = Math.floor(Math.random() * 100);
      res.cookie('secret', randomNum);

      // const token = jwt.sign(res.locals.user.id, process.env.JWT_SECRET, {
      //   expiresIn: '1d',
      // });
      // res.cookie('access_token', token, { httpOnly: true });

      res.cookie('user_id', res.locals.user.id, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });
      return next();
    }
  },
  sessionCookie: (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user) {
      res.cookie('session', res.locals.user.id, { httpOnly: true });
    }
    return next();
  },
};

module.exports = cookieController;
