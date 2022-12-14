import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ResponseObj } from '../interfaces/crud';
const Session = require('../models/sessionModel');

interface sessionController {
  isLoggedIn: ResponseObj;
  startSession: ResponseObj;
}

const sessionController: sessionController = {
  isLoggedIn: (req: Request, res: Response, next: NextFunction) => {
    console.log('this is req cookies ssid', req.cookies.ssid);

    Session.findOne({ cookieId: req.cookies.ssid })
      .exec()
      .then((data: any) => {
        if (!data) {
          res.redirect('/register');
        } else return next();
      })
      .catch((error: ErrorRequestHandler) => {
        res.redirect('/register');
        return next({
          log: 'sessionController.isLoggedIn: ERROR: ' + error,
          message: 'sessionController.isLoggedIn: ERROR: you are not logged in',
        });
      });
  },

  startSession: (req: Request, res: Response, next: NextFunction) => {
    const { _id } = res.locals.user;
    Session.create({ cookieId: _id })
      .then((newSession: object) => {
        res.locals.newSession = newSession;
        return next();
      })
      .catch((error: ErrorRequestHandler) => {
        return next({
          log: 'sessionController.startSession: ERROR: ' + error,
          message:
            'sessionController.startSession: ERROR: Database query issue',
        });
      });
  },
};

module.exports = sessionController;
