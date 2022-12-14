import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ResponseObj } from '../interfaces/crud';
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
        username: res.locals.user.username,
        user_id: res.locals.user._id,
      },
      secret,
      { expiresIn: '1hr' }
    );
    res.cookie('jwt', res.locals.user.jwt, { httpOnly: true });
    return next();
  },

  validateTokens: (req: UserRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    console.log('this is auth header',authHeader);
    const token = authHeader && authHeader.split(' ')[1].slice(6);
    if (token == null) return res.sendStatus(401);
    try {
      res.locals.user_id = jwt.verify(token, secret).user_id;
      return next();
    } catch {
      console.log('jwtController caught error in verify MW');
      return next({ err: 'Verification error - Invalid JWT' });
    }
  },
};

module.exports = JWTController;
