import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ResponseObj } from '../interfaces/crud';
import { UserObj } from '../interfaces/user';
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const saltRound = 10;
const jwt = require('jsonwebtoken');

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
    bcrypt.hash(
      password,
      saltRound,
      (err: ErrorRequestHandler, hash: string) => {
        if (err) {
          res.send({
            success: false,
            statusCode: 500,
            message: `Error salting password: ${err}`,
          });
        } else {
          User.create({ email: email, username: username, password: hash })
            .then((user: UserObj) => {
              const payload = {
                user_id: user._id,
                email,
              };
              const options = {
                expiresIn: '2hr',
              };
              const token = jwt.sign(payload, process.env.JWT_SECRET, options);
              user.token = token;
              res.locals.user = user;
              return next();
            })
            .catch((err: ErrorRequestHandler) => {
              return next({
                log: `userController.createUser: ERROR: ${err}`,
                message: `userController.createUser: ${err}`,
              });
            });
        }
      }
    );
  },

  verifyUser: (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: 'Username and password fields must be complete.',
      });
    }

    User.findOne({ username: username })
      .then((user: object) => {
        res.locals.user = user;

        if (!user) {
          return res.status(401).json({
            error: 'Invalid credentials. User does not exist.',
          });
        }

        const plainTextPassword = req.body.password;
        const hashedPassword = res.locals.user.password;

        bcrypt.compare(
          plainTextPassword,
          hashedPassword,
          (error: ErrorRequestHandler, result: string) => {
            if (error) {
              return next({
                log: `An error occurred while comparing password hash, ${error}`,
                message: {
                  err: 'An error occurred while comparing password hash',
                },
              });
            } else {
              res.locals.users = user;
              let randomNumber = Math.random().toString();
              randomNumber = randomNumber.substring(2, randomNumber.length);
              res.cookie('cookie', randomNumber, {
                maxAge: 900000,
                httpOnly: true,
                secure: true,
              });
              res.cookie('session', res.locals.user._id, {
                httpOnly: true,
                secure: true,
              });
              return res.status(200).json({
                message: '??? Successful login!',
              });
            }
          }
        );
      })
      .catch((err: ErrorRequestHandler) => {
        next({
          log: `ERROR: ${err}`,
          message: { err: 'An error occurred in userController.verifyUser' },
        });
      });
  },
};

module.exports = userController;
