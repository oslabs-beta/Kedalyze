import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const userController: Object = {};

// getAllUsers: retrieve all users from the db and store it into res.locals
(userController as any).getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.find({}, (err: ErrorRequestHandler, users: any) => {
    if (err)
      return next(
        'Error in userController.getAllUsers: ' + JSON.stringify(err)
      );
    res.locals.users = users;
    return next();
  });
};

// createUser: create and save a new User into the database.
(userController as any).createUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  User.create({
    username: username,
    password: password,
  })
    .then((data: any) => {
      res.locals.id = data.id;
      return next();
    })
    // catch error handler
    .catch((error: ErrorRequestHandler) => {
      return next({
        log: 'userController.createUser: ERROR: ' + error,
        message: 'userController.createUser: ERROR: Database query issue',
      });
    });
};

// verifyUser: obtain username and password from the request body, locate the appropriate user in the database, and then authenticate the submitted password against the password stored in the database
(userController as any).verifyUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  if (!username || !password) {
    console.log('Error: username and password fields must be complete.');
    return res.redirect('/signup');
  }

  // check if user exists / password is correct
  User.findOne({ username: username })
    .exec()
    .then((userData: any) => {
      bcrypt.compare(
        password,
        userData.password,
        function (error: ErrorRequestHandler, isMatch: any) {
          if (error) {
            console.log('userController.verifyUser: ERROR: ' + error);
            return res.redirect('/signup');
          } else if (!isMatch) {
            console.log('userController.verifyUser: ERROR: incorrect password');
            return res.redirect('/signup');
          } else {
            res.locals.id = userData.id;
            return next();
          }
        }
      );
    })
    .catch((error: ErrorRequestHandler) => {
      console.log(
        'userController.verifyUser: ERROR: incorrect username or password'
      );
      return res.redirect('/signup');
      // return next({
      //   log: 'userController.verifyUser: ERROR: ' + error,
      //   message: 'userController.verifyUser: ERROR: login information incorrect',
      // });
    });
};

module.exports = userController;
