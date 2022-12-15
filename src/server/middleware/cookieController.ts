import { Request, Response, NextFunction } from 'express';
import { ResponseObj } from '../interfaces/crud';

interface cookieController {
  addCookie: ResponseObj;
  sessionCookie: ResponseObj;
}

const cookieController: cookieController = {
  addCookie: (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user) {
      let randomNumber = Math.random().toString();
      randomNumber = randomNumber.substring(2, randomNumber.length);
      res.cookie('cookie', randomNumber, {
        maxAge: 900000,
        httpOnly: true,
        secure: true,
      });
    }
    return next();
  },

  sessionCookie: (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user) {
      res.cookie('session', res.locals.user._id, {
        httpOnly: true,
        secure: true,
      });
    }
    return next();
  },
};

module.exports = cookieController;
