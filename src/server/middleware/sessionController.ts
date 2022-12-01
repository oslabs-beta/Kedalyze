import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
const Session = require('../models/sessionModel');

const sessionController: Object = {};

// isLoggedIn - find the appropriate session for this request in the database, then verify whether or not the session is still valid.

(sessionController as any).isLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // resolve
  Session.findOne({ cookieId: req.cookies.ssid })
    .exec()
    // anything inside of .then is going to run for a resolve
    .then((data: any) => {
      if (!data) {
        res.redirect('/signup');
        // else return to next middleware
      } else return next();
    })
    // catch error handler
    .catch((error: ErrorRequestHandler) => {
      res.redirect('/signup');
      return next({
        log: 'sessionController.isLoggedIn: ERROR: ' + error,
        message: 'sessionController.isLoggedIn: ERROR: you are not logged in',
      });
    });
};

/**
 * startSession - create and save a new Session into the database.
 */
(sessionController as any).startSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //write code here
  Session.create({
    cookieId: res.locals.id,
  })
    .then(() => {
      return next();
    })
    .catch((error: ErrorRequestHandler) => {
      return next({
        log: 'sessionController.startSession: ERROR: ' + error,
        message: 'sessionController.startSession: ERROR: Database query issue',
      });
    });
};

module.exports = sessionController;
