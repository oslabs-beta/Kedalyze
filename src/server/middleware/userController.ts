import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ResponseObj } from '../interfaces/crud';
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

interface userController {
  getAllUsers: ResponseObj;
  createUser: ResponseObj;
  verifyUser: ResponseObj;
}

const userController: userController = {
  getAllUsers: (req: Request, res: Response, next: NextFunction) => {
    User.find({}, (err: ErrorRequestHandler, users: any) => {
      if (err)
        return next(
          'Error in userController.getAllUsers: ' + JSON.stringify(err)
        );
      res.locals.users = users;
      return next();
    });
  },

  createUser: (req: Request, res: Response, next: NextFunction) => {
    const { email, username, password } = req.body;
    User.create({
      email: email,
      username: username,
      password: password,
    })
      .then((data: any) => {
        // res.locals.id = data.id;
        res.locals.users = data;
        return next();
      })
      .catch((error: ErrorRequestHandler) => {
        return next({
          log: 'userController.createUser: ERROR: ' + error,
          message: 'userController.createUser: ERROR: Database query issue',
        });
      });
  },

  verifyUser: (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (!username || !password) {
      console.log('Error: username and password fields must be complete.');
      return res.redirect('http://localhost:8080/register');
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
              return res.redirect('/register');
            } else if (!isMatch) {
              console.log(
                'userController.verifyUser: ERROR: incorrect password'
              );
              return res.redirect('/register');
            } else {
              res.locals.id = userData.id;
              // console.log(res.locals.id);
              return next();
            }
          }
        );
      })
      .catch((error: ErrorRequestHandler) => {
        console.log(
          'userController.verifyUser: ERROR: incorrect username or password'
        );
        return res.redirect('/register');
      });
  },
};

module.exports = userController;
