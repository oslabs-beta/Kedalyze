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
    const authHeader = req.headers.hasOwnProperty('authorization')
      ? req.headers['authorization']
      : null;

    if (authHeader === null) {
      return res.sendStatus(401);
    }
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      return res.sendStatus(401);
    }
    try {
      res.locals.user._id = jwt.verify(token, process.env.JWT_SECRET).user_id;
      return next();
    } catch (err) {
      console.error(`❌ Error in jwtController.verifyTokens: ${err}`);
      return res.sendStatus(401);
    }
  },
};

module.exports = JWTController;
