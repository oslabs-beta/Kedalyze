import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ResponseObj } from '../interfaces/crud';
const User = require('../models/userModel');
const { sign, verify } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

type UserRequest = Request & { user: any };

interface JWTController {
  createTokens: ResponseObj;
  validateTokens: ResponseObj;
}

const JWTController: JWTController = {
  createTokens: (req: UserRequest, res: Response, next: NextFunction) => {
    res.locals.user.jwt = jwt.sign(
      {
        //payload on the jwt is going to be an object with the username in it
        username: res.locals.user.username,
        user_id: res.locals.user.user_id

      }, 
      //token string
      secret,
      //arbitrarily 3 hours so it does not impede dev but not positive this is functional
      { expiresIn: '3 hours'}
      );
      //send signed token as a cookie
      res.cookie('jwt', res.locals.user.jwt, { httpOnly: true });
      return next();
  },

  validateTokens: (req: UserRequest, res: Response, next: NextFunction) => {},

  // validateTokens: (req: UserRequest, res: Response, next: NextFunction) => {
  //   const token = req.cookies.token;
  //   try {
  //     const user = jwt.verify(token, process.env.JWT_SECRET);
  //     req.user = user;
  //     return next();
  //   } catch (err) {
  //     res.clearCookie('token');
  //     return res.redirect('/');
  //   }
  // },
};

module.exports = JWTController;
